const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadCV');
const { applyForJob, getCandidatesForJob, updateApplicationStatus } = require('../controllers/jobApplication.controller');

// PUBLIC route (no login required)
router.post('/apply', upload.single('cv'), applyForJob);
router.get('/candidates/:jobId', getCandidatesForJob);
router.put('/applications/:applicationId/status', updateApplicationStatus);

module.exports = router;
