const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: "postgres",
    password: "asdf",
    host: "localhost",
    database: "CogWheel_db",
  },
  console.log(`Connected to the CogWheel_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
