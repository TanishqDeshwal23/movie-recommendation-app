const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Absolute path ensures it works on Render
const dbPath = path.join(__dirname, "movies.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if it does not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_input TEXT,
      recommended_movies TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
