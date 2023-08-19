const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // Default role is 'user'
        enum: ['user', 'admin'] // Role must be either 'user' or 'admin'
    },
    orders: [{
        product: {
            type: ObjectId,
            ref: "ProductModel" // Reference to the ProductModel for the ordered product
        },
        orderedAt: {
            type: Date,
            default: Date.now // Default to the current date and time
        }
    }]
});

module.exports = mongoose.model("UserModel", userSchema);
