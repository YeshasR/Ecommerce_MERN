const express = require('express');
const router = express.Router();
const { mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = mongoose.model("UserModel");
const { JWT_SECRET } = require('../config');
const protectedUser = require('../Middleware/protectedUser');

// Route for user signup
router.post('/user_signup', (req, res) => {
    const { firstName, lastName, phone, email, address, password } = req.body;
    // Check if all required fields are provided
    if (!firstName || !lastName || !phone || !email || !address || !password) {
        return res.status(400).json({ message: "You forgot to enter all the fields" });
    }
    // Check if the user with the provided email already exists
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(409).json({ message: "A user with the provided email address already exists" });
            }
            // Hash the password and save the new user
            bcrypt.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        email: email,
                        address: address,
                        password: hashedPassword
                    })
                    user.save()
                        .then((user) => {
                            user.password = undefined; // Remove the password field from the response for security
                            return res.status(201).json({ message: "User created successfully", user: user });
                        })
                        .catch((err) => {
                            return res.status(500).json({ message: err.message });
                        })
                })
                .catch((err) => {
                    return res.status(500).json({ message: err.message });
                })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        })
});

// Route for user login
router.post('/user-login', (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Enter both the fields" });
    }
    // Find the user with the provided email
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                return res.status(404).json({ message: "Invalid Credentials" });
            }
            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, userInDb.password)
                .then((matched) => {
                    if (matched) {
                        // Create and send a JWT token on successful login
                        const token = jwt.sign({ _id: userInDb._id }, JWT_SECRET)
                        const userInfo = userInDb
                        const userType = {
                            role: userInDb.role
                        }
                        return res.status(200).json({ message: "Login Successful", userInfo: userInfo, token: token, userType: userType });
                    } else {
                        return res.status(404).json({ message: "Invalid Credentials" });
                    }
                })
                .catch((err) => {
                    return res.status(500).json({ message: err.message });
                })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message });
        })
});

// Route for fetching user's orders (protected route)
router.get('/orders', protectedUser, async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await UserModel.findById(userId).populate('orders.product');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const orders = user.orders;
        return res.json({ orders });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Route for emptying user's cart (protected route)
router.delete('/emptyCart', protectedUser, async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await UserModel.findById(userId).populate('orders.product');
        const cartProducts = user.orders.map(order => order.product);
        user.orders = [];
        await user.save();
        await Promise.all(cartProducts.map(async product => {
            await ProductModel.findByIdAndRemove(product._id);
        }));
        return res.status(200).json({ message: 'Cart emptied successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
