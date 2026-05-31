const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
   try {
      // Création du transporteur SMTP
      const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: process.env.SMTP_PORT,
         secure: false, // important pour Mailtrap / SMTP standard
         auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS,
         },
      });

      // Contenu email
      const message = {
         from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
         to: options.email,
         subject: options.subject,
         text: options.message,
         html: options.html || `<p>${options.message}</p>`,
      };

      // Envoi
      const info = await transporter.sendMail(message);

      console.log("Email envoyé:", info.messageId);
      return info;

   } catch (error) {
      console.error("Erreur envoi email:", error.message);
      throw new Error("Impossible d'envoyer l'email");
   }
};

module.exports = sendEmail;