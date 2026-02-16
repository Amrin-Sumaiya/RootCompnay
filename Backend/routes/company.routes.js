// routes/company.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { login, getDashboard, sendOTP, verifyOTPAndRegister } = require('../controllers/company.controller');

// Protected route for company dashboard
router.post('/login', login);
router.get('/dashboard', auth, role('company'), getDashboard);
router.post('/send-otp', sendOTP);
router.post('/verify-otp-and-register', verifyOTPAndRegister);

module.exports = router;
