const db = require('../db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ================= EMAIL + PASSWORD REGISTER ================= */
exports.register = (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: 'Name, email and password are required',
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO candidates (email, password, name, provider)
    VALUES (?, ?, ?, 'local')
  `;

  db.query(sql, [email, hashedPassword, name], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Registration failed' });
    }

    const token = generateToken({
      role: 'candidate',
      email,
    });

    res.status(201).json({
      token,
      role: 'candidate',
      message: 'Registration successful',
    });
  });
};

/* ================= EMAIL + PASSWORD LOGIN ================= */
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  const sql = `
    SELECT id, email, password, provider 
    FROM candidates 
    WHERE email = ?
  `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (!result.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];

    // ❌ Google account trying email/password login
    if (user.provider !== 'local') {
      return res.status(401).json({
        message: 'This account was created using Google Sign-In',
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      role: 'candidate',
      email: user.email,
    });

    res.json({
      token,
      role: 'candidate',
      message: 'Login successful',
    });
  });
};

/* ================= GOOGLE SIGN IN ================= */
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    return res.status(400).json({ message: 'Token ID is required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    const checkSql = `
      SELECT id, email 
      FROM candidates 
      WHERE email = ?
    `;

    db.query(checkSql, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // ✅ Existing user → login
      if (result.length) {
        const token = generateToken({
          role: 'candidate',
          email,
        });

        return res.json({
          token,
          role: 'candidate',
          message: 'Login successful',
        });
      }

      // ✅ New Google user → register
      const insertSql = `
        INSERT INTO candidates (email, name, provider)
        VALUES (?, ?, 'google')
      `;

      db.query(insertSql, [email, name], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Registration failed' });
        }

        const token = generateToken({
          role: 'candidate',
          email,
        });

        res.status(201).json({
          token,
          role: 'candidate',
          message: 'Registration successful',
        });
      });
    });
  } catch (err) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
};
