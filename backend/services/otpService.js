const { saveOtpToUser } = require("../utils/otp");
const sendOtpEmail = require("../mail/useCases/sendOtpEmail");

/**
 * Generates and sends an OTP to the user
 * @param {object} user - The user object from the database
 * @returns {Promise<void>}
 */
const sendOtp = async (user) => {
  // Generate and save the OTP
  const { otp } = await saveOtpToUser(user);

  // Send the OTP via email
  await sendOtpEmail(user.email, otp);

  console.log(`OTP sent to ${user.email}: ${otp}`);
};

module.exports = sendOtp;
