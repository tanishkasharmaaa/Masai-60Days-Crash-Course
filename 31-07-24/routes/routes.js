// Importing necessary modules and middleware
const productModel = require("../model/product.model");
const express = require("express");
const router = express.Router();
const registerModel = require("../model/register.model");
const authToken = require("../middleware/checkToken");
const jwt = require("jsonwebtoken");
const checkAdmin = require("../middleware/checkAdmin");

// Middleware to parse JSON bodies
router.use(express.json());

// Route to get a welcome message
router.get("/", async (req, res) => {
    try {
        res.send('Welcome to Amazon Homepage...');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to register a new user
router.post("/register", async (req, res) => {
    try {
        // Create a new user from the request body
        const register = new registerModel(req.body);
        // Save the user to the database
        await register.save();
        // Send the saved user as response with status 201 (Created)
        res.status(201).send(register);
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Route to log in a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find a user with the provided email and password
        const user = await registerModel.findOne({ email, password });
        if (user) {
            // Generate a JWT token with user details
            const token = jwt.sign(
                { name: user.name, role: user.role },
                process.env.SECRET_KEY || "masai",
                { algorithm: 'HS256', expiresIn: '1h' }
            );
            // Respond with a success message and token
            res.status(201).json({ message: "Login successful", token: token });
        } else {
            // Respond with an error message if email or password is invalid
            res.status(401).send("Invalid email or password");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Route to get products with filtering, sorting, and pagination
router.get("/products", authToken, async (req, res) => {
    const { title, price, category, q, page = 1, sortBy = 'title', limit = 10 } = req.query;
    const filter = {};

    // Apply filters based on query parameters
    if (title) filter.title = title;
    if (price) filter.price = price;
    if (category) filter.category = category;
    if (q) filter.title = new RegExp(q, "i");

    try {
        const products = await productModel.find(filter)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        // Respond with the filtered, sorted, and paginated products
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Route to create a new product (requires admin authentication)
router.post("/products", [authToken, checkAdmin], async (req, res) => {
    try {
        // Create a new product from the request body
        const product = new productModel(req.body);
        // Save the product to the database
        await product.save();
        // Send a success message
        res.status(201).send("Product created");
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Route to update an existing product by ID (requires admin authentication)
router.put("/update/:id", [authToken, checkAdmin], async (req, res) => {
    try {
        // Update the product with the specified ID
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        // Send a success message
        res.send("Product updated");
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Route to delete a product by ID (requires admin authentication)
router.delete("/delete/:id", [authToken, checkAdmin], async (req, res) => {
    try {
        // Delete the product with the specified ID
        await productModel.findByIdAndDelete(req.params.id);
        // Send a success message
        res.send("Product deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send(error); // Respond with an error status if something goes wrong
    }
});

// Exporting the router to use in other parts of the application
module.exports = router;
