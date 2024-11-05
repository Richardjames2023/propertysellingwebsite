//import mysql from 'mysql2/promise'; // Use promise-based API
import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

                                        
dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// db.getConnection()
//   .then(() => console.log('Database connected successfully!'))
//   .catch((err) => console.error('Database connection failed:', err));


// Read and execute the schema file
// const schemaPath = path.join(__dirname, 'database', 'schema.sql');
// const schema = fs.readFileSync(schemaPath, 'utf-8');

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database.');

//   connection.query(schema, (err, results) => {
//     if (err) throw err;
//     console.log('Database and tables created successfully.');
//     connection.end();
//   });
// });

// config/db.js (updated sync)
import Sequelize from 'sequelize';

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: console.log, // This will log all SQL queries to the console
});

(async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
    await db.sync({ alter: true }); // Syncs models with database, adjusts tables if necessary
    console.log('Models synchronized with the database');
  } catch (error) {
    console.error('Database connection or sync error:', error);
  }
})();

export default db;

// export default pool; // Export the pool
