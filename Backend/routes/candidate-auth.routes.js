const express = require('express');
const router = express.Router();
const {
  registerCandidate,
  loginCandidate, verifyEmailOTP
} = require('../controllers/candidate-auth.controller');

router.post('/register', registerCandidate);
router.post('/login', loginCandidate);
router.post("/verify-otp", verifyEmailOTP);

module.exports = router;
