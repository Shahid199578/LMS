const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Assuming you're using JWT for authentication

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Normalize email to lowercase to ensure case-insensitivity
    const formattedEmail = email.toLowerCase();

    // Find the user by email
    const findedUser = await User.findOne({ email: formattedEmail });

    if (!findedUser) {
      // Return error if user not found
      return res
        .status(400)
        .json({ message: "No user found with this email." });
    }

    // Compare the provided password with the stored hash
    const isPassMatch = await bcrypt.compare(password, findedUser.password);

    if (!isPassMatch) {
      // Return error if password doesn't match
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign(
      { userId: findedUser._id, email: findedUser.email },
      process.env.JWT_SECRET, // You should have a JWT secret stored in environment variables
      { expiresIn: "1h" } // Set the token to expire in 1 hour
    );

    // Send success response with the token
    res.status(200).json({
      message: "Login successful!",
      status: true,
      token: token,
      userId: findedUser._id, // You can include any other user details here
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = login;
