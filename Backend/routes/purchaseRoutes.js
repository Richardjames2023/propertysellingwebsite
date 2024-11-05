import express from'express';
import PurchaseControllers from '../purcaseControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to access Discount
router.get('/createPurchase', authMiddleware, PurchaseControllers.createPurchase);
router.get('/api/getPurchaseById', authMiddleware, PurchaseCodeControllers.getPurchaseById);
router.get('/ getUserPurchasest', authMiddleware, PurchaseControllers.getUserPurchases);

export default router;