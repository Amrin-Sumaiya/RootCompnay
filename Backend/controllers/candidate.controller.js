const db = require('../db');

exports.saveProfile = (req, res) => {
  const userId = req.user.userId;
  const data = req.body;

  db.query(
    `
    INSERT INTO candidate_profiles (user_id, profile_data)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE
      profile_data = VALUES(profile_data)
    `,
    [userId, JSON.stringify(data)],
    (err) => {
      if (err) {
        console.error('SAVE PROFILE ERROR:', err);
        return res.status(500).json({ message: 'Failed to save profile' });
      }

      res.json({ message: 'Profile saved successfully' });
    }
  );
};

//candidates control 
exports.getProfile = (req, res) => {
  const userId = req.user.userId;

  db.query(
    'SELECT profile_data FROM candidate_profiles WHERE user_id = ?',
    [userId],
    (err, rows) => {
      if (err) {
        console.error('GET PROFILE ERROR:', err);
        return res.status(500).json({ message: 'Failed to fetch profile' });
      }

      if (!rows.length) {
        // First-time user → no profile yet
        return res.json(null);
      }

      res.json(JSON.parse(rows[0].profile_data));
    }
  );
};

