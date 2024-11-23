const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator"); // For validation

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation checks (can be done via middleware as well)
  await body("email").isEmail().withMessage("Invalid email format").run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), status: false });
  }

  try {
    const formattedName = name.trim().toLowerCase();
    const formattedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: formattedEmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already in use", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", status: true });
  } catch (error) {
    next(error); // Forward to error-handling middleware
  }
};

module.exports = register;
