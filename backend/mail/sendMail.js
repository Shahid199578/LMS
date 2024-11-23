// sendMail.js
const nodemailer = require('nodemailer');
require('dotenv').config();


// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other service you use
  auth: {
    user: process.env.EMAIL,  // The sender's email (you should store this securely)
    pass: process.env.EMAIL_PASSWORD, // The sender's email password or app password
  },
});

// Function to send email using generated mail options
const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent Successfully');
    return { status: true, info };
  } catch (error) {
    console.error('Error sending mail:', error);
    return { status: false, error };
  }
};

module.exports = sendMail;
