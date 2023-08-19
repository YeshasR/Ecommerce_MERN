const { MONGODB_URL } = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

// Set a global variable for the base directory
global.__basedir = __dirname;

// Set strict query mode for Mongoose
mongoose.set('strictQuery', true);

// Connect to the MongoDB database using the provided URL
mongoose.connect(MONGODB_URL);

// Get the MongoDB connection object
const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Event listener for connection error
db.on('error', () => {
    console.log('Error connecting to MongoDB');
});

// Import and register the user, admin, and product models
require('./mongo_models/user_model.js');
require('./mongo_models/admin_model.js');
require('./mongo_models/product_model.js');

// Middleware to parse incoming JSON data
app.use(express.json());

// Enable CORS to allow cross-origin requests
app.use(cors());

// Register routes for user, admin, product, and file handling
app.use(require('./routes/user_route'));
app.use(require('./routes/admin_route'));
app.use(require('./routes/product_route'))
app.use(require('./routes/file_route'));

// Start the server and listen on the specified port
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
