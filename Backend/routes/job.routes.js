const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const {
  createJob,
  getCompanyJobs,
  getAllJobs,
  deleteJob,
  updateJob
} = require('../controllers/job.controller');

router.post('/jobs', auth, role('company'), createJob);
router.get('/jobs', auth, role('company'), getCompanyJobs);
router.put('/jobs/:id', auth, role('company'), updateJob);
router.delete('/jobs/:id', auth, role('company'), deleteJob);

router.get('/all-jobs', getAllJobs);

module.exports = router;
