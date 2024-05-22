DROP DATABASE IF EXISTS cogwheel_db;
CREATE DATABASE cogwheel_db;

\c cogwheel_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(69) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(69) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(69) NOT NULL,
    last_name VARCHAR(69) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

\i seeds.sql
