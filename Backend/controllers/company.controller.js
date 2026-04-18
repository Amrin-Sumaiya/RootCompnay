const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ================= GENERATE OTP =================
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// =====================================================
// ================= SEND OTP =========================
// =====================================================
exports.sendOTP = async (req, res) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: "Email and phone are required" });
  }

  try {
    // ===== CHECK EXISTING EMAIL =====
    const existingUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (existingUser.length) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ===== GET SYSTEM OTP SETTINGS =====
    const settings = await new Promise((resolve, reject) => {
      db.query(
        "SELECT email_otp_enabled, phone_otp_enabled FROM system_settings WHERE id = 1",
        (err, result) => err ? reject(err) : resolve(result[0])
      );
    });

    const emailOTP = settings.email_otp_enabled ? generateOTP() : null;
    const phoneOTP = settings.phone_otp_enabled ? generateOTP() : null;

    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // ===== FORMAT PHONE (BD FORMAT) =====
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) formattedPhone = "88" + formattedPhone;
    if (!formattedPhone.startsWith("88")) formattedPhone = "88" + formattedPhone;

    // ===== SEND SMS IF ENABLED =====
    if (phoneOTP) {
      try {
        await axios.get("http://sms.iglweb.com/api/v1/send", {
          params: {
            api_key: "4451764741797151764741797",
            contacts: formattedPhone,
            senderid: "01844532630",
            msg: `Your OTP is ${phoneOTP}`
          }
        });
        console.log("SMS SENT");
      } catch (smsError) {
        console.log("SMS ERROR:", smsError.response?.data || smsError.message);
      }
    }

    // ===== SEND EMAIL IF ENABLED =====
    if (emailOTP) {
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const transporter = nodemailer.createTransport({
             host: "mail.igltour.com",
  port: 465,
  secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Company Registration OTP",
            text: `Your Email OTP is ${emailOTP}`
          });

          console.log("EMAIL SENT");
        }
      } catch (emailError) {
        console.log("EMAIL ERROR:", emailError.message);
      }
    }

    // ===== SAVE OTPS =====
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO company_otps (email, phone, email_otp, phone_otp, expires_at) VALUES (?, ?, ?, ?, ?)",
        [email, phone, emailOTP, phoneOTP, expires],
        (err) => (err ? reject(err) : resolve())
      );
    });

    res.json({ 
      message: "OTP sent successfully", 
      emailOTPEnabled: !!emailOTP, 
      phoneOTPEnabled: !!phoneOTP 
    });

  } catch (error) {
    console.log("FINAL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================================================
// ============ VERIFY OTP & REGISTER ==================
// =====================================================
exports.verifyOTPAndRegister = async (req, res) => {
  const {
  email,
  phone,
  emailOTP,
  phoneOTP,
  companyName,
  personName,
  companyType,
  password,
  Address,
  City,
  State
  } = req.body;

  if (!email || !phone || !password || !companyName || !personName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ===== FETCH SYSTEM OTP SETTINGS =====
    const settings = await new Promise((resolve, reject) => {
      db.query(
        "SELECT email_otp_enabled, phone_otp_enabled FROM system_settings WHERE id = 1",
        (err, result) => (err ? reject(err) : resolve(result[0]))
      );
    });

    // ===== FETCH OTP RECORD =====
    const otpData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM company_otps WHERE email = ? AND phone = ? ORDER BY id DESC LIMIT 1",
        [email, phone],
        (err, result) => (err ? reject(err) : resolve(result[0]))
      );
    });

    if (!otpData) return res.status(400).json({ message: "OTP not found" });

    // ===== VALIDATE ONLY ENABLED OTPs =====
    if (settings.email_otp_enabled && otpData.email_otp !== emailOTP) {
      return res.status(400).json({ message: "Invalid Email OTP" });
    }
    if (settings.phone_otp_enabled && otpData.phone_otp !== phoneOTP) {
      return res.status(400).json({ message: "Invalid Phone OTP" });
    }

    if (new Date() > new Date(otpData.expires_at)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ===== HASH PASSWORD & CREATE USER =====
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (email, password, type) VALUES (?, ?, 1)",
        [email, hashedPassword],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    const userId = userResult.insertId;

    // ✅ GENERATE COMPANY URL
    const companyUrl = companyName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // ===== INSERT COMPANY =====
    const companyResult = await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO company (user_id, CompanyName, Person_Name, Phone, Company_URL, Address, City, State) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
  userId,
  companyName,
  personName,
  phone,
  companyUrl,
  Address,
  City,
  State
],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    const companyId = companyResult.insertId;

    // DELETE USED OTP
    db.query("DELETE FROM company_otps WHERE email = ?", [email]);

    // ===== CREATE JWT TOKEN =====
    const token = jwt.sign(
      { userId, type: 1, companyId, companyUrl },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Company registered successfully",
      token,
      role: 1,
      companyId,
      companyUrl
    });

  } catch (err) {
    console.log("FINAL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};




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
      if (err || !result.length) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const company = result[0];

      // ✅ FIX 1: convert logo → full URL
      if (company.logo) {
        company.Logo = `http://localhost:5000/${company.logo}`;
      } else {
        company.Logo = null;
      }

      res.json(company);
    }
  );
};

