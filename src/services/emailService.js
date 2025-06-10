const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Ejemplo con Gmail (configura en .env)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const enviarEmail = async ({ to, subject, html, attachments }) => {
  try {
    await transporter.sendMail({
      from: `"Cotizaciones App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });
    console.log('Email enviado a:', to);
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw new Error('Falló el envío del email');
  }
};

module.exports = { enviarEmail };
