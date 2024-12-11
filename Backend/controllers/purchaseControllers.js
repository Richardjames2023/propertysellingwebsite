
import User from '../models/User.js'; // Import User model
import properties from '../models/Property.js'
import purchase from '../models/Purchase.js'

// Create a new purchase
const createPurchase = async (req, res) => {

    const { purchasedItems } = req.body;
    console.log(purchasedItems);

  try {
    // Validate input
    if (!purchasedItems || !Array.isArray(purchasedItems)) {
      return res.status(400).json({ error: 'Invalid purchase data' });
    }

    // Process each purchase
    const createdPurchases = await Promise.all(purchasedItems.map(async (purchaseItem) => {
      const { userId, propertyId, finalPrice, name, price, quantity, discount, transactionId, receiptCode } = purchaseItem;

      // Validate individual fields if needed
      if (!userId || !propertyId || finalPrice === undefined || !name || price === undefined || !quantity) {
        throw new Error('User ID, Property ID, Final Price, Name, Price, and Quantity are required');
      }

      // Create each purchase record
      return await purchase.create({
        userId,
        propertyId,
        name,
        price,
        quantity,
        discount,
        finalPrice,
        transactionId,
        receiptCode,
        paymentStatus: 'pending',
        timestamp: new Date(),
      });
    }));

    res.status(201).json({ message: 'Purchases created successfully', purchases: createdPurchases });
  } catch (error) {
    console.error('Error creating purchases:', error);
    res.status(500).json({ message: 'Error creating purchases', error: error.message });
  }
};



// Get purchase details by purchase ID
const getPurchaseById = async (req, res) => {
    const { id } = req.params;

    try {
        const purchase = await purchase.findByPk(id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }

        return res.status(200).json(purchase);
    } catch (error) {
        console.error('Error retrieving purchase:', error);
        return res.status(500).json({ message: 'Error retrieving purchase', error: error.message });
    }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchase.findAll({
      attributes: [
        'purchaseId',
        'userId',
        'name',
        'price',
        'quantity',
        'discount',
        'paymentStatus',
        'transactionId',
        'receiptCode',
        'timestamp'
      ],
      // include: [
      //   {
      //     model: User,
      //     attributes: ['id', 'first_name', 'last_name', 'email'] // Adjust attributes as needed
      //   },
      //   {
      //     model: properties,
      //     attributes: ['id', 'address', 'price'] // Adjust attributes as needed
      //   }
      // ]
    });

    return res.status(200).json(purchases);
  } catch (error) {
    console.error('Error retrieving purchases:', error);
    return res.status(500).json({ message: 'Error retrieving purchases', error: error.message });
  }
};



// // Get all purchases for a user
// const getUserPurchases = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const purchases = await Purchase.findAll({
//             where: { userId },
//             include: [
//                 { model: User, attributes: ['id', 'name', 'email'] }, // Include user details
//                 { model: Property, attributes: ['id', 'address', 'price'] }, // Include property details
//                 { model: DiscountCode, attributes: ['id', 'code', 'discountAmount'] } // Include discount code details
//             ],
//         });

//         return res.status(200).json(purchases);
//     } catch (error) {
//         console.error('Error retrieving user purchases:', error);
//         return res.status(500).json({ message: 'Error retrieving user purchases', error: error.message });
//     }
// };

const getUserPurchases = async (req, res) => {
  const { userId } = req.params;

  try {
      const purchases = await Purchase.findAll({
          where: { userId },
          attributes: [
              'purchaseId',
              'userId',
              'name',
              'price',
              'quantity',
              'discount',
              'paymentStatus',
              'transactionId',
              'receiptCode',
              'timestamp'
          ],
          include: [
              {
                  model: User,
                  attributes: ['id', 'first_name', 'last_name', 'email'] // Make sure User model has these fields
              },
              {
                  model: Property,
                  attributes: ['id', 'address', 'price'] // Adjust if Property model has different field names
              }
          ],
      });

      return res.status(200).json(purchases);
  } catch (error) {
      console.error('Error retrieving user purchases:', error);
      return res.status(500).json({ message: 'Error retrieving user purchases', error: error.message });
  }
};

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Property, attributes: ['id', 'name', 'price'] }
      ],
      attributes: ['id', 'userId', 'propertyId', 'quantity', 'createdAt']
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ message: "Error retrieving cart data" });
  }
});

// Export the controller methods
export default {
    createPurchase,
    getPurchaseById,
    getUserPurchases,
     getAllPurchases

};