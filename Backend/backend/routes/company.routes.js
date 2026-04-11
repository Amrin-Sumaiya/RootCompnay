// routes/company.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../middleware/uploadCompanyLogo')


const { login, getDashboard, sendOTP,
     verifyOTPAndRegister , getCompaniesWithJobs,
    globalSearch, uploadCompanyLogo, buyPackage, getMyPackage, getAllMyPackages} = require('../controllers/company.controller');

// Protected route for company dashboard
router.post('/login', login);
router.get('/dashboard', auth, role('company'), getDashboard);
router.post('/send-otp', sendOTP);
router.post('/verify-otp-and-register', verifyOTPAndRegister);
router.get('/public-with-jobs', getCompaniesWithJobs);
router.get('/search', globalSearch);
router.post('/upload-logo', auth, role('company'), upload.single('logo'), uploadCompanyLogo);
router.post('/buy-package', auth, role('company'), buyPackage);
router.get('/my-package', auth, role('company'), getMyPackage);
router.get('/my-packages', auth, role('company'), getAllMyPackages);

router.get('/stats', async (req, res) => {
  try {
    const db = require('../db');

    const stats = await new Promise((resolve, reject) => {
      db.query(`
        SELECT 
          COUNT(*) AS totalCompanies,
          SUM(CASE WHEN created_by = 'self' THEN 1 ELSE 0 END) AS selfRegistered,
          SUM(CASE WHEN created_by = 'admin' THEN 1 ELSE 0 END) AS adminCreated
        FROM company
      `, (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    }); 

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;



