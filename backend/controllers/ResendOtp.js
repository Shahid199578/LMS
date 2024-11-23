const User = require('../models/User');
const sendMail = require('../mail/sendMail'); // Utility to send email

const ResendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required', status: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: false });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    user.otp = {
      otp: newOtp,
      sendTime: new Date(),
    };

    await user.save();

    await sendMail(user.email, newOtp); // Send OTP to the user's email
    res.status(200).json({ message: 'New OTP sent successfully', status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = ResendOtp;
