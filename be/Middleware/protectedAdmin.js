const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config"); // Import the JWT secret key from the configuration file

const mongoose = require("mongoose");
const AdminModel = mongoose.model("AdminModel"); // Import the AdminModel mongoose model

// Middleware function to check if an admin is logged in
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "Admin not logged in" }); // If no authorization header is present, return an unauthorized status
    }
    const token = authorization.replace("Bearer ", ""); // Extract the JWT token from the authorization header
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Admin not logged in" }); // If JWT verification fails, return an unauthorized status
        }
        const { _id } = payload; // Extract the admin's ID from the JWT payload
        AdminModel.findById(_id).then((dbUser) => {
            req.user = dbUser; // Store the admin user object in the request object for future use
            next(); // Move to the next middleware or route handler
        });
    });
};
