const db = require('../db');

// ================= CREATE JOB =================
exports.createJob = (req, res) => {
  const {
    JobTitle,
    JobDescription,
    JobResponsibilities,
    Qualifications,
    Skills,
    JobType,
    WeeklyVacation,
    Benefits,
    Experience,
    JobLocation,
    Address,
    Country,
    State,
    City,
    SalaryFrom,
    SalaryTo,
    SalaryType,
    Currency
  } = req.body;

  const { companyId, companyUrl } = req.user;

  if (!companyId) {
    return res.status(403).json({ message: 'Unauthorized company' });
  }

  const slug = JobTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const jobLink = `/${companyUrl}/${slug}`;

  const sql = `
    INSERT INTO jobs (
      CompanyID, Company_URL, JobTitle, JobSlug, JobLink,
      JobDescription, JobResponsibilities, Qualifications, Skills,
      JobType, WeeklyVacation, Benefits, Experience, JobLocation,
      Address, Country, State, City,
      SalaryFrom, SalaryTo, SalaryType, Currency
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      JobResponsibilities,
      Qualifications,
      Skills,
      JobType,
      WeeklyVacation,
      Benefits,
      Experience,
      JobLocation,
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

// ================= GET COMPANY JOBS =================
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

// ================= UPDATE JOB =================
exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { companyId, companyUrl } = req.user;

  const {
    JobTitle,
    JobDescription,
    JobResponsibilities,
    Qualifications,
    Skills,
    JobType,
    WeeklyVacation,
    Benefits,
    Experience,
    JobLocation,
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

  const jobLink = `/${companyUrl}/${slug}`;

  const sql = `
    UPDATE jobs SET
      JobTitle = ?, JobSlug = ?, JobLink = ?,
      JobDescription = ?, JobResponsibilities = ?, Qualifications = ?, Skills = ?,
      JobType = ?, WeeklyVacation = ?, Benefits = ?, Experience = ?, JobLocation = ?,
      Address = ?, Country = ?, State = ?, City = ?,
      SalaryFrom = ?, SalaryTo = ?, SalaryType = ?, Currency = ?
    WHERE JobID = ? AND CompanyID = ?
  `;

  db.query(
    sql,
    [
      JobTitle,
      slug,
      jobLink,
      JobDescription,
      JobResponsibilities,
      Qualifications,
      Skills,
      JobType,
      WeeklyVacation,
      Benefits,
      Experience,
      JobLocation,
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
      if (!result.affectedRows)
        return res.status(404).json({ message: 'Job not found' });

      res.json({ message: 'Job updated successfully', jobLink });
    }
  );
};

// ================= GET SINGLE JOB =================
exports.getSingleJob = (req, res) => {
  const { id } = req.params;
  const { companyId } = req.user;

  db.query(
    'SELECT * FROM jobs WHERE JobID = ? AND CompanyID = ?',
    [id, companyId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length)
        return res.status(404).json({ message: 'Job not found' });

      res.json(result[0]);
    }
  );
};


// ================= DELETE JOB =================
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

// ================= GET ALL JOBS (PUBLIC) =================
exports.getAllJobs = (req, res) => {
  const sql = `
    SELECT
      JobID, CompanyID, Company_URL, JobTitle, JobSlug, JobLink,
      JobDescription, JobResponsibilities, Qualifications, Skills,
      JobType, WeeklyVacation, Benefits, Experience, JobLocation,
      Address, Country, State, City,
      SalaryFrom, SalaryTo, SalaryType, Currency, CreatedAt
    FROM jobs
    ORDER BY CreatedAt DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


// ================= PUBLIC JOB DETAILS =================
exports.getPublicJobDetails = (req, res) => {
  const { companyUrl, jobSlug } = req.params;

  // FIX: Check for Company_URL with OR without the slash
  const sql = `
    SELECT *
    FROM jobs
    WHERE (Company_URL = ? OR Company_URL = ?) AND JobSlug = ?
    LIMIT 1
  `;

  // We pass companyUrl twice: once as is (e.g. "igl") and once with a slash (e.g. "/igl")
  const slashUrl = companyUrl.startsWith('/') ? companyUrl : `/${companyUrl}`;
  const cleanUrl = companyUrl.replace(/^\//, "");

  db.query(sql, [cleanUrl, slashUrl, jobSlug], (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.length)
      return res.status(404).json({ message: 'Job not found' });

    res.json(result[0]);
  });
};

