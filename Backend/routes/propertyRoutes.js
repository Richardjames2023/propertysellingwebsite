import express from'express';
import propertyController from '../controllers/propertyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure Multer to save images in the public folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets/images'); // Ensure this folder exists in your frontend
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique timestamped name
    }
  });
  const upload = multer({ storage });

// Protected route to access properties
router.get('/getProperties',  propertyController.getProperties);
router.post('/createProperties',  upload.single('image'), propertyController.createProperty);
router.patch('/updateProperty/:pid',  upload.single('image'), propertyController.updateProperty);
router.delete('/deleteProperty/:pid',  upload.single('image'), propertyController.deleteProperty);
router.get('/getAvailableProducts/:userId', upload.single('image'), propertyController.getAvailableProducts);

export default router;