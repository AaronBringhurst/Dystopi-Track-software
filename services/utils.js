const fs = require("fs");
const path = require("path");
const pool = require("./pool"); // Assuming you export your pool from a central file

const order66 = async () => {
  try {
    await pool.query("BEGIN");
    await pool.query(
      "TRUNCATE TABLE employee, role, department RESTART IDENTITY CASCADE;"
    );
    const seedSql = fs.readFileSync(path.join(__dirname, "../db/seeds.sql"), {
      encoding: "utf-8",
    });

    await pool.query(seedSql);
    await pool.query("COMMIT");
    console.log("Database has been reset to default state.");
  } catch (err) {
    console.error("Failed to reset the database:", err);
    await pool.query("ROLLBACK");
  }
};

module.exports = { order66 };
