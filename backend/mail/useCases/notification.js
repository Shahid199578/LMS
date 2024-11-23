const sendMail = require('../sendMail');
const generateMailOptions = require('../mailOptions');

const sendNotification = async (email, subject, message) => {
  const mailOptions = generateMailOptions({
    email,
    message,
    subject, // Explicitly provide the subject for notifications
  });

  return await sendMail(mailOptions);
};

module.exports = sendNotification;
