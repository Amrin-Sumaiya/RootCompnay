const express = require('express');;
const router = express.Router();
const locationController = require('../controllers/location.controller');

const { getDivisions, getDistricts, getUpazilas } = locationController;

// Routes
router.get('/divisions', getDivisions);
router.get('/districts/:divisionId', getDistricts);
router.get('/upazilas/:districtId', getUpazilas);

module.exports = router;