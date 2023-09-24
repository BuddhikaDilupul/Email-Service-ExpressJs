const httpStatus = require("http-status");
// const kafkaProducer = require("../middlewares/kafkaProducer");
const emailService = require('../services/email');

// Example route handler to send an email
exports.resetPassword = async function sendEmail(req, res) {
  try {
    const emailData = {
      to: req.body.email,
      subject: 'Your Password Changed',
      templateName: 'resetPassword',
      data: {
        name: req.body.name,
        password: req.body.password
      },
    };

    // Call the email service to send the email
    await emailService.sendEmail(emailData);

    // Respond with a success message or other response
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
}
exports.statusAlert = async function sendEmail(req, res) {
  try {
    // Data to be passed to the email template
    const emailData = {
      to: req.body.email, // Set the recipient email address
      subject: 'Action Nedded',
      templateName: 'statusAlert', // Name of the email template file (without extension)
      data: {
        name: req.body.name,
      },
    };

    // Call the email service to send the email`
    await emailService.sendEmail(emailData);

    // Respond with a success message or other response
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to send email.' });
  }
}

exports.newUser = async function sendEmail(req, res) {
  try {
    // Data to be passed to the email template
    const emailData = {
      to: req.body.email, // Set the recipient email address
      subject: 'Action Nedded',
      templateName: 'newUser', // Name of the email template file (without extension)
      data: {
        name: req.body.name,
        password: req.body.password
      },
    };

    // Call the email service to send the email
    await emailService.sendEmail(emailData);

    // Respond with a success message or other response
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to send email.' });
  }
}

exports.newAppoointment = async function sendEmail(req, res) {
  try {
    // Data to be passed to the email template
    const emailData = {
      to: req.body.email,
      subject: 'Appointment Recived',
      templateName: 'newAppointment', 
      data: {
        name: req.body.name,
        date: req.body.date,
        toatalCharges: req.body.toatalCharges
      },
    };

    // Call the email service to send the email
    await emailService.sendEmail(emailData);

    // Respond with a success message or other response
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to send email.' });
  }
}
