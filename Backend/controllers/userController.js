import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import {createDiscountCode} from '../models/DiscountCodeControllers.js';

// User registration endpoint
const register =  async (req, res) => {
    const { first_name, last_name, email, phone, location, password, } = req.body;

    if (!first_name || !last_name || !email || !phone || !location || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = await User.create({
            
            first_name,
            last_name,
            email,
            phone,
            location,
            password:hashedPassword, // Make sure to hash the password in a real application
        });

        // Generate 10 unique discount codes
            const discountCode = await createDiscountCode();

        // Optionally associate discount codes with the user
        for (const discountCode of discountCodes) {
            discountCode.userId = newUser .id; // Associate the discount code with the user
            await discountCode.save(); // Save the updated discount code
        }

        // Return success response
        res.status(201).json({
            message: 'User  registered successfully!',
            userId: newUser .id,
            discountCodes: discountCodes.map(code => code.code) // Return only the codes
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {register};