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
    Address, // Added back to destructuring so it can be optional
    Country,
    State,   // Added back to destructuring so it can be optional
    City,    // Added back to destructuring so it can be optional
    SalaryFrom,
    SalaryTo,
    SalaryType,
    Currency
  } = req.body;

  const { companyId } = req.user;
  
  if (!JobTitle || !JobDescription || !JobType) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  if (!companyId) {
    return res.status(403).json({ message: 'Unauthorized company' });
  }

  // ✅ STEP 1: FETCH COMPANY DATA
  db.query(
    "SELECT Address, City, State FROM company WHERE CompanyID = ?",
    [companyId],
    (err, companyResult) => {
      if (err) return res.status(500).json(err);
      if (!companyResult.length) {
        return res.status(404).json({ message: "Company not found" });
      }

      const companyData = companyResult[0];

      // Use request body value if provided, otherwise fallback to company database record
      const finalAddress = Address || companyData.Address;
      const finalCity = City || companyData.City;
      const finalState = State || companyData.State;

      // ✅ STEP 2: CHECK ACTIVE PACKAGE
      db.query(
        `SELECT * FROM company_packages
         WHERE company_id = ?
         AND status = 'active'
         AND end_date > NOW()
         AND remaining_jobs > 0
         ORDER BY id ASC
         LIMIT 1`,
        [companyId],
        (err, pkgResult) => {
          if (err) return res.status(500).json(err);

          if (!pkgResult.length) {
            return res.status(400).json({ message: "No active package" });
          }

          const pkg = pkgResult[0];
          const slug = JobTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          const expiresAt = pkg.end_date;

          const sql = `
            INSERT INTO jobs (
              CompanyID, JobTitle, JobSlug,
              JobDescription, JobResponsibilities, Qualifications, Skills,
              JobType, WeeklyVacation, Benefits, Experience, JobLocation,
              Address, Country, State, City,
              SalaryFrom, SalaryTo, SalaryType, Currency,
              expires_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
              finalAddress, // Using the calculated value
              Country,
              finalState,   // Using the calculated value
              finalCity,    // Using the calculated value
              SalaryFrom,
              SalaryTo,
              SalaryType,
              Currency,
              expiresAt
            ],
            (err) => {
              if (err) return res.status(500).json(err);

              // ✅ STEP 3: DECREASE REMAINING JOBS
              db.query(
                `UPDATE company_packages
                 SET remaining_jobs = remaining_jobs - 1
                 WHERE company_id = ?
                 AND status = 'active'
                 AND remaining_jobs > 0
                 ORDER BY id ASC
                 LIMIT 1`,
                [companyId]
              );

              res.status(201).json({ message: 'Job created successfully' });
            }
          );
        }
      );
    }
  );
};

// ================= GET COMPANY JOBS =================
exports.getCompanyJobs = (req, res) => {
  const { companyId } = req.user;

  db.query(
    `
    SELECT *,
    CASE 
      WHEN expires_at < NOW() THEN 'expired'
      ELSE 'active'
    END AS job_status
    FROM jobs 
    WHERE CompanyID = ?
    ORDER BY CreatedAt DESC
    `,
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
AND jobs.status = 'active'
AND jobs.expires_at > NOW()
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};



exports.getPublicCompaniesWithJobs = (req, res) => {

  const sql = `
    SELECT 
      c.CompanyID,
      c.CompanyName,
      c.Company_URL,
      c.logo,
      j.JobID,
      j.JobTitle,
      j.JobSlug
    FROM company c
    LEFT JOIN jobs j ON c.CompanyID = j.CompanyID
    ORDER BY c.CompanyName
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const companies = {};

    results.forEach(row => {
      if (!companies[row.CompanyID]) {
        companies[row.CompanyID] = {
          CompanyID: row.CompanyID,
          CompanyName: row.CompanyName,
          Company_URL: row.Company_URL,
          logo: row.logo,
          jobs: []
        };
      }

      if (row.JobID) {
        companies[row.CompanyID].jobs.push({
          JobID: row.JobID,
          JobTitle: row.JobTitle,
          JobSlug: row.JobSlug
        });
      }
    });

    res.json(Object.values(companies));
  });
};
 


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
    AND jobs.status = 'active'
    AND jobs.expires_at > NOW()
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


// ================= GET JOB STATS =================
exports.getJobStats = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalJobs
    FROM jobs
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};



