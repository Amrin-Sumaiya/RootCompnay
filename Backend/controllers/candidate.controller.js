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

  // Join users + candidate_profiles
  db.query(
    `
    SELECT 
      u.name,
      u.phone,
      u.email,
      cp.profile_data
    FROM users u
    LEFT JOIN candidate_profiles cp 
      ON u.id = cp.user_id
    WHERE u.id = ?
    `,
    [userId],
    (err, rows) => {
      if (err) {
        console.error('GET PROFILE ERROR:', err);
        return res.status(500).json({ message: 'Failed to fetch profile' });
      }

      if (!rows.length) {
        return res.json(null);
      }

      const user = rows[0];

      let profileData = {};

      if (user.profile_data) {
        profileData = JSON.parse(user.profile_data);
      }

      // 🔥 Merge registration data + profile data
      const responseData = {
        fullName: user.name,
        phone: user.phone,
        email: user.email,
        ...profileData
      };

      res.json(responseData);
    }
  );
};

