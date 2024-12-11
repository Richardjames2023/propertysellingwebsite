import Property from '../models/Property.js';
import Cart from '../models/cart.js';
import { Op, Sequelize } from 'sequelize'; // Import Sequelize

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};


const createProperty = async (req, res) => {
  const { name, description, location, quantity, available, userId } = req.body;
  let { price } = req.body;

  try {

    // Convert available to integer (1 if 'Yes', 0 if 'No')
    const availableInt = available === 'Yes' ? 1 : 0;

    price = parseFloat(price); // Ensure price is a floating point number
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;// Handle image URL if provided

    // Create new property with all provided fields
    const property = await Property.create({
      name,
      description,
      location,
      price,
      quantity,
       available: availableInt,  // Use integer for available
      imageUrl,
      userId, // Add userId to the property creation
    });

    res.status(201).json({ message: 'Property created successfully', property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Error creating property', error });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  const { pid } = req.params;
  console.log(req.params);
  const { name, description, location, quantity, available } = req.body;
  let { price } = req.body;

  try {

    // Convert available to integer (1 if 'Yes', 0 if 'No')
    const availableInt = available === 'Yes' ? 1 : 0;

    price = parseFloat(price); // Ensure price is a floating point number
    const imageUrl = req.file ? `/images/${req.file.filename}` : null;// Handle image URL if provided

    const property = await Property.findByPk(pid);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.update({
      name,
      description,
      location,
      price,
      quantity,
       available: availableInt,  // Use integer for available
      imageUrl,
    });
    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  const { pid } = req.params

  try {
    const property = await Property.findByPk(pid);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};

// //get all available product that's is not in the users cart
// const getAvailableProducts = async (req, res) => {
//   const { userId } = req.params;

//   try {
//       // Fetch all properties not in the user's cart and with available quantity > 0
//       const products = await Property.findAll({
//           where: {
//               quantity: { [Op.gt]: 0 }, // Available quantity > 0
//               pid: {
//                   [Op.notIn]: Sequelize.literal(`(
//                       SELECT propertyId FROM carts WHERE userId = ${userId} AND propertyId IS NOT NULL
//                   )`), // Exclude properties in the user's cart
//               },
//           },
//       });

//       res.status(200).json(products);
//   } catch (error) {
//       console.error('Error fetching available products:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const getAvailableProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all properties with available quantity > 0
    const products = await Property.findAll({
      where: { quantity: { [Op.gt]: 0 } },
    });

    // Fetch property IDs in the user's cart
    const cartProducts = await Cart.findAll({
      attributes: ['propertyId'], // Only fetch the property IDs
      where: { userId },
    });

    // Extract the property IDs from the user's cart
    const cartProductIds = cartProducts.map((item) => item.propertyId);

    // Return both properties and cartProductIds to the frontend
    res.status(200).json({ products, cartProductIds });
  } catch (error) {
    console.error('Error fetching available products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {createProperty, getProperties, getPropertyById, updateProperty, deleteProperty, getAvailableProducts};