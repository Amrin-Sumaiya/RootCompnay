const db = require('../db');

exports.applyForJob = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    // cv,
    about,
    jobId,
    jobTitle,
    companyName,
    companyUrl
  } = req.body;
  console.log(req.body)

  // if (!req.file) {
  //   return res.status(400).json({ message: 'CV is required' });
  // }

  const checkSql = `
    SELECT id FROM job_applications
    WHERE job_id = ?
      AND company_name = ?
      AND (email = ? OR phone = ?)
  `;

  db.query(
    checkSql,
    [jobId, companyName, email, phone],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.length > 0) {
        return res.status(409).json({
          message: 'You have already applied for this job'
        });
      }

      const insertSql = `
        INSERT INTO job_applications
        (first_name, last_name, email, phone, about, cv,
         job_id, job_title, company_name, company_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [
          firstName,
          lastName,
          email,
          phone,
          about,
          req.file.filename,
        //  cv,
          jobId,
          jobTitle,
          companyName,
          companyUrl
        ],
        (err) => {
          if (err) {
            // 🔐 DB-level protection
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({
                message: 'You have already applied for this job'
              });
            }

            console.error(err);
            return res.status(500).json({ message: 'Failed to apply' });
          }

          res.status(201).json({
            message: 'Application submitted successfully'
          });
        }
      );
    }
  );
};

