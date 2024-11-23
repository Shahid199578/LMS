const User = require("../models/User");
const sendResetPasswordOtp = require("../mail/useCases/resetPasswordOtp");
const generateOtp = require("../utils/otp");

// Function to send OTP or resend OTP if needed
const sendOtp = async (user) => {
  const { otp, token } = generateOtp();
  console.log("Generated OTP:", otp);

  // Update OTP and SendTime in the database
  user.otp = {
    otp,
    sendTime: new Date().toISOString(),
    token,
  };

  await user.save();

  // Placeholder for sending the OTP via email or SMS
  sendResetPasswordOtp(user.email, otp);
};

// Forget Password API - Send OTP
const forgetpassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        status: false,
        code: "EMAIL_REQUIRED",
      });
    }

    const formattedEmail = email.trim().toLowerCase();
    const findedUser = await User.findOne({ email: formattedEmail });

    if (!findedUser) {
      console.error(`User not found for email: ${formattedEmail}`);
      return res.status(404).json({
        message: "No user found with this Email ID.",
        status: false,
        code: "USER_NOT_FOUND",
      });
    }

    // Check if OTP was sent recently
    const otpCooldownTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const lastOtpSentTime = new Date(findedUser.otp?.sendTime).getTime();
    const currentTime = new Date().getTime();

    // Allow resend if the OTP cooldown time has passed
    if (
      findedUser.otp?.otp &&
      currentTime - lastOtpSentTime < otpCooldownTime
    ) {
      const nextOtpTime = new Date(
        lastOtpSentTime + otpCooldownTime
      ).toLocaleTimeString();

      return res.status(400).json({
        message: `Please wait until ${nextOtpTime} to request a new OTP.`,
        status: false,
        code: "OTP_COOLDOWN",
      });
    }

    // If no valid OTP, or cooldown is passed, generate a new OTP
    await sendOtp(findedUser);

    res.status(200).json({
      message: "OTP sent successfully. Please check your email.",
      status: true,
      token: findedUser.otp.token,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// Resend OTP API
const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        status: false,
        code: "EMAIL_REQUIRED",
      });
    }

    const formattedEmail = email.trim().toLowerCase();
    const findedUser = await User.findOne({ email: formattedEmail });

    if (!findedUser) {
      console.error(`User not found for email: ${formattedEmail}`);
      return res.status(404).json({
        message: "No user found with this Email ID.",
        status: false,
        code: "USER_NOT_FOUND",
      });
    }

    // If the previous OTP has expired or is missing, resend a new OTP
    await sendOtp(findedUser);

    res.status(200).json({
      message: "OTP resent successfully. Please check your email.",
      status: true,
      token: findedUser.otp.token,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = { forgetpassword, resendOtp };
