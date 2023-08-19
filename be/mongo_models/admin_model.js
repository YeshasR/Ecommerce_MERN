const mongoose = require('mongoose');

// Define the admin schema
const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // First name is a required field
    },
    lastName: {
        type: String,
        required: true // Last name is a required field
    },
    phone: {
        type: Number,
        required: true // Phone number is a required field
    },
    email: {
        type: String,
        required: true // Email is a required field
    },
    password: {
        type: String,
        required: true // Password is a required field
    },
    role: {
        type: String,
        default: 'admin', // Default role is 'admin'
        enum: ['user', 'admin'] // Role must be one of these values
    }
})

module.exports = mongoose.model("AdminModel", adminSchema);
