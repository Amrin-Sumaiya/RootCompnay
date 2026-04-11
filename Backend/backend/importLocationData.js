const fs = require('fs');
const db = require('./db');

// Load JSON files
const divisions = JSON.parse(fs.readFileSync('./data/divisions.json'));
const districts = JSON.parse(fs.readFileSync('./data/districts.json'));
const upazilas = JSON.parse(fs.readFileSync('./data/thana.json'));

// Insert Divisions
divisions.divisions.forEach(div => {
  db.query(
    'INSERT INTO divisions (id, name, bn_name, url) VALUES (?, ?, ?, ?)',
    [div.id, div.name, div.bn_name, div.url],
    (err) => {
      if (err) console.log("Division Error:", err);
    }
  );
});

// Insert Districts
districts.districts.forEach(dis => {
  db.query(
    'INSERT INTO districts (id, division_id, name, bn_name, lat, lon, url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [dis.id, dis.division_id, dis.name, dis.bn_name, dis.lat, dis.lon, dis.url]
  );
});

// Insert Upazilas
upazilas.thana.forEach(up => {
  db.query(
    'INSERT INTO upazilas (id, district_id, name) VALUES (?, ?, ?)',
    [up.id, up.district_id, up.thana]
  );
});

console.log("Location data imported successfully!");
setTimeout(() => {
  console.log("Import Finished ✅");
  process.exit();
}, 3000);