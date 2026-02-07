const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/uploadCV');

const { saveProfile } = require('../controllers/candidate.controller');

router.post(
  '/profile',
  auth,
  saveProfile
);


module.exports = router;
