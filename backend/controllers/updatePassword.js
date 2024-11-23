const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/User");

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; // Extract JWT from Authorization header

  if (!token) {
    return res.status(400).json({ message: "Token is required for password update." });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ status: "success", message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password. Please try again." });
  }
};

module.exports = updatePassword;
