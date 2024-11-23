// ./routes/profileGet.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middleware/verifyToken');

// Get profile route
router.get('/', verifyToken, profileController.getProfile);

module.exports = router;
