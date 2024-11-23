// ./routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const { getCourses, getCourse } = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:courseId', getCourse);

module.exports = router;
