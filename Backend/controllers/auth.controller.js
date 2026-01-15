// controllers/auth.controller.js
const db = require('../db');
const { generateToken } = require('../utils/jwt');

/* COMMON LOGIN: root or company */
exports.login = (req, res) => {
  const { username, password, company_url } = req.body;

  // ROOT LOGIN
  if (username && password) {
    if (
      username === process.env.ROOT_USERNAME &&
      password === process.env.ROOT_PASSWORD
    ) {
      const token = generateToken({ role: 'root' });
      return res.json({ token, role: 'root' });
    } else {
      return res.status(401).json({ message: 'Invalid root credentials' });
    }
  }

  // COMPANY LOGIN
  if (company_url) {
    db.query(
      'SELECT CompanyID, CompanyName, Company_URL FROM company WHERE Company_URL = ?',
      [company_url],
      (err, result) => {
        if (err || !result.length) {
          return res.status(404).json({ message: 'Invalid company URL' });
        }

        const company = result[0];
        const token = generateToken({
          role: 'company',
          companyId: company.CompanyID,
          companyUrl: company.Company_URL,
        });

        res.json({ token, role: 'company', company });
      }
    );
  } else {
    return res.status(400).json({ message: 'Please provide credentials' });
  }
};
