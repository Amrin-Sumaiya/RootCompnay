const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/candidate', require('./routes/candidate.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api/job', require('./routes/jobApplication.routes'));
app.use('/api/candidate-auth', require('./routes/candidate-auth.routes'));
app.use('/api/common', require('./routes/common.routes'));
app.use('/api/locations', require('./routes/location.routes'));

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
