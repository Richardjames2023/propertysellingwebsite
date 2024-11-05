import express from'express';
import propertyController from '../controllers/propertyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to access properties
router.get('/list', authMiddleware, propertyController.getProperties);

export default router;