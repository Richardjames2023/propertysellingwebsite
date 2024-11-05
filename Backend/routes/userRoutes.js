// import express from'express';
// import userController from '../controllers/userController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Protected route to access properties
// router.get('/register', authMiddleware, userController.register);
// router.post('/register', authMiddleware, userController.register);

// export default router;

import express from 'express';
import { register } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', register);

export default router;