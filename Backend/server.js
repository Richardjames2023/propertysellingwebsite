import express from 'express';
import dotenv from 'dotenv'
import sequelize from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import dicountcodeRoutes from './routes/DiscountCodeRoutes.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
const PORT = process.env.PORT || 3000;

// Middlewareconst db = require('./config/db'); // Import the database connection
app.use(bodyParser.json());

// Import other models as needed


// Routes
app.use('/api', authRoutes); // Use authentication routes

app.use('/api/properties', propertyRoutes); // Use the property routes
app.use('/api/discountcode', dicountcodeRoutes); // Use the property routes


// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});