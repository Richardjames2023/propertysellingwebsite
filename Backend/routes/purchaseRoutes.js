import express from'express';
import PurchaseControllers from '../controllers/purchaseControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to access Discount
router.post('/createPurchase', PurchaseControllers.createPurchase);
//router.post('/api/getPurchaseById', authMiddleware, PurchaseCodeControllers.getPurchaseById);
router.get('/getAllPurchases', PurchaseControllers.getAllPurchases);

export default router;