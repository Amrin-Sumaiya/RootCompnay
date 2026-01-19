const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadCV');
const { applyForJob, getCandidatesForJob } = require('../controllers/jobApplication.controller');

// PUBLIC route (no login required)
router.post('/apply', upload.single('cv'), applyForJob);
router.get('/candidates/:jobId', getCandidatesForJob);

module.exports = router;
