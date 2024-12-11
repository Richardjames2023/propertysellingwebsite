// authRoutes.js

import express from 'express';
import authController from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// //Login and Registration rout
// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.post('/refresh-token', authController.refreshToken);

// // Get all users (admin only)
// router.get('/users', authController.getAllUsers);


// // Route accessible to all authenticated users
// router.get('/dashboard', authMiddleware.authenticateToken, authController.userDashboard);

// // Route accessible only to authenticated admins
// router.get('/admindashboard', authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, authController.adminDashboard);


// // Protect mainpage with verifyToken middleware
// //router.get('/mainpage', authController.verifyToken, authController.mainpage);

// export default router;

// import express from 'express';
// import authController from '../controllers/authControllers.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/dashboard', authMiddleware.authenticateToken, authController.userDashboard);
router.get('/admin-dashboard', authMiddleware.authenticateToken, authMiddleware.authorizeAdmin, authController.adminDashboard);

export default router;
