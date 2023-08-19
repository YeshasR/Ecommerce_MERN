const express = require('express');
const router = express.Router();
const { mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = mongoose.model("AdminModel");
const { JWT_SECRET } = require('../config');

// Route for admin signup
router.post('/admin-signup', (req, res) => {
    // Destructure the request body to get required fields
    const { firstName, lastName, phone, email, password } = req.body;
    if (!firstName || !lastName || !phone || !email || !password) {
        res.status(400).json({ message: "Enter all the fields" });
    }
    // Check if an admin with the given email already exists
    AdminModel.findOne({ email: email })
        .then((adminInDb) => {
            if (adminInDb) {
                return res.status(404).json({ message: "Admin with the given email already exists" });
            }
            // If the admin does not exist, hash the password and create a new admin
            bcrypt.hash(password, 16)
                .then((hashedPassword) => {
                    const admin = new AdminModel({
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        email: email,
                        password: hashedPassword
                    })
                    // Save the new admin to the database
                    admin.save()
                        .then((admin) => {
                            res.status(201).json({ message: "Admin created successfully", admin: admin });
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

// Route for admin login
router.post('/admin-login', (req, res) => {
    // Destructure the request body to get email and password
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Enter all the fields" });
    }
    // Check if an admin with the given email exists
    AdminModel.findOne({ email: email })
        .then((adminInDb) => {
            if (!adminInDb) {
                return res.status(404).json({ message: "Invalid Credentials" });
            }
            // Compare the password with the hashed password in the database
            bcrypt.compare(password, adminInDb.password)
                .then((matched) => {
                    if (matched) {
                        // If passwords match, create a JWT token and send admin info
                        const token = jwt.sign({ _id: adminInDb._id }, JWT_SECRET)
                        const userInfo = {
                            firstName: adminInDb.firstName,
                            lastName: adminInDb.lastName,
                            phone: adminInDb.phone,
                            email: adminInDb.email,
                            role: adminInDb.role
                        }
                        const userType = {
                            role: adminInDb.role
                        }
                        res.status(200).json({ message: "Login Successful", userInfo: userInfo, token: token, userType: userType });
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

module.exports = router;
