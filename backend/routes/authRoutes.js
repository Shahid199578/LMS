// ./routes/authRoutes.js

const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
const login = require("../controllers/login");
const { forgetpassword } = require("../controllers/forgetPassword");
const VerifyOtp = require("../controllers/VerifyOtp");
const ResendOtp = require("../controllers/ResendOtp");
const updatePassword = require("../controllers/updatePassword");
const authenticateToken = require("../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.post("/forget/password", forgetpassword);
router.post("/otp/verify", VerifyOtp);
router.post("/otp/Resend", ResendOtp);
router.post("/password/update", authenticateToken, updatePassword);

module.exports = router;

