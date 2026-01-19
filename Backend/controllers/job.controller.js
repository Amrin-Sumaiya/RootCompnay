const db = require('../db');

// CREATE JOB (company only)
exports.createJob = (req, res) => {
  const {
    JobTitle,
    JobDescription,
    Address,
    Country,
    State,
    City,
    SalaryFrom,
    SalaryTo,
    SalaryType,
    Currency
  } = req.body;

  const { companyId, companyUrl } = req.user; // from JWT

  if (!companyId) {
    return res.status(403).json({ message: 'Unauthorized company' });
  }

  // slug generator
  const slug = JobTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const jobLink = `/${companyUrl}/${slug}`;

  const sql = `
    INSERT INTO jobs
    (CompanyID, Company_URL, JobTitle, JobSlug, JobLink,
     JobDescription, Address, Country, State, City,
     SalaryFrom, SalaryTo, SalaryType, Currency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      companyId,
      companyUrl,
      JobTitle,
      slug,
      jobLink,
      JobDescription,
      Address,
      Country,
      State,
      City,
      SalaryFrom,
      SalaryTo,
      SalaryType,
      Currency
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      
      res.status(201).json({ message: 'Job created successfully', jobLink });
    }
  );
};

// GET JOBS (only own company)
exports.getCompanyJobs = (req, res) => {
  const { companyId } = req.user;

  db.query(
    'SELECT * FROM jobs WHERE CompanyID = ? ORDER BY CreatedAt DESC',
    [companyId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// DELETE JOB
exports.deleteJob = (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;

  db.query(
    'DELETE FROM jobs WHERE JobID = ? AND CompanyID = ?',
    [id, companyId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.affectedRows)
        return res.status(404).json({ message: 'Job not found' });

      res.json({ message: 'Job deleted' });
    }
  );
};
// UPDATE JOB
exports.updateJob = (req, res) => {
  const { id } = req.params;    
    const { companyId } = req.user;
    const {
        JobTitle,
        JobDescription,
        Address,
        Country,
        State,
        City,
        SalaryFrom,
        SalaryTo,
        SalaryType,
        Currency
    } = req.body;
    const slug = JobTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const jobLink = `/${req.user.companyUrl}/${slug}`;
    const sql = `
        UPDATE jobs
        SET JobTitle = ?, JobSlug = ?, JobLink = ?, JobDescription = ?, Address = ?, Country = ?, State = ?, City = ?, SalaryFrom = ?, SalaryTo = ?, SalaryType = ?, Currency = ?
        WHERE JobID = ? AND CompanyID = ?
    `;
    db.query(
        sql,
        [   
            JobTitle,
            slug,
            jobLink,
            JobDescription,
            Address,
            Country,
            State,
            City,
            SalaryFrom,
            SalaryTo,
            SalaryType,
            Currency,
            id,
            companyId
        ],  
        (err, result) => {
            if (err) return res.status(500).json(err);  
            if (result.affectedRows === 0)
                return res.status(404).json({ message: 'Job not found' });
            res.json({ message: 'Job updated successfully', jobLink });
        }
    );
}


// GET ALL JOBS (public)
exports.getAllJobs = (req, res) => {
  const sql = `
    SELECT JobID, CompanyID, Company_URL, JobTitle, JobSlug, JobLink, JobDescription, Address, Country, State, City,
           SalaryFrom, SalaryTo, SalaryType, Currency, CreatedAt
    FROM jobs
    ORDER BY CreatedAt DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
