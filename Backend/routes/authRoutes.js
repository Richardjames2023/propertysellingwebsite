// import express from 'express';
// import authController from '../controllers/authController.js'

// const router = express.Router();

// // Registration route
// router.post('/register', authController.register);

// // Login route
// router.post('/login', authController.login);
// router.get('/mainpage', authController.mainpage);

// export default router;

// authRoutes.js

import express from 'express';
import authController from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protect mainpage with verifyToken middleware
router.get('/mainpage', authController.verifyToken, authController.mainpage);

export default router;
