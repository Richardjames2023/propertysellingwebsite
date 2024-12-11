
  import Cart from '../models/cart.js';
  import User from '../models/user.js';
  import Property from '../models/Property.js';

  const addToCart = async (req, res) => {
    const { userId, propertyId, couponCode, quantity_purchased, discount_percentage, payment_status } = req.body;
    console.log(req.body.userId);
  
    try {
      // Validate required fields
      if (!userId || !propertyId || !couponCode || quantity_purchased === undefined) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
  
      // Create a new cart entry with all provided fields
      const newCart = await Cart.create({
        userId,
        propertyId,
        couponCode,
        quantity_purchased,
        discount_percentage: discount_percentage || 0, // Default to 0 if no discount is provided
        payment_status: payment_status || 'pending',  // Default to 'pending' if not provided
      });
  
      res.status(201).json({ message: 'Cart saved successfully', cart: newCart });
    } catch (error) {
      console.error('Error saving cart:', error);
      res.status(500).json({ message: 'Failed to save cart', error });
    }
  };



  const getUserCartItems = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Fetch the cart items for the user with related property and user data
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email'] // specify the user attributes you want
          },
          {
            model: Property,
            attributes: ['pid', 'name', 'location', 'price', 'imageUrl'] // specify the property attributes you want
          }
        ]
      });
  
      if (cartItems.length === 0) {
        return res.status(404).json({ message: 'No cart items found for this user.' });
      }
  
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      res.status(500).json({ message: 'Failed to retrieve cart items', error });
    }
  };

  const getAllCarts =  async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            include: [
              { model: User, attributes: ['id', 'first_name', 'last_name'] },
              { model: Property, attributes: ['pid', 'name', 'price'] }  // Ensure only `pid` from Property
            ],
            attributes: ['id', 'userId', 'propertyId', 'quantity_purchased', 'couponCode', 'discount_percentage', 'payment_status']
      });
      res.json(cartItems);
      console.log(res);
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      res.status(500).json({ message: "Error retrieving cart data" });
    }
  };
  

  
  export default { addToCart, getUserCartItems, getAllCarts };