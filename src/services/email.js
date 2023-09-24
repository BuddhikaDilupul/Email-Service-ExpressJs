const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const { sendEmailAddress, sendEmailPassword } = require('../config');

const transporter = nodemailer.createTransport({
  // Set up your email configuration here (e.g., SMTP settings, email provider credentials, etc.)
  // Example:
  service:'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true, // For TLS connection
  auth: {
    user: sendEmailAddress,
    pass: sendEmailPassword,
  },
});

function renderEmail(templateName, data) {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.hbs`);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
}

async function sendEmail(emailData) {
  try {
    const { to, subject, templateName, data } = emailData;
    const renderedEmail = renderEmail(templateName, data);

    const mailOptions = {
      from: 'appehms@gmail.com', // Set the sender email address
      to,
      subject,
      html: renderedEmail,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendEmail,
};
