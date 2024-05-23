const inquirer = require("inquirer");
const pool = require('./pool');

// Function to display all employees in the database
const viewAllEmployees = async () => {
    try {
      const result = await pool.query("SELECT * FROM employee");
      console.table(result.rows);
    } catch (err) {
      console.error("Error fetching employees:", err.stack);
    }
  };

  // Function to display all roles in the database
  const viewAllRoles = async () => {
    try {
      const result = await pool.query("SELECT * FROM role");
      console.table(result.rows);
    } catch (err) {
      console.error("Error fetching roles:", err.stack);
    }
  };

  // Function to display all departments in the database
  const viewAllDepartments = async () => {
    try {
      const result = await pool.query("SELECT * FROM department");
      console.table(result.rows);
    } catch (err) {
      console.error("Error fetching departments:", err.stack);
    }
  };

// Function to add a department
const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the new department?",
    },
  ]);
  const query = "INSERT INTO department(name) VALUES($1)";
  try {
    await pool.query(query, [answer.departmentName]);
    console.log(`Added new department: ${answer.departmentName}`);
  } catch (err) {
    console.error("Error adding department:", err.stack);
  }
};


// Function to add a role
const addRole = async () => {
  // Retrieve all departments to allow the user to select which department the new role belongs to
  const departments = await pool.query("SELECT * FROM department");
  const departmentChoices = departments.rows.map((dep) => ({
    name: dep.department_name,
    value: dep.id
  }));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "departmentId",
      message: "Which department does this role belong to?",
      choices: departmentChoices
    },
  ]);

  const query = "INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)";
  try {
    await pool.query(query, [
      answers.title,
      answers.salary,
      answers.departmentId,
    ]);
    console.log(`Added new role: ${answers.title}`);
  } catch (err) {
    console.error(err.stack);
  }
};

// Function to add an employee
const addEmployee = async () => {
  // Retrieve all roles and managers for the user to select from when adding a new employee
  const roles = await pool.query("SELECT * FROM role");
  const roleChoices = roles.rows.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const managers = await pool.query("SELECT * FROM employee");
  const managerChoices = managers.rows.map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.employee_id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee?",
    },
    {
      type: "list",
      name: "roleId",
      message: "What is the role of the employee?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "managerId",
      message: "Who is the manager of this employee?",
      choices: managerChoices,
    },
  ]);

  const query =
    "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)";
  try {
    await pool.query(query, [
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId,
    ]);
    console.log(`Added new employee: ${answers.firstName} ${answers.lastName}`);
  } catch (err) {
    console.error(err.stack);
  }
};

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  viewAllDepartments,
  viewAllEmployees,
  viewAllRoles,
};
