const express = require('express');
const router = express.Router();
const { mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = mongoose.model("UserModel");
const ProductModel = mongoose.model("ProductModel");
const { JWT_SECRET } = require('../config');
const protectedAdmin = require('../Middleware/protectedAdmin.js');
const protectedUser = require('../Middleware/protectedUser');

// Route to add a new product by the admin only
router.post("/addProduct", protectedAdmin, async (req, res) => {
    const { productImg, productName, productPrice, productDescription, gender, category, stocks } = req.body;
    // Check if all mandatory fields are provided
    if (!productImg || !productName || !productPrice || !productDescription || !gender || !category || !stocks) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    // Remove the password field from the response for security
    req.user.password = undefined;
    // Create and save the new product
    const postObj = new ProductModel({
        productImg: productImg,
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        gender: gender,
        category: category,
        stocks: stocks,
        seller: req.user
    });
    await postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
        })
});

// Route to fetch all products by all the admins
router.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find()
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to fetch all products uploaded by all the admins under the women category
router.get('/products/women', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'women' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch dresses uploaded by all the admins under the women category
router.get('/products/women/dresses', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'women', category: 'dresses' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

// fetch pants uploaded by all the admins under the women category
router.get('/products/women/pants', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'women', category: 'pants' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch skirts uploaded by all the admins under the women category
router.get('/products/women/skirts', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'women', category: 'skirts' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch all products uploaded by all the admins under the men category
router.get('/products/men', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'men' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch shirts uploaded by all the admins under the men category
router.get('/products/men/shirts', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'men', category: 'shirts' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch trousers uploaded by all the admins under the men category
router.get('/products/men/trousers', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'men', category: 'trousers' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch hoodies uploaded by all the admins under the men category
router.get('/products/men/hoodies', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'men', category: 'hoodies' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// fetch hoodies uploaded by all the admins under the men category
router.get('/products/kids', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const perPage = parseInt(req.query.perPage);

        const products = await ProductModel.find({ gender: 'kids' })
            .sort({ createdAt: 1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//fetch only 12 products uploaded latest by all the admins for the featured products
router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find().limit(12);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//fetch all the products for the admin to check
router.get("/myProducts", protectedAdmin, (req, res) => {
    ProductModel.find({ seller: req.user })
        .populate("seller", "_id firstName lastName")
        .then((adminProduct) => {
            res.status(200).json({ product: adminProduct });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

//fetch the particular product with productId
router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//update product by the admin only by getting product id of the particular product
router.put('/updateProduct/:productId', protectedAdmin, async (req, res) => {
    try {
        const { productId } = req.params;
        const { stocks, productPrice } = req.body;

        if (!stocks && !productPrice) {
            return res
                .status(400)
                .json({ error: 'At least one field must be provided for update' });
        }

        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        if (stocks) {
            product.stocks = stocks;
        }

        if (productPrice) {
            product.productPrice = productPrice;
        }

        const updatedProduct = await product.save();

        res.status(200).json({ product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//delete product by the admin only
router.delete("/deleteproduct/:productId", protectedAdmin, async (req, res) => {
    try {
        const productFound = await ProductModel.findOne({ _id: req.params.productId })
            .populate("seller", "id");

        if (!productFound) {
            return res.status(400).json({ error: "The product doesn't exist" });
        }
        if (productFound.seller._id.toString() === req.user._id.toString()) {
            await ProductModel.deleteOne({ _id: req.params.productId });
            res.status(200).json({ result: "Product is deleted successfully!" });
        } else {
            res.status(403).json({ error: "You are not authorized to delete this product" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to rate the product by the given product id (for users)
router.put("/rate", protectedUser, async (req, res) => {
    try {
        const { productId, ratings } = req.body;
        const userId = req.user._id;
        const existingRating = await ProductModel.findOne({
            _id: productId,
            "rating.ratedBy": userId,
        });
        if (existingRating) {
            return res
                .status(400)
                .json({ error: "You have already rated this product" });
        }

        const newRating = { ratings, ratedBy: userId };
        const updatedRating = await ProductModel.findByIdAndUpdate(
            req.body.productId,
            {
                $push: { "rating": { ratings: newRating.ratings, ratedBy: userId } },
            },
            {
                new: true,
            }
        )
            .populate("rating.ratedBy", "_id firstName lastName")
            .populate("seller", "_id firstName lastName")

        if (!updatedRating) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(updatedRating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes to order and remove products from the cart (for users)
router.put('/order', protectedUser, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.stocks <= 0) {
            return res.status(400).json({ title: 'Out of stock', message: 'We are sorry to tell you that Product is out of stock, please check again later' });
        }
        product.stocks -= 1;
        product.orders.push({ orderedBy: userId });
        await product.save();
        await UserModel.findByIdAndUpdate(userId, {
            $push: { orders: { product: productId } }
        });
        res.json({ message: 'Product ordered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
});
router.delete('/order/:productId', protectedUser, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.stocks += 1;
        product.orders.pull({ orderedBy: userId });
        await product.save();
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { orders: { product: productId } }
        });

        res.json({ message: 'Product removed from the cart successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
});

module.exports = router;
