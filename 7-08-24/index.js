// Import required modules
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config(); // Load environment variables from .env file
const port = process.env.PORT || 5000; // Set the port to the value from .env or default to 5000
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const app = express(); // Create an Express application instance
const connection = require("./configs/db"); // Import database connection setup
const userRouter = require("./routes/userRoutes"); // Import user-related routes
const taskRoute = require("./routes/taskRoutes"); // Import task-related routes

// Apply middleware
app.use(cors({ origin: "*" })); // Enable CORS for all origins. Consider restricting in production

app.use(express.json()); // Parse incoming JSON requests

// Use imported routers for different routes
app.use("/users", userRouter); // Route for user-related endpoints
app.use("/tasks", taskRoute); // Route for task-related endpoints

// Start the server and establish the database connection
app.listen(port, async () => {
    try {
        await connection; // Wait for the database connection to be established
        console.log(`Server is running and connected to the server at port ${port}`); // Log a success message
    } catch (error) {
        console.log(error); // Log any connection errors
    }
});
