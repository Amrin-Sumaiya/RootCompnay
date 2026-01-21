const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job.routes');


const app = express();
const PORT = 5000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const jobApplicationRoutes= require('./routes/jobApplication.routes')

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);

// Company dashboard and add_company
app.use('/api/comp', companyRoutes);
app.use('/api/igl', userRoutes);
app.use('/auth', require('./routes/auth.routes'));
app.use('/api/company', jobRoutes);
app.use('/api/job', jobApplicationRoutes)


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
