const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Brevo SMTP host
    port: 587, // TLS port
    secure: false, // False for 587 (TLS)
    auth: {
      user: process.env.BREVO_SMTP_USER, // Your Brevo SMTP login
      pass: process.env.BREVO_SMTP_KEY, // Your Brevo SMTP key
    },
  });

  const mailOpts = {
    from: 'E-shop App <your-email@yourdomain.com>', // Replace with your sender email
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOpts);
    console.log(`Email sent successfully to ${options.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;