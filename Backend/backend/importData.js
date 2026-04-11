const axios = require("axios");
const db = require("./db"); // your db.js file

// API URLs
const UNI_API = "http://bd-institution-data.solutya.com/data/public_Uni_data.json";
const SCHOOL_API = "http://bd-institution-data.solutya.com/data/bd_schoolName_data.json";

// Function to fetch API data
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

// Insert universities
async function insertUniversities() {
  const universities = await fetchData(UNI_API);

  universities.forEach((uni) => {
    const sql = `
      INSERT INTO universities (name, district, raw_data)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [
      uni.name || null,
      uni.district || null,
      JSON.stringify(uni)
    ], (err, result) => {
      if (err) {
        console.error("Insert error:", err);
      }
    });
  });

  console.log("Universities inserted!");
}

// Insert schools
async function insertSchools() {
  const schools = await fetchData(SCHOOL_API);

  schools.forEach((school) => {
    const sql = `
      INSERT INTO schools (name, district, raw_data)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [
      school.name || null,
      school.district || null,
      JSON.stringify(school)
    ], (err, result) => {
      if (err) {
        console.error("Insert error:", err);
      }
    });
  });

  console.log("Schools inserted!");
}

// Run everything
async function run() {
  await insertUniversities();
  await insertSchools();
}

run();