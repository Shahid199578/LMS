const sendMail = require('../sendMail');
const generateMailOptions = require('../mailOptions');

const sendRegistrationOtp = async (email, otp) => {
  const mailOptions = generateMailOptions({
    email,
    message: 'Your OTP for registration is:',
    otp,
    useCase: 'registration', // Fetches subject: "Registration OTP"
  });

  return await sendMail(mailOptions);
};

module.exports = sendRegistrationOtp;
