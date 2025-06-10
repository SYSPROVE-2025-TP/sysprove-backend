const Propuesta = require("../models/Propuesta");
const Cotizacion = require("../models/Cotizacion");
const Cliente = require('../models/Cliente');
const { generarPDF } = require("../services/pdfService");
const { enviarEmail } = require("../services/emailService");

// Ver propuesta aprobada
exports.verPropuesta = async (req, res) => {
  try {
    const propuesta = await Propuesta.findById(req.params.id)
      .populate("cliente", "nombre email")
      .lean()
      .exec();

    if (!propuesta) {
      return res.status(404).json({ success: false, message: "Propuesta no encontrada" });
    }

    if (propuesta.estado !== "Aprobada") {
      return res.status(400).json({ 
        success: false, 
        message: "La propuesta no está aprobada",
        estadoActual: propuesta.estado
      });
    }

    res.status(200).json({ success: true, data: propuesta });
  } catch (error) {
    console.error("Error en verPropuesta:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al obtener propuesta",
      error: error.message 
    });
  }
};

// Crear cotización
exports.crearCotizacion = async (req, res) => {
  try {
    if (!req.body.propuestaId) {
      return res.status(400).json({ 
        success: false, 
        message: "El ID de propuesta es requerido" 
      });
    }

    const propuesta = await Propuesta.findById(req.body.propuestaId).populate("cliente").exec();

    if (!propuesta) {
      return res.status(404).json({ 
        success: false, 
        message: "Propuesta no encontrada" 
      });
    }

    if (propuesta.estado !== "Aprobada") {
      return res.status(400).json({ 
        success: false, 
        message: "Solo se puede crear cotización de propuestas aprobadas",
        estadoActual: propuesta.estado
      });
    }

    // Generar PDF
    let pdfData;
    try {
      pdfData = await generarPDF(propuesta);
    } catch (pdfError) {
      console.error("Error al generar PDF:", pdfError);
      return res.status(500).json({ success: false, message: "Error al generar el documento PDF" });
    }

    // Crear cotización
    const nuevaCotizacion = new Cotizacion({
      propuesta: propuesta._id,
      cliente: propuesta.cliente._id,
      pdf: {
        nombreArchivo: `Cotización_${propuesta._id}_${Date.now()}.pdf`,
        contenido: pdfData,
        tipoContenido: "application/pdf"
      },
      estado: "Borrador",
      creadoPor: req.user._id
    });

    await nuevaCotizacion.save();
    
    res.status(201).json({ 
      success: true,
      message: "Cotización creada correctamente",
      data: {
        id: nuevaCotizacion._id,
        estado: nuevaCotizacion.estado,
        nombreArchivo: nuevaCotizacion.pdf.nombreArchivo
      }
    });
  } catch (error) {
    console.error("Error en crearCotizacion:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al crear cotización",
      error: error.message 
    });
  }
};

// Enviar cotización
exports.enviarCotizacion = async (req, res) => {
  try {
    if (!req.body.destinatarios || !Array.isArray(req.body.destinatarios) || req.body.destinatarios.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Debe especificar al menos un destinatario válido" 
      });
    }

    const cotizacion = await Cotizacion.findById(req.params.id)
      .populate("cliente", "nombre email")
      .populate("propuesta", "descripcion monto")
      .exec();

    if (!cotizacion) {
      return res.status(404).json({ 
        success: false, 
        message: "Cotización no encontrada" 
      });
    }

    if (cotizacion.estado === "Enviada") {
      return res.status(400).json({ 
        success: false, 
        message: "La cotización ya fue enviada anteriormente",
        fechaEnvio: cotizacion.fechaEnvio
      });
    }

    if (!cotizacion.pdf || !cotizacion.pdf.contenido) {
      return res.status(400).json({ 
        success: false, 
        message: "La cotización no tiene un PDF generado" 
      });
    }

    // Enviar email
    await enviarEmail({
      to: req.body.destinatarios,
      subject: `Cotización para ${cotizacion.cliente.nombre}`,
      html: `
        <p>Estimado cliente,</p>
        <p>Adjunto encontrará la cotización basada en la propuesta aprobada.</p>
        <p><strong>Monto:</strong> $${cotizacion.propuesta.monto}</p>
        <p>Saludos cordiales,</p>
        <p>Equipo sysprove</p>
      `,
      attachments: [{
        filename: cotizacion.pdf.nombreArchivo,
        content: cotizacion.pdf.contenido,
        contentType: cotizacion.pdf.tipoContenido
      }]
    });

    // Actualizar cotización
    cotizacion.estado = "Enviada";
    cotizacion.fechaEnvio = new Date();
    cotizacion.destinatarios = req.body.destinatarios;
    cotizacion.enviadoPor = req.user._id;
    await cotizacion.save();

    res.status(200).json({ 
      success: true,
      message: "Cotización enviada correctamente",
      data: {
        destinatarios: req.body.destinatarios,
        fechaEnvio: cotizacion.fechaEnvio
      }
    });
  } catch (error) {
    console.error("Error en enviarCotizacion:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al enviar cotización",
      error: error.message 
    });
  }
};

// Obtener PDF de cotización
exports.obtenerPDF = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id).exec();

    if (!cotizacion) {
      return res.status(404).json({ 
        success: false, 
        message: "Cotización no encontrada" 
      });
    }

    if (!cotizacion.pdf || !cotizacion.pdf.contenido) {
      return res.status(404).json({ 
        success: false, 
        message: "PDF no generado para esta cotización" 
      });
    }

    res.set({
      "Content-Type": cotizacion.pdf.tipoContenido,
      "Content-Disposition": `attachment; filename="${cotizacion.pdf.nombreArchivo}"`,
      "Content-Length": cotizacion.pdf.contenido.length
    });

    res.send(cotizacion.pdf.contenido);
  } catch (error) {
    console.error("Error en obtenerPDF:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al obtener PDF",
      error: error.message 
    });
  }
};

exports.previewPDF = async (req, res) => {
     try {
       const cotizacion = await Cotizacion.findById(req.params.id);
       if (!cotizacion) {
         return res.status(404).json({ mensaje: "Cotización no encontrada" });
       }
       // Lógica para generar y enviar el PDF de vista previa
       res.status(200).json({ mensaje: "Vista previa del PDF generada", cotizacion });
     } catch (error) {
       console.error("Error al obtener la vista previa del PDF:", error);
       res.status(500).json({ mensaje: "Error al obtener la vista previa del PDF" });
     }
   };
