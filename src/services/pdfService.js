const PDFDocument = require('pdfkit');

const generarPDF = async (propuesta) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];
    
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Contenido del PDF (personalizable)
    doc.fontSize(18).text('COTIZACIÓN', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Cliente: ${propuesta.cliente.nombre}`);
    doc.text(`Monto: $${propuesta.monto}`);
    doc.text(`Descripción: ${propuesta.descripcion || 'N/A'}`);
    
    doc.end();
  });
};

module.exports = { generarPDF };
