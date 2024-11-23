// ./routes/profileUpdate.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middleware/verifyToken');

// Update profile route
router.put('/', verifyToken, profileController.updateProfile);

module.exports = router;
