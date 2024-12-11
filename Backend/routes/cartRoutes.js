
import express from 'express';
import cartControllers from '../controllers/cartController.js'; // No curly braces for default import

const router = express.Router();

router.post('/getCart', cartControllers.addToCart);
router.get('/getUserCartItems/:userId', cartControllers.getUserCartItems);
router.get('/getUserCartItems/:userId', cartControllers.getUserCartItems);
router.get('/getAllCarts', cartControllers.getAllCarts);

export default router;