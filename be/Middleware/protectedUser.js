const jwt = require("jsonwebtoken"); // Import the JSON Web Token library
const { JWT_SECRET } = require("../config"); // Import the JWT secret key from the configuration file

const mongoose = require("mongoose"); // Import the Mongoose library
const UserModel = mongoose.model("UserModel"); // Import the UserModel mongoose model

// Middleware function to check if a user is logged in
module.exports = (req, res, next) => {
    const { authorization } = req.headers; // Extract the 'authorization' header from the request
    if (!authorization) {
        return res.status(401).json({ message: "User not logged in" }); // If no authorization header is present, return an unauthorized status
    }
    const token = authorization.replace("Bearer ", ""); // Extract the JWT token from the authorization header
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "User not logged in" }); // If JWT verification fails, return an unauthorized status
        }
        const { _id } = payload; // Extract the user's ID from the JWT payload
        UserModel.findById(_id).then((dbUser) => {
            req.user = dbUser; // Store the user object in the request object for future use
            next(); // Move to the next middleware or route handler
        });
    });
};
