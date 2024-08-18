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
const logger = require("./logger"); // Import Winston logger configuration
const rateLimit = require('express-rate-limit'); // Import express-rate-limit for rate limiting

// Apply middleware
app.use(cors({ origin: "*" })); // Enable CORS for all origins. Consider restricting in production
app.use(express.json()); // Parse incoming JSON requests

// Set up rate limiting to prevent abuse
try {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
  
    // Apply rate limiter to all requests
    app.use(limiter);
  } catch (error) {
    logger.error('Error setting up rate limiter:', error); // Log the error using Winston
  }
  
// Use imported routers for different routes
app.use("/users", userRouter); // Route for user-related endpoints
app.use("/tasks", taskRoute); // Route for task-related endpoints

// Start the server and establish the database connection
app.listen(port, async () => {
    try {
        await connection; // Wait for the database connection to be established
        logger.info(`Server is running and connected to the server at port ${port}`); // Log a success message
    } catch (error) {
        logger.error(error); // Log any connection errors
    }
});
