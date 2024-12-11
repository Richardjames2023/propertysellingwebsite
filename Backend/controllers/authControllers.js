
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js'; // Adjust path if needed

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body.email);
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ id: user.id });
  
      await user.update({ refreshToken });
  
      const redirectUrl = user.role === 'admin' ? '/admin-dashboard' : '/dashboard';
  
      res.status(200).json({
        message: 'User login successful',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
        redirectUrl,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login error', error: error.message });
    }
  };

// Refresh Token
const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken({ id: user.id });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

// Logout (invalidate refresh token)
const logout = (req, res) => {
  const { refreshToken } = req.body;

  // Remove refresh token from the refreshTokens object
  delete refreshToken[refreshToken];

  res.status(204).send(); // No Content
};

// Get All Users
const getAllUsers = async (req, res) => {
    console.log('users');
    try {
      // Retrieve all users, excluding the password field
      const users = await User.findAll({
        attributes: ['id', 'email', 'first_name', 'last_name', 'phone'], // Exclude 'password'
      });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };

  const assignAdminRole = async (req, res) => {
    const { userId } = req.body; // The ID of the user to make an admin
    const loggedInUserId = req.user.id; // ID of the currently logged-in user

    try {
        // Verify that the logged-in user is a superadmin
        const loggedInUser = await User.findByPk(loggedInUserId);
        if (!loggedInUser || loggedInUser.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only a super admin can assign admin roles' });
        }

        // Find the target user and update their role
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = 'admin';
        await user.save();

        return res.status(200).json({ message: 'User has been granted admin rights' });
    } catch (error) {
        console.error('Assign admin role error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// dashboardController.js
const userDashboard = (req, res) => {
    // Fetch user-specific data if needed
    res.json({
        message: `Welcome to your user dashboard, ${req.user.first_name}`,
        data: {
            // You can add more user-specific data here
        }
    });
};

const adminDashboard = (req, res) => {
    // Fetch admin-specific data if needed
    res.json({
        message: `Welcome to the admin dashboard, ${req.user.first_name}`,
        data: {
            // You can add more admin-specific data here, e.g., statistics, user lists, etc.
        }
    });
};



const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const register = async (req, res) => {
  const { email, password, first_name, last_name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists, please log in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
    });

    const refreshToken = generateRefreshToken({ id: newUser.id });
    await newUser.update({ refreshToken });

    const accessToken = generateAccessToken({ id: newUser.id });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone: newUser.phone,
      },
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration error', error: error.message });
  }
};



export default { register, login, refreshToken, logout, getAllUsers, assignAdminRole, userDashboard, adminDashboard  };
