const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTPEmail = require("../utils/sendEmail");

exports.registerCandidate = (req, res) => {
  const { name, phone, email, password } = req.body;

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (rows.length > 0) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

      db.query(
        `INSERT INTO users 
        (name, phone, email, password, type, otp, otp_expiry, is_verified) 
        VALUES (?, ?, ?, ?, 2, ?, ?, 0)`,
        [name, phone, email, hashedPassword, otp, otpExpiry],
        async (err) => {
          if (err)
            return res.status(500).json({ message: "Registration failed" });
try {
  await sendOTPEmail(email, otp);
  return res.json({ message: "OTP sent to your email" });
} catch (error) {
  console.error("EMAIL ERROR:", error);
  return res.status(500).json({ message: "Failed to send OTP email" });
}
        }
      );
    }
  );
};


//OTP controller create 
exports.verifyEmailOTP = (req, res) => {
  const { email, otp } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows) => {
      if (err || !rows.length)
        return res.status(400).json({ message: "Invalid request" });

      const user = rows[0];

      if (user.is_verified)
        return res.json({ message: "Already verified" });

      if (user.otp !== otp)
        return res.status(400).json({ message: "Invalid OTP" });

      if (new Date(user.otp_expiry) < new Date())
        return res.status(400).json({ message: "OTP expired" });

      // Update verified status
      db.query(
        "UPDATE users SET is_verified = 1, otp = NULL, otp_expiry = NULL WHERE email = ?",
        [email],
        (err) => {
          if (err)
            return res.status(500).json({ message: "Verification failed" });

          // Generate JWT token after OTP verification
          const token = jwt.sign(
            { userId: user.id, type: 2, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.json({ message: "Email verified successfully", token });
        }
      );
    }
  );
};
exports.loginCandidate = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND type = 2',
    [email],
    (err, result) => {
      if (err || !result.length) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, type: 2, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, message: 'Login successful' });
    }
  );
};
