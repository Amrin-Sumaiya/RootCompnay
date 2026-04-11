const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/uploadCV');

const { saveProfile, getProfile, getCandidateStats

 } = require('../controllers/candidate.controller');

router.post(
  '/profile',
  auth,
  saveProfile
);
router.get('/profile', auth, getProfile);
router.get('/stats', getCandidateStats);


module.exports = router;
