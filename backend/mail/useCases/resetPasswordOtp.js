const sendMail = require("../sendMail");
const generateMailOptions = require("../mailOptions");

const sendResetPasswordOtp = async (email, otp) => {
  try {
    // Debug Logs for email and OTP
    // console.log("Debug - Email:", email);
    // console.log("Debug - OTP:", otp);

    const mailOptions = generateMailOptions({
      email,
      message: "Your OTP for resetting the password is:",
      otp,
      useCase: "passwordReset",
    });


    // Log the mail options for further debugging
    // console.log("Debug - Mail Options:", mailOptions);

    // console.log("Sending OTP to email:", email); // Corrected to use 'email'

    const result = await sendMail(mailOptions);

    // Log the result of sending mail
    // console.log("Debug - Mail Send Result:", result);

    return result;
  } catch (error) {
    console.error("Error in sending OTP:", error);
    throw error;
  }
};

module.exports = sendResetPasswordOtp;
