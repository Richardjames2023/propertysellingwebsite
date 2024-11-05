import express from'express';
import DiscountCodeControllers from '../controllers/DiscountCodeControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to access Discount
router.get('/createDiscount', authMiddleware, DiscountCodeControllers.createDiscountCodesForUser);
router.get('/api/discount-codes', authMiddleware, DiscountCodeControllers.getAllDiscountCard);
router.get('/availableDiscount', authMiddleware, DiscountCodeControllers.getAvailableDiscountCodes);
router.get('/applyDiscount', authMiddleware, DiscountCodeControllers.applyDiscountCode);
router.get('/hadleselectedDiscount', authMiddleware, DiscountCodeControllers.handleConfirmSelection);

export default router;