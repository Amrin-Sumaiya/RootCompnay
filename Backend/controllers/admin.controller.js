const db = require('../db');
const bcrypt = require('bcryptjs');

exports.createCompanyWithUser = (req, res) => {
  const { companyName, companyUrl, foundedDate, email, password } = req.body;

  if (!email || !password || !companyName || !companyUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  //  ONLY type
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

// GET OTP SETTINGS
exports.getOtpSettings = (req, res) => {
  db.query(
    "SELECT email_otp_enabled, phone_otp_enabled FROM system_settings WHERE id = 1",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// UPDATE OTP SETTINGS
exports.updateOtpSettings = (req, res) => {
  const { emailEnabled, phoneEnabled } = req.body;

  db.query(
    "UPDATE system_settings SET email_otp_enabled = ?, phone_otp_enabled = ? WHERE id = 1",
    [emailEnabled, phoneEnabled],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "OTP settings updated successfully" });
    }
  );
};

// ================= CREATE COMPANY TYPE =================
exports.createCompanyType = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Company type name is required' });
  }

  db.query(
    'INSERT INTO company_types (name) VALUES (?)',
    [name],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Company type already exists' });
        }
        return res.status(500).json(err);
      }

      res.status(201).json({ message: 'Company type created successfully' });
    }
  );
};

// ================= GET ALL COMPANY TYPES (PUBLIC) =================
exports.getCompanyTypes = (req, res) => {
  db.query(
    'SELECT id, name FROM company_types ORDER BY name ASC',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ================= CREATE UNIVERSITY =================
exports.createUniversity = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "University name is required" });
  }

  const userId = req.user.id; // comes from auth middleware

  db.query(
    "INSERT INTO universities (name, created_by) VALUES (?, ?)",
    [name, userId],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "University already exists" });
        }
        return res.status(500).json(err);
      }

      res.status(201).json({ message: "University created successfully" });
    }
  );
};

// ================= GET ALL UNIVERSITIES =================
exports.getUniversities = (req, res) => {
  db.query(
    `
    SELECT 
      u.id,
      u.name,
      us.email AS created_by_email
    FROM universities u
    LEFT JOIN users us ON us.id = u.created_by
    ORDER BY u.name ASC
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ================= CREATE SCHOOL =================
exports.createSchool = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "School name is required" });
  }

  db.query(
    "INSERT INTO schools (name) VALUES (?)",
    [name],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "School already exists" });
        }
        return res.status(500).json(err);
      }

      res.status(201).json({ message: "School created successfully" });
    }
  );
};

// ================= GET ALL SCHOOLS =================
exports.getSchools = (req, res) => {
  db.query(
    "SELECT id, name FROM schools ORDER BY name ASC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};




