
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
//import User from "../models/user.js"

const User = {
  createUser: async (first_name, last_name, email, phone, password, refreshToken) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const sql = 'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)';
    return db.query(sql, [first_name, last_name, email, phone, hashedPassword, refreshToken]);
  },

  findUserByEmail: (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.execute(sql, [email]); // Use `execute` instead of `query` if needed
  }
};

export default User;