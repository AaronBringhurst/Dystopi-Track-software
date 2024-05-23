DROP DATABASE IF EXISTS cogwheel_db;
CREATE DATABASE cogwheel_db;

\c cogwheel_db;

-- Create the department table with id as primary key and department_name as a unique identifier
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(69) UNIQUE NOT NULL
);

-- Create the role table with a foreign key reference to the department table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(69) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create the employee table with foreign key references to the role table and self-reference for manager
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(69) NOT NULL,
    last_name VARCHAR(69) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Import seed data from seeds.sql for initial data population
\i seeds.sql
