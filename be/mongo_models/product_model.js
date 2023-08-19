const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Define the product schema
const productSchema = new mongoose.Schema({
    productImg: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: '', // Default gender is an empty string
        enum: ['women', 'men', 'kids'] // Gender must be one of these values
    },
    category: {
        type: String,
        required: true,
        default: '', // Default category is an empty string
        enum: ['dresses', 'pants', 'skirts', 'shirts', 'trousers', 'hoodies', 'kids'] // Category must be one of these values
    },
    stocks: {
        type: Number,
        required: true
    },
    seller: {
        type: ObjectId,
        ref: "AdminModel" // Reference to the AdminModel for the seller
    },
    rating: [
        {
            ratings: Number, // Rating given to the product
            ratedBy: { type: ObjectId, ref: "UserModel" } // Reference to the UserModel for the user who rated
        }
    ],
    reviews: [
        {
            reviewText: String, // Text of the review
            reviewedBy: { type: ObjectId, ref: "UserModel" } // Reference to the UserModel for the user who reviewed
        }
    ],
    orders: [{
        orderedBy: { type: ObjectId, ref: "UserModel" } // Reference to the UserModel for the user who ordered
    }],
}, { timestamps: true }); // Automatically add timestamps for createdAt and updatedAt

module.exports = mongoose.model('ProductModel', productSchema);
