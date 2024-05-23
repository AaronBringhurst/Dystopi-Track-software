// This imports all the npm modules
const {
  viewAllEmployees,
  addEmployee,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
} = require("./services/queries");
const inquirer = require("inquirer");
const { Pool } = require("pg");
const colors = require("colors");
const figlet = require("figlet");
const { order66 } = require('./services/utils');
const pool = require('./services/pool');


// this unlocks more advanced features of colors module
colors.enable();

// ASCII Art
const eyeArt = `
⠀⠀⡀⠀⠀⠀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⢿⣝⠛⠋⠉⠉⠉⣉⠩⠍⠉⣿⠿⡭⠉⠛⠃⠲⣞⣉⡙⠿⣇⠀⠀⠀
⠀⠀⠈⠻⣷⣄⡠⢶⡟⢁⣀⢠⣴⡏⣀⡀⠀⠀⣠⡾⠋⢉⣈⣸⣿⡀⠀⠀
⠀⠀⠀⠀⠙⠋⣼⣿⡜⠃⠉⠀⡎⠉⠉⢺⢱⢢⣿⠃⠘⠈⠛⢹⣿⡇⠀⠀
⠀⠀⠀⢀⡞⣠⡟⠁⠀⠀⣀⡰⣀⠀⠀⡸⠀⠑⢵⡄⠀⠀⠀⠀⠉⠀⣧⡀
⠀⠀⠀⠌⣰⠃⠁⣠⣖⣡⣄⣀⣀⣈⣑⣔⠂⠀⠠⣿⡄⠀⠀⠀⠀⠠⣾⣷
⠀⠀⢸⢠⡇⠀⣰⣿⣿⡿⣡⡾⠿⣿⣿⣜⣇⠀⠀⠘⣿⠀⠀⠀⠀⢸⡀⢸
⠀⠀⡆⢸⡀⠀⣿⣿⡇⣾⡿⠁⠀⠀⣹⣿⢸⠀⠀⠀⣿⡆⠀⠀⠀⣸⣤⣼
⠀⠀⢳⢸⡧⢦⢿⣿⡏⣿⣿⣦⣀⣴⣻⡿⣱⠀⠀⠀⣻⠁⠀⠀⠀⢹⠛⢻
⠀⠀⠈⡄⢷⠘⠞⢿⠻⠶⠾⠿⣿⣿⣭⡾⠃⠀⠀⢀⡟⠀⠀⠀⠀⣹⠀⡆
⠀⠀⠀⠰⣘⢧⣀⠀⠙⠢⢤⠠⠤⠄⠊⠀⠀⠀⣠⠟⠀⠀⠀⠀⠀⢧⣿⠃
⠀⣀⣤⣿⣇⠻⣟⣄⡀⠀⠘⣤⣣⠀⠀⠀⣀⢼⠟⠀⠀⠀⠀⠀⠄⣿⠟⠀
⠿⠏⠭⠟⣤⣴⣬⣨⠙⠲⢦⣧⡤⣔⠲⠝⠚⣷⠀⠀⠀⢀⣴⣷⡠⠃⠀⠀
⠀⠀⠀⠀⠀⠉⠉⠉⠛⠻⢛⣿⣶⣶⡽⢤⡄⢛⢃⣒⢠⣿⣿⠟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠁⠀⠁⠀⠀⠀⠀⠀`;
// Function to display the main menu and handle user actions
const displayMenu = () => {
  console.log("\n\n========================================================\n\n".green);  // Add horizontal line
  console.log("Welcome to Dystopi-Track Systems. The EYE is always Watching.\n\n".blue);  // Add newlines before and after the message
  console.log("========================================================\n\n".green);  // Add horizontal line
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          { name: "Execute Order 66".red, value: "executeOrder66" },
          { name: "Exit".green, value: "exit" },
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View All Employees":
          viewAllEmployees().then(() => displayMenu());
          break;
        case "Add Employee":
          addEmployee().then(() => displayMenu());
          break;
        case "Update Employee Role":
          addEmployee().then(() => displayMenu());
          break;
        case "View All Roles":
          viewAllRoles().then(() => displayMenu());
          break;
        case "Add Role":
          addRole().then(() => displayMenu());
          break;
        case "View All Departments":
          viewAllDepartments().then(() => displayMenu());
          break;
        case "Add Department":
          addDepartment().then(() => displayMenu());
          break;

        case "executeOrder66":
          promptForPassword();
          break;
        case "exit":
          console.log("Exiting the application...".green);
          process.exit(); // This will exit the application
        default:
          console.log("Option not implemented yet");
          displayMenu();
          break;
      }
    });
};

// Function to prompt for password before executing Order 66
const promptForPassword = () => {
  inquirer
    .prompt([
      {
        type: "password",
        name: "password",
        message: "Enter the password to execute Order 66:",
        mask: "*",
      },
    ])
    .then((answers) => {
      if (answers.password === "itsatrap") {
        console.log("Order 66 executed successfully. The Jedi have been dealt with.".green);
        order66().then(() => displayMenu());
      } else {
        console.log("Incorrect password. Access denied.".red);
        displayMenu();
      }
    });
};

// Display startup ASCII art and connect to the database
figlet.text(
  "Dystopi - Track Systems",
  {
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    console.log(eyeArt); // Display the eye art after the logo
  }
);

pool
  .connect()
  .then(() => {
    console.log("Connected to the CogWheel_db database.");
    displayMenu(); // Only call displayMenu after a successful connection
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

  // Export the pool for potential use elsewhere
  module.exports = pool;