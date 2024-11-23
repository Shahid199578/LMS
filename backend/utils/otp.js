const crypto = require("crypto");

/**
 * Generates a 6-digit OTP and a unique token for verification.
 * @returns {object} - Contains otp (6-digit OTP) and token (unique token).
 */
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const token = crypto.randomBytes(32).toString("hex"); // Unique token

  return {
    otp,
    token,
  };
};

module.exports = generateOtp;
