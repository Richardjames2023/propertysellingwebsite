// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import User from '../models/userModel.js';

// // Generate JWT Token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
// };

// // User Registration
// const register = async (req, res) => {
//   const { first_name, last_name, email, phone, location, password } = req.body;
//   try {
//     // Check if user exists
//     const userExists = await User.findOne({ where: { email } });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
//     await User.create({ first_name, last_name, email, phone, location, password: hashedPassword });

//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return res.status(500).json({ message: 'Error registering user', error });
//   }
// };

// // User Login
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = generateToken(user.id);
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return res.status(500).json({ message: 'Error logging in', error });
//   }
// };

// export default { register, login };

// authController.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js'; // Adjust path if needed
import DiscountCodeController from '../controllers/DiscountCodeControllers.js';

const { createDiscountCodesForUser } = DiscountCodeController;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Make sure JWT_SECRET is set in your .env
};

const register = async (req, res) => {
  const { first_name, last_name, email, phone, location, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ first_name, last_name, email, phone, location, password: hashedPassword });

    // Create a discount code for the new user
    const discountCode = await createDiscountCodesForUser(newUser.id); // Call the function with the new user's ID

    // Optionally, you can return the discount code in the response
    return res.status(201).json({ message: 'User registered successfully', user: newUser, discountCode });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access", error: err.message });
  }
};

// Protected route
const mainpage = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId); // Sequelize ORM method
    if (!user) return res.status(404).json({ message: "User not found" });
    
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default { register, login, mainpage, verifyToken };