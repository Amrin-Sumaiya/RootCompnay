const db = require('../db');
const bcrypt = require('bcryptjs');

exports.createCompanyWithUser = (req, res) => {
  const { companyName, companyUrl, foundedDate, email, password } = req.body;

  if (!email || !password || !companyName || !companyUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  // ✅ ONLY type
  db.query(
    'INSERT INTO users (email, password, type) VALUES (?, ?, ?)',
    [email, hashed, 1], // 1 = company
    (err, userResult) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json(err);
      }

      const userId = userResult.insertId;

      db.query(
        `
        INSERT INTO company (CompanyName, Company_URL, FoundedDate, user_id)
        VALUES (?, ?, ?, ?)
        `,
        [companyName, companyUrl, foundedDate || null, userId],
        (err) => {
          if (err) return res.status(500).json(err);

          res.status(201).json({ message: 'Company created successfully' });
        }
      );
    }
  );
};


// ✅ GET ALL COMPANIES (ROOT ONLY)
exports.getAllCompanies = (req, res) => {
  db.query(
    `
    SELECT 
      c.CompanyID,
      c.CompanyName,
      c.Company_URL,
      c.FoundedDate,
      u.email
    FROM company c
    JOIN users u ON u.id = c.user_id
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

//professional course create
exports.createProfessionalCourse = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Course name is required' });
  }

  db.query(
    'INSERT INTO professional_courses (name) VALUES (?)',
    [name],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Course already exists' });
        }
        return res.status(500).json(err);
      }
      res.status(201).json({ message: 'Course created successfully' });
    }
  );
};

