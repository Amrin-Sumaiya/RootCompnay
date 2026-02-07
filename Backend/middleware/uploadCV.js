

const multer = require('multer');
const path = require('path');

// Configure Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configure File Filter (PDF ONLY)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDF files are allowed!'), false); // Reject file
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
  // limits: { fileSize: ... }  <-- Removed this line to allow any size
});

module.exports = upload;
