const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const {
  createCompanyWithUser,
  getAllCompanies,
  getOtpSettings, updateOtpSettings
} = require('../controllers/admin.controller');

router.post('/company', auth, role('root'), createCompanyWithUser);
router.get('/companies', auth, role('root'), getAllCompanies);

const { createProfessionalCourse } = require('../controllers/admin.controller');

router.post(
  '/professional-course',
  auth,
  role('root'),
  createProfessionalCourse
);

router.get('/otp-settings', auth, role('root'), getOtpSettings);
router.put('/otp-settings', auth, role('root'), updateOtpSettings);


module.exports = router;
