const db = require('../db');

/**
 * Candidate applies for a job
 */
exports.applyForJob = (req, res) => {
  // req.user exists ONLY if token middleware is used
  const candidateUserId = req.user ? req.user.userId : null;

  const {
    firstName,
    lastName,
    email,
    phone,
    about,
    jobId,
    jobTitle,
    companyName,
    companyUrl
  } = req.body;

  const cvFile = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO job_applications
    (
      candidate_user_id,
      first_name,
      last_name,
      email,
      phone,
      about,
      cv,
      job_id,
      job_title,
      company_name,
      company_url,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    sql,
    [
      candidateUserId,
      firstName,
      lastName,
      email,
      phone,
      about,
      cvFile,
      jobId,
      jobTitle,
      companyName,
      companyUrl
    ],
    (err) => {
      if (err) {
        console.error('Apply job error:', err);
        return res.status(500).json({ message: 'Failed to apply for job' });
      }

      res.status(201).json({ message: 'Applied successfully' });
    }
  );
};

/**
 * Company gets all candidates for a job
 */
exports.getCandidatesForJob = (req, res) => {
  const { jobId } = req.params;

  const sql = `
    SELECT * 
    FROM job_applications 
    WHERE job_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [jobId], (err, results) => {
    if (err) {
      console.error('Fetch candidates error:', err);
      return res.status(500).json({ message: 'Failed to fetch candidates' });
    }

    res.json(results);
  });
};


//update candidates status


exports.updateApplicationStatus = (req, res) => {

  const { applicationId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {

    return res.status(400).json({ message: 'Invalid Status'});
  }

  const sql = `
   UPDATE job_applications
   SET status = ?
   WHERE id = ?
  `;
  db.query(sql, [status, applicationId], (err) => {
    if (err) {
      console.error('Update status error:', err);
      return res.status(500).json({ message: 'Failed to update application status' });
    }
        res.json({ message: `Candidate ${status}` });
  });
};
      
      
      
      
      
      
      
      
      
      
      
