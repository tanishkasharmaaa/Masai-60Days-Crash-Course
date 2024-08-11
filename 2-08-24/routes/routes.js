// Importing necessary libraries and modules.
const express = require("express");
const bcrypt = require("bcrypt"); // For hashing passwords.
const jwt = require("jsonwebtoken"); // For generating and verifying JWT tokens.
const UserModel = require("../model/user.model"); // Importing the User model.
const auth = require("../middleware/checkToken"); // Middleware to check JWT tokens.
const checkAdmin = require("../middleware/checkadmin"); // Middleware to check if the user is an admin.
const { addToBlacklist } = require("../blacklist"); // Function to add tokens to the blacklist.
const router = express.Router(); // Creating a new Express router instance.
const dotenv = require("dotenv").config(); // Loading environment variables from .env file.

router.use(express.json()); // Middleware to parse JSON bodies in requests.

// Route to handle the home page request.
router.get("/", async (req, res) => {
    try {
        res.status(200).send("Welcome to homePage");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to handle user registration.
router.post("/register", async (req, res) => {
    const { name, age, email, password } = req.body; // Destructuring the request body to get user details.
    let user;
    try {
        // Hashing the user's password before saving it to the database.
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(500).send("Internal server error");
            }
            if (hash) {
                // Creating a new user with the hashed password.
                user = new UserModel({
                    name,
                    age,
                    email,
                    password: hash
                });

                await user.save(); // Saving the user to the database.
            }
            res.status(201).send(user); // Sending a response with the newly created user.
        });
    } catch (error) {
        console.log(error);
    }
});

// Route to handle user login.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email }); // Finding the user by email.
        if (!user) {
            res.status(404).send("Invalid user"); // If user not found, send an error.
        }
        // Comparing the provided password with the hashed password in the database.
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                res.json({ message: err });
            }
            if (result) {
                // Generating access and refresh tokens if password is correct.
                let accessToken = jwt.sign(
                    { name: user.name, role: user.role },
                    process.env.SECRET_KEY1,
                    { algorithm: 'HS256' },
                    { expiresIn: '10m' }
                );
                let refreshToken = jwt.sign(
                    { name: user.name, role: user.role },
                    process.env.SECRET_KEY2,
                    { algorithm: 'HS256' },
                    { expiresIn: "1day" }
                );

                res.status(200).json({ message: "Login successful", accessToken, refreshToken });
            } else {
                res.status(400).send("Password check failed");
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Route to handle fetching all products (requires authentication).
router.get("/products", auth, async (req, res) => {
    try {
        res.send("All products displayed...");
    } catch (error) {
        console.log(error);
    }
});

// Route to handle updating a product (requires authentication and admin role).
router.put("/update", [auth, checkAdmin], async (req, res) => {
    try {
        res.send("Product updated successfully");
    } catch (error) {
        console.log(error);
    }
});

// Route to handle deleting a product (requires authentication and admin role).
router.delete("/delete", [auth, checkAdmin], async (req, res) => {
    try {
        res.send("Product deleted successfully");
    } catch (error) {
        console.log(error);
    }
});

// Route to handle user logout.
router.get("/logout", async (req, res) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).send("No token provided");
        }
        addToBlacklist(token); // Add the token to the blacklist.
        res.status(200).send("Successfully logged out and token added to the blacklist");
    } catch (error) {
        res.status(500).send("Logout failed");
        console.log(error);
    }
});

// Route to generate a new access token using a refresh token.
router.get("/get-accessToken", (req, res) => {
    const refreshToken = req.headers.authorization.split(" ")[1];
    jwt.verify(refreshToken, process.env.SECRET_KEY2, function (err, decoded) {
        if (decoded) {
            // Creating a new access token using the decoded information from the refresh token.
            const accessToken = jwt.sign(
                { name: decoded.name, role: decoded.role },
                process.env.SECRET_KEY1,
                { expiresIn: "10m" }
            );
            res.status(200).json({
                message: "Access token generated successfully",
                accessToken
            });
        }
    });
});

// Exporting the router so it can be used in other parts of the application.
module.exports = router;
