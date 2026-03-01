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
    password
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
        "INSERT INTO company (user_id, CompanyName, Person_Name, Phone, Company_URL) VALUES (?, ?, ?, ?, ?)",
        [userId, companyName, personName, phone, companyUrl],
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
      if (err || !result.length) return res.status(404).json({ message: 'Company not found' });
      res.json(result[0]);
    }
  );
};