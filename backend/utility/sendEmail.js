const nodemailer = require("nodemailer");
require("dotenv").config(); // if using Node.js

const sendEmail = async ({ to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  await transporter.sendMail({
    from: '"Techvibes" <no-reply@techvibesbd.com>',
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;