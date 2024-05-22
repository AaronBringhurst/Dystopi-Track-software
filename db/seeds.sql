
-- Inserting initial data into 'department' table
INSERT INTO department (name)
VALUES ('Surveillance Solutions'), ('Data Extraction'), ('Employee Oversight'), 
       ('Behavior Modification'), ('Intellectual Property Seizure'), ('Counter-Espionage'),
       ('Psychological Operations'), ('Corporate Inquisition'), ('Propaganda Production'), 
       ('Dystopi-Compliance'), ('Cryptic Communications'), ('Thought Surveillance'), ('Dissident Control'), 
       ('Mindshare Manipulation'), ('Shadow Operations'), ('Future Forecasting'),
       ('Reality Distortion'), ('Loyalty Enforcement'), ('Asset Reclamation'), 
       ('Existential Risk Management');

-- Inserting initial data into 'role' table
INSERT INTO role (title, salary, department_id)
VALUES ('Surveillance Technician', 60000, 1),
       ('Data Miner', 55000, 2),
       ('Oversight Manager', 75000, 3),
       ('Behavior Analyst', 70000, 4),
       ('IP Acquisition Specialist', 80000, 5),
       ('Counter-Intelligence Agent', 85000, 6),
       ('PsyOps Strategist', 90000, 7),
       ('Corporate Interrogator', 65000, 8),
       ('Propaganda Designer', 58000, 9),
       ('Compliance Enforcer', 77000, 10),
       ('Encryption Specialist', 62000, 11),
       ('Cognitive Analyst', 68000, 12),
       ('Reeducation Specialist', 71000, 13),
       ('Opinion Engineer', 69000, 14),
       ('Black Ops Operative', 88000, 15),
       ('Predictive Strategist', 95000, 16),
       ('Reality Engineer', 87000, 17),
       ('Loyalty Officer', 73000, 18),
       ('Asset Recovery Agent', 76000, 19),
       ('Risk Manager', 98000, 20);

-- Inserting initial data into 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Max', 'Shadow', 1, NULL),
       ('Eva', 'Lockhart', 2, NULL),
       ('Noel', 'Watcher', 3, NULL),
       ('Iris', 'Mind', 4, NULL),
       ('Gideon', 'Clutch', 5, NULL),
       ('Faye', 'Stealth', 6, NULL),
       ('Jude', 'Twist', 7, NULL),
       ('Lyra', 'Grim', 8, NULL),
       ('Seth', 'Spin', 9, NULL),
       ('Nora', 'Rule', 10, NULL),
       ('Theo', 'Cipher', 11, NULL),
       ('Mila', 'Thought', 12, NULL),
       ('Kai', 'Reform', 13, NULL),
       ('Luna', 'Voice', 14, NULL),
       ('Rex', 'Shadow', 15, NULL),
       ('Zara', 'Future', 16, NULL),
       ('Leo', 'Fabricate', 17, NULL),
       ('Cora', 'Fidelity', 18, NULL),
       ('Nash', 'Reclaim', 19, NULL),
       ('Vera', 'Calculate', 20, NULL);
