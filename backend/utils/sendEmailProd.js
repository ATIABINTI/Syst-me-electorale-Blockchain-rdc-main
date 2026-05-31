const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Configuration SendGrid
const sendgridOptions = {
   auth: {
      api_key: process.env.SENDGRID_API_KEY,
   },
};

const sendEmail = async (options) => {
   try {
      // Transporteur SendGrid
      const transporter = nodemailer.createTransport(
         sendgridTransport(sendgridOptions)
      );

      // Message email
      const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: options.to,
         subject: options.subject,
         html: options.html || `<p>${options.message || ""}</p>`,
      };

      // Envoi email
      const info = await transporter.sendMail(mailOptions);

      console.log("Email envoyé via SendGrid:", info.messageId);
      return info;

   } catch (error) {
      console.error("Erreur SendGrid:", error.message);
      throw new Error("Erreur lors de l'envoi de l'email");
   }
};

module.exports = sendEmail;