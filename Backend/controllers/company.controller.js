// controllers/company.controller.js
const db = require('../db');

exports.getDashboard = (req, res) => {
  const { companyId } = req.user; // comes from auth middleware token

  if (!companyId) return res.status(400).json({ message: 'Invalid company token' });

  db.query(
    'SELECT CompanyID, CompanyName, Company_URL, FoundedDate FROM company WHERE CompanyID = ?',
    [companyId],
    (err, result) => {
      if (err || !result.length) return res.status(404).json({ message: 'Company not found' });

      res.json(result[0]);
    }
  );
};
