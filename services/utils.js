const fs = require("fs");
const path = require("path");
const pool = require("./pool"); // Assuming you export your pool from a central file


// Function to execute Order 66: Resets the database by truncating all tables and reseeding them
const order66 = async () => {
  try {
    await pool.query("BEGIN"); // Starts the transaction
    await pool.query(
      "TRUNCATE TABLE employee, role, department RESTART IDENTITY CASCADE;"
    );
    const seedSql = fs.readFileSync(path.join(__dirname, "../db/seeds.sql"), {
      encoding: "utf-8",
    });

    await pool.query(seedSql); // Executes the seed SQL
    await pool.query("COMMIT"); // Commits the transaction
    console.log("Database has been reset to default state.");
  } catch (err) {
    console.error("Failed to reset the database:", err);
    await pool.query("ROLLBACK"); // Rollback the transatction in case of faliure
  }
};

module.exports = { order66 };
