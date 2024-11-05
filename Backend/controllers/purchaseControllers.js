import Purchase from '../models/Purchase'; // Adjust the path as necessary
import User from '../models/User'; // Import User model
import Property from '../models/Property'; // Import Property model
import DiscountCode from '../models/DiscountCode'; // Import DiscountCode model

// Create a new purchase
const createPurchase = async (req, res) => {
    const { userId, propertyId, discountCodeId, finalPrice } = req.body;

    try {
        // Validate input
        if (!userId || !propertyId || finalPrice === undefined) {
            return res.status(400).json({ error: 'User  ID, Property ID, and Final Price are required' });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        // Check if property exists
        const property = await Property.findByPk(propertyId);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Check if discount code exists (if provided)
        if (discountCodeId) {
            const discountCode = await DiscountCode.findByPk(discountCodeId);
            if (!discountCode) {
                return res.status(404).json({ error: 'Discount code not found' });
            }
        }

        // Create a new purchase
        const purchase = await Purchase.create({
            userId,
            propertyId,
            discountCodeId,
            finalPrice,
        });

        return res.status(201).json({ message: 'Purchase created successfully', purchase });
    } catch (error) {
        console.error('Error creating purchase:', error);
        return res.status(500).json({ message: 'Error creating purchase', error: error.message });
    }
};

// Get purchase details by purchase ID
const getPurchaseById = async (req, res) => {
    const { id } = req.params;

    try {
        const purchase = await Purchase.findByPk(id);
        if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }

        return res.status(200).json(purchase);
    } catch (error) {
        console.error('Error retrieving purchase:', error);
        return res.status(500).json({ message: 'Error retrieving purchase', error: error.message });
    }
};

// Get all purchases for a user
const getUserPurchases = async (req, res) => {
    const { userId } = req.params;

    try {
        const purchases = await Purchase.findAll({
            where: { userId },
            include: [
                { model: User, attributes: ['id', 'name', 'email'] }, // Include user details
                { model: Property, attributes: ['id', 'address', 'price'] }, // Include property details
                { model: DiscountCode, attributes: ['id', 'code', 'discountAmount'] } // Include discount code details
            ],
        });

        return res.status(200).json(purchases);
    } catch (error) {
        console.error('Error retrieving user purchases:', error);
        return res.status(500).json({ message: 'Error retrieving user purchases', error: error.message });
    }
};

// Export the controller methods
export default = {
    createPurchase,
    getPurchaseById,
    getUserPurchases,
};