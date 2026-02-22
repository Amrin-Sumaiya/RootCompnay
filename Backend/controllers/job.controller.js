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

  // const jobLink = `/${companyUrl}/${slug}`;

const sql = `
  INSERT INTO jobs (
    CompanyID, JobTitle, JobSlug,
    JobDescription, JobResponsibilities, Qualifications, Skills,
    JobType, WeeklyVacation, Benefits, Experience, JobLocation,
    Address, Country, State, City,
    SalaryFrom, SalaryTo, SalaryType, Currency
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

db.query(
  sql,
  [
    companyId,
    JobTitle,
    slug,
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
    res.status(201).json({ message: 'Job created successfully' });
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
      JobTitle = ?, JobSlug = ?, 
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
      jobs.*, 
      company.CompanyName,
      company.Company_URL
    FROM jobs
    LEFT JOIN company ON jobs.CompanyID = company.CompanyID
    WHERE company.Company_URL IS NOT NULL
    ORDER BY jobs.CreatedAt DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


// // ================= GET ALL JOBS (PUBLIC) =================
// exports.getAllJobs = (req, res) => {

  
//   // UPDATE: We use JOIN to get the CompanyName from the company table
//   const sql = `
//     SELECT 
//       jobs.*, 
//       company.CompanyName, 
//       company.Company_URL
//     FROM jobs 
//     JOIN company ON jobs.CompanyID = company.CompanyID 
//     ORDER BY jobs.CreatedAt DESC
//   `;

//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);

//   });
   
// };

 


// ================= PUBLIC JOB DETAILS =================
exports.getPublicJobDetails = (req, res) => {
  const { companyUrl, jobSlug } = req.params;

  if (!companyUrl || !jobSlug) {
    return res.status(400).json({ message: "Invalid parameters" });
  }

  const cleanUrl = companyUrl.replace(/^\//, "");
  const slashUrl = `/${cleanUrl}`;

  const sql = `
    SELECT 
      jobs.*,
      company.CompanyName,
      company.Company_URL
    FROM jobs
    JOIN company ON jobs.CompanyID = company.CompanyID
    WHERE (company.Company_URL = ? OR company.Company_URL = ?)
      AND jobs.JobSlug = ?
    LIMIT 1
  `;

  db.query(sql, [cleanUrl, slashUrl, jobSlug], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json(err);
    }

    if (!result.length) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result[0]);
  });
};

// ================= GET ALL COMPANY TYPES (PUBLIC) =================
exports.getCompanyTypes = (req, res) => {
  db.query(
    'SELECT id, name FROM company_types ORDER BY name ASC',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};




