const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const {
  createJob,
  getCompanyJobs,
  getAllJobs,
  deleteJob,
  updateJob,
  getSingleJob,
  getPublicJobDetails
} = require('../controllers/job.controller');

// PUBLIC ROUTES FIRST
router.get('/all-jobs', getAllJobs);
router.get('/public/:companyUrl/:jobSlug', getPublicJobDetails);

// AUTH ROUTES AFTER
router.post('/jobs', auth, role('company'), createJob);
router.get('/jobs', auth, role('company'), getCompanyJobs);

router.put('/:id', auth, role('company'), updateJob);
router.get('/:id', auth, role('company'), getSingleJob);
router.delete('/:id', auth, role('company'), deleteJob);


router.get('/all-jobs', getAllJobs);

module.exports = router;
