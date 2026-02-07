const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerCandidate = (req, res) => {
  const { name, email, password } = req.body;

  // 1️⃣ Check if email already exists (ANY TYPE)
  db.query(
    'SELECT id, type FROM users WHERE email = ?',
    [email],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (rows.length > 0) {
        return res.status(400).json({
          message: 'This email is already registered. Please login instead.'
        });
      }

      // 2️⃣ Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 3️⃣ Insert candidate
      db.query(
        'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, 2)',
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Failed to register user' });
          }

          const token = jwt.sign(
            { userId: result.insertId, type: 2, email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );

          res.json({ token, message: 'Registration successful' });
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
