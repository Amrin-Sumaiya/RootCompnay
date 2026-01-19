const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadCV');
const { applyForJob } = require('../controllers/jobApplication.controller');

// PUBLIC route (no login required)
router.post('/apply', upload.single('cv'), applyForJob);

module.exports = router;
