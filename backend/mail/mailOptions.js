// mailOptions.js
const generateMailOptions = ({ email, message, otp = null, useCase = null, subject = null }) => {

  // Define default subjects for common use cases
  const subjects = {
    registration: 'Registration OTP',
    passwordReset: 'Password Reset OTP',
    notification: 'Important Notification',
    welcome: 'Welcome to Our Service',
    custom: subject || 'No Subject',
  };

  return {
    from: process.env.EMAIL,
    to: email,
    subject: subjects[useCase] || subjects.custom,
    html: `
      <div>
        <p>${message}</p>
        ${otp ? `<p><strong>OTP: ${otp}</strong></p>` : ''}
      </div>
    `,
  };
};

module.exports = generateMailOptions;
