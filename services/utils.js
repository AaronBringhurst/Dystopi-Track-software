const fs = require('fs');
const path = require('path');
const pool = require('./pool');  // Import the pool
const cliProgress = require('cli-progress');

// Helper function to introduce a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const order66 = async () => {
  const progressBar = new cliProgress.SingleBar({
    format: 'Order 66 Progress |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });

  try {
    console.log('Starting Order 66...'.red);

    // Initialize the progress bar with total steps
    progressBar.start(5, 0); // Updated to 5 steps

    await pool.query('BEGIN');
    progressBar.increment();
    console.log('Transaction started');
    await delay(1000);  // Delay for 1 second

    // Truncate tables and reset identity columns
    await pool.query('TRUNCATE TABLE employee, role, department RESTART IDENTITY CASCADE;');
    progressBar.increment();
    console.log('Tables truncated');
    await delay(1000);  // Delay for 1 second

    // Read SQL seed file
    const seedSqlPath = path.join(__dirname, '../db/seeds.sql');
    const seedSql = fs.readFileSync(seedSqlPath, { encoding: 'utf-8' });
    progressBar.increment();
    console.log('Seed SQL file read');
    await delay(1000);  // Delay for 1 second

    // Run seed SQL
    await pool.query(seedSql);
    progressBar.increment();
    console.log('Seed data inserted');
    await delay(1000);  // Delay for 1 second

    await pool.query('COMMIT');
    progressBar.increment();
    console.log('Transaction committed');
    console.log('Order 66 executed successfully. The Jedi have been dealt with.'.green);

    // Stop the progress bar
    progressBar.stop();
  } catch (err) {
    console.error('Failed to reset the database:', err);
    await pool.query('ROLLBACK');
    console.log('Transaction rolled back');
    
    // Stop the progress bar in case of error
    progressBar.stop();
    console.clear();
  }
};

module.exports = { order66 };
