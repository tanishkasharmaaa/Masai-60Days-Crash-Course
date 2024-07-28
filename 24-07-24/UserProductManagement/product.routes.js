const mongoose = require("mongoose"); // Importing the mongoose module
const express = require("express"); // Importing the express module
const router = express.Router(); // Creating an instance of the express Router
const connection = require("./config/db"); // Importing the database connection
const productModel = require("./product.model"); // Importing the product model

router.use(express.json()); // Middleware to parse JSON request bodies


// GET route to retrieve all products
router.get('/get-product', async (req, res) => {
    try {
        const data = await productModel.find(); // Retrieve all the products
        res.status(200).send(data); // Send the retrieved data as a response
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

// POST route to create a new product
router.post("/create-product", async (req, res) => {
    try {
        const existingProduct = await productModel.findOne({ name: req.body.name });
        
        const newProduct = new productModel(req.body); // Create a new product instance
        await newProduct.save(); // Save the new product to the database
        res.status(201).send({ message: "Product added successfully", data: newProduct });
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send(error);
    }
});

// PATCH route to update a product by ID
router.patch("/update-product/:id", async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send({ message: "Product updated", data: updatedProduct });
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

// DELETE route to delete a product by ID
router.delete("/delete-product/:id", async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; // Export the router for use in other parts of the application
