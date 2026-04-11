const db = require('../db');

exports.getProfessionalCourses = (req, res) => {
  db.query(
    'SELECT id, name FROM professional_courses ORDER BY name',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
