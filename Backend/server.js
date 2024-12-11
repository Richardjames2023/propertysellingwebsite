import express from 'express';
import dotenv from 'dotenv'
import sequelize from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
//import purchaseRoutes from './routes/purchaseRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
//import dicountcodeRoutes from './routes/DiscountCodeRoutes.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes.js';

import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
const PORT = process.env.PORT || 3000;

// Middlewareconst db = require('./config/db'); // Import the database connection
app.use(bodyParser.json());

// Import other models as needed


// Routes
app.use('/api/auth', authRoutes); // Use authentication routes

app.use('/api', propertyRoutes); // Use the property routes
//app.use('/api', purchaseRoutes); // Use the property routesz


app.use('/api', cartRoutes); // Use the property routesz
//app.use('/api/discountcode', dicountcodeRoutes); // Use the property routes

//app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));

 // Assuming __dirname is needed for path resolution, use path.resolve to construct absolute paths
app.use('/images', express.static(path.resolve('public/assets/images')));



// Function to create a superadmin on startup if not exists
const createSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ where: { role: 'superadmin' } });
    if (!existingSuperAdmin) {
      const passwordHash = bcrypt.hashSync('superadminpassword', 10); // Replace 'superadminpassword' with a secure password
      await User.create({
        first_name: 'Super',
        last_name: 'Admin',
        email: 'richardjames2023@gmail.com',
        password: passwordHash,
        role: 'superadmin',
      });
      console.log('Superadmin created successfully.');
    }
  } catch (error) {
    console.error('Error creating superadmin:', error);
  }
};

// Call this function in your application’s startup script
createSuperAdmin();



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