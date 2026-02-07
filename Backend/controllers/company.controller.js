const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Company login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    `
    SELECT 
      u.id,
      u.email,
      u.password,
      u.type,
      c.CompanyID,
      c.Company_URL
    FROM users u
    LEFT JOIN company c ON c.user_id = u.id
    WHERE u.email = ?
    `,
    [email],
    (err, result) => {
      if (err || !result.length) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT
      const payload = {
        userId: user.id,
        type: user.type,
        email: user.email,
      };

      if (user.type === 1) {
        payload.companyId = user.CompanyID;
        payload.companyUrl = user.Company_URL;
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({
        token,
        role: user.type,
        companyId: user.CompanyID || null,
        companyUrl: user.Company_URL || null,
      });
    }
  );
};

// Company dashboard
exports.getDashboard = (req, res) => {
  const { companyId } = req.user;

  db.query(
    'SELECT * FROM company WHERE CompanyID = ?',
    [companyId],
    (err, result) => {
      if (err || !result.length) return res.status(404).json({ message: 'Company not found' });
      res.json(result[0]);
    }
  );
};
