// This imports all the npm modules
const {
  viewAllEmployees,
  addEmployee,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
} = require("./db/queries");
const inquirer = require("inquirer");
const { Pool } = require("pg");
const colors = require("colors");
const figlet = require("figlet");

const pool = new Pool({
  user: "postgres",
  password: "asdf",
  host: "localhost",
  database: "cogwheel_db",
  port: 5432,
});

// this unlocks more advanced features of colors module
colors.enable();

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

const displayMenu = () => {
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
          viewAllEmployees().then(() => displayMenu()); // Call displayMenu again after the operation
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
        case "viewAllDepartments":
          viewAllDepartments().then(() => displayMenu());
        case "addDepartment":
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
        // Implement other cases as needed
      }
    });
};

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
      if (answers.password === "theCorrectPassword") {
        // Replace 'theCorrectPassword' with the actual password
        console.log("Order 66 executed successfully.".green);
      } else {
        console.log("Incorrect password. Access denied.".red);
      }
    });
};

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
