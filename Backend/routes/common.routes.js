const express = require('express');
const router = express.Router();
const { getProfessionalCourses } = require('../controllers/common.controller');

router.get('/professional-courses', getProfessionalCourses);

module.exports = router;
