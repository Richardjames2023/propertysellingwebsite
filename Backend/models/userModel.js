// import db from '../config/db.js';
// import bcrypt from 'bcryptjs';

// const User = {
//   createUser: async (first_name, last_name, email, phone, location, password) => {
//     const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
//     const sql = 'INSERT INTO users (first_name, last_name, email, phone, location, password) VALUES (?, ?, ?, ?, ?, ?)';
//     return db.query(sql, [first_name, last_name, email, phone, location, hashedPassword]);
//   },

//   findUserByEmail: (email) => {
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     return db.query(sql, [email]);
//   },
// };

// export default User;

// import db from '../config/db.js';
// import bcrypt from 'bcryptjs';

// const User = {
//   createUser: async (first_name, last_name, email, phone, location, password) => {
//     try {
//       const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
//       const sql = 'INSERT INTO users (first_name, last_name, email, phone, location, password) VALUES (?, ?, ?, ?, ?, ?)';
//       const [result] = await db.query(sql, [first_name, last_name, email, phone, location, hashedPassword]);
//       return result;
//     } catch (error) {
//       throw new Error(`Error creating user: ${error.message}`);
//     }
//   },

//   findUserByEmail: async (email) => {
//     try {
//       const sql = 'SELECT * FROM users WHERE email = ?';
//       const [rows] = await db.query(sql, [email]);
//       return rows;
//     } catch (error) {
//       throw new Error(`Error finding user by email: ${error.message}`);
//     }
//   },
// };

// export default User;

import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import User from "./user.js"

const User = {
  createUser: async (first_name, last_name, email, phone, location, password) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const sql = 'INSERT INTO users (first_name, last_name, email, phone, location, password) VALUES (?, ?, ?, ?, ?, ?)';
    return db.query(sql, [first_name, last_name, email, phone, location, hashedPassword]);
  },

  // findUserByEmail: (email) => {
  //   const sql = 'SELECT * FROM users WHERE email = ?';
  //   return db.query(sql, [email]); // Make sure db.query supports `?` placeholders
  // },
  findUserByEmail: (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.execute(sql, [email]); // Use `execute` instead of `query` if needed
  }
  // findUserByEmail: (email) => {
  //   const sql = `SELECT * FROM users WHERE email = '${email}'`;
  //   return db.query(sql); // Do not use this in production due to SQL injection risk
  // }
};

export default User;