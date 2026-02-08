const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/uploadCV');

const { saveProfile, getProfile } = require('../controllers/candidate.controller');

router.post(
  '/profile',
  auth,
  saveProfile
);
router.get('/profile', auth, getProfile);


module.exports = router;
