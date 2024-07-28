const mongoose = require("mongoose"); // Importing the mongoose module
const express = require("express"); // Importing the express module
const router = express.Router(); // Creating an instance of the express Router
const connection = require("./config/db"); // Importing the database connection
const userModel = require("./user.model"); // Importing the user model

router.use(express.json()); // Middleware to parse JSON request bodies

// GET route to retrieve all users
router.get('/get-user', async (req, res) => {
    try {
        await connection; // Ensure the database connection is established
        const data = await userModel.find(); // Retrieve all the users
        res.status(200).send(data); // Send the retrieved data as a response
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

// POST route to create a new user
router.post("/create-user", async (req, res) => {
    try {
        await connection; // Ensure the database connection is established

        // Check if the user already exists
        const existingUser = await userModel.findOne({ name: req.body.name });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new userModel(req.body); // Create a new user instance
        await newUser.save(); // Save the new user to the database
        res.status(201).send({ message: "User added successfully", data: newUser });
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send(error);
    }
});

// PATCH route to update a user by ID
router.patch("/update-user/:id", async (req, res) => {
    try {
        await connection; // Ensure the database connection is established
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send({ message: "User updated", data: updatedUser });
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

// DELETE route to delete a user by ID
router.delete("/delete-user/:id", async (req, res) => {
    try {
        await connection; // Ensure the database connection is established
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.log(error); // Log any error
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; // Export the router for use in other parts of the application
