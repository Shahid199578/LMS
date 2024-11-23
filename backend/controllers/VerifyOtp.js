const jwt = require('jsonwebtoken');
const User = require("../models/User");

const VerifyOtp = async (req, res, next) => {
  try {
    const { otp, token } = req.body;

    if (!otp || otp.length !== 6 || !token) {
      return res.status(400).json({ message: "Invalid OTP or token format", status: false });
    }

    const findedUser = await User.findOne({ 'otp.otp': otp, 'otp.token': token });

    if (!findedUser) {
      return res.status(400).json({ message: "Invalid OTP or token", status: false });
    }

    const otpExpiryTime = new Date(findedUser.otp.sendTime).getTime() + 5 * 60 * 1000;
    if (new Date().getTime() > otpExpiryTime) {
      return res.status(400).json({ message: "OTP expired", status: false });
    }

    // Clear OTP and token after verification
    findedUser.otp = {};
    await findedUser.save();

    // Generate a JWT token
    const jwtToken = jwt.sign({ userId: findedUser._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({
      message: "OTP verified successfully",
      status: true,
      token: jwtToken // Return the JWT token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = VerifyOtp;
