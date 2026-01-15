// routes/company.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { getDashboard } = require('../controllers/company.controller');

// Protected route for company dashboard
router.get('/company/dashboard', auth, role('company'), getDashboard);

module.exports = router;