// ================= GET COMPANIES WITH 2 JOBS =================
exports.getCompaniesWithJobs = (req, res) => {
  const sql = `
    SELECT 
      c.CompanyID,
      c.CompanyName,
      c.Company_URL,
      c.logo,
      j.JobID,
      j.JobTitle,
      j.JobSlug,
      j.CreatedAt
    FROM company c
    LEFT JOIN jobs j ON j.CompanyID = c.CompanyID
    ORDER BY c.CompanyID DESC, j.CreatedAt DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const grouped = {};

    results.forEach(row => {
      if (!grouped[row.CompanyID]) {
        grouped[row.CompanyID] = {
          CompanyID: row.CompanyID,
          CompanyName: row.CompanyName,
          Company_URL: row.Company_URL,
          logo: row.logo,
          jobs: []
        };
      }

      // Limit to 2 jobs per company (done in JS instead of SQL)

      
if (row.JobID) {
  grouped[row.CompanyID].jobs.push({
    JobID: row.JobID,
    JobTitle: row.JobTitle,
    JobSlug: row.JobSlug
  });
}
    });

    res.json(Object.values(grouped));
  });
};

// ================= GLOBAL SEARCH (MIN 3 CHAR) =================
exports.globalSearch = (req, res) => {
  const { keyword } = req.query;

  if (!keyword || keyword.length < 3) {
    return res.json([]); // return empty array
  }

  const searchTerm = `%${keyword}%`;

  const sql = `
    SELECT 
      j.JobID,
      j.JobTitle,
      c.CompanyName,
      c.CompanyID
    FROM jobs j
    JOIN company c ON c.CompanyID = j.CompanyID
    WHERE j.JobTitle LIKE ? 
       OR c.CompanyName LIKE ?
    LIMIT 10
  `;

  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json([]);
    }

    res.json(results);
  });
};

// ================= UPLOAD COMPANY LOGO =================
exports.uploadCompanyLogo = (req, res) => {
  const { companyId } = req.user;

  if (!req.file) {
    return res.status(400).json({ message: "Logo file required" });
  }

  const logoPath = '/uploads/' + req.file.filename;

  db.query(
    "UPDATE company SET logo = ? WHERE CompanyID = ?",
    [logoPath, companyId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Logo uploaded successfully",
        logo: logoPath
      });
    }
  );
};


//buy packages 
exports.buyPackage = (req, res) => {
  const { packageId } = req.body;
  const { companyId } = req.user;

  // get package info
  db.query(
    "SELECT * FROM packages WHERE id = ?",
    [packageId],
    (err, result) => {
      if (err || !result.length)
        return res.status(400).json({ message: "Package not found" });

      const pkg = result[0];

const start = new Date();
const end = new Date();

// Use package duration, not job limit duration
end.setDate(end.getDate() + pkg.package_duration_days);

      db.query(
        `INSERT INTO company_packages 
(company_id, package_id, remaining_jobs, start_date, end_date, status)
VALUES (?, ?, ?, ?, ?, 'active')`,
        [companyId, packageId, pkg.job_limit, start, end],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "Package purchased successfully" });
        }
      );
    }
  );
};

// company.controller.js
exports.getMyPackage = (req, res) => {
  const { companyId } = req.user;

  db.query(
    `SELECT cp.*, p.name, p.price, p.job_limit 
     FROM company_packages cp
     JOIN packages p ON p.id = cp.package_id
     WHERE cp.company_id = ?
     ORDER BY cp.id DESC LIMIT 1`,
    [companyId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0] || null);
    }
  );
};


//get all my packages for company

exports.getAllMyPackages = (req, res) => {
  const { companyId } = req.user;

  db.query(
    `SELECT 
      cp.id,
      p.name,
      p.price,
      p.job_limit,
      cp.remaining_jobs,
      cp.start_date,
      cp.end_date,
      cp.status
     FROM company_packages cp
     JOIN packages p ON p.id = cp.package_id
     WHERE cp.company_id = ?
     ORDER BY cp.id DESC`,
    [companyId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};