const db = require('../db');

// GET ALL DIVISIONS
exports.getDivisions = (req, res) => {
  db.query("SELECT * FROM divisions ORDER BY name ASC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// GET DISTRICTS BY DIVISION
exports.getDistricts = (req, res) => {
  const { divisionId } = req.params;

  db.query(
    "SELECT * FROM districts WHERE division_id = ? ORDER BY name ASC",
    [divisionId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// GET UPAZILAS BY DISTRICT
exports.getUpazilas = (req, res) => {
  const { districtId } = req.params;

  db.query(
    "SELECT * FROM upazilas WHERE district_id = ? ORDER BY name ASC",
    [districtId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};