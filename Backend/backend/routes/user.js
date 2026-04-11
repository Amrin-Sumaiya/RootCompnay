const express = require('express');
const router = express.Router();
const db = require('../db');

// ADD COMPANY
router.post('/add_company', (req, res) => {
  const { CompanyName, CompanyCode, Company_URL, FoundedDate } = req.body;

  const getLastIdSql = 'SELECT MAX(CompanyID) AS lastID FROM company';
  db.query(getLastIdSql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error getting last CompanyID' });    //grytuhtf

    let newCompanyId = 445000;
    if (result[0].lastID) newCompanyId = result[0].lastID + 1;

const companySql = `
  INSERT INTO company 
  (CompanyID, CompanyName, CompanyCode, CompanyType, Company_URL, FoundedDate)
  VALUES (?, ?, ?, ?, ?, ?)
`;

    db.query(
      companySql,
      [newCompanyId, CompanyName, CompanyCode, '2', Company_URL, FoundedDate || null],
      (err) => {
        if (err) return res.status(500).json({ error: 'Company insertion error' });
        res.status(201).json({ message: 'Company created successfully', id: newCompanyId });
      }
    );
  });
});

// GET COMPANIES
router.get('/get_company', (req, res) => {
  const sql = 'SELECT * FROM company ORDER BY CompanyID ASC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database retrieval error' });
    res.status(200).json({ data: results });
  });
});

// UPDATE COMPANY
router.put('/update_company/:id', (req, res) => {
  const { id } = req.params;
  const { CompanyName, CompanyCode,  Company_URL, FoundedDate } = req.body;

  const sql = `
    UPDATE company
    SET CompanyName = ?, CompanyCode = ?, FoundedDate = ?, Company_URL = ?
    WHERE CompanyID = ?
  `;
  db.query(sql, [CompanyName, CompanyCode, FoundedDate || null, Company_URL, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating company' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Company not found' });
    res.status(200).json({ message: 'Company updated successfully' });
  });
});

// DELETE COMPANY
router.delete('/delete_company/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM company WHERE CompanyID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting company' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  });
});

module.exports = router;
