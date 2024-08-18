const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const logger = require("../logger");
const dotenv = require("dotenv").config(); // Load environment variables from .env file

// Middleware function to check if the user has a "member" role and is enabled
const memberMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        // If token verification fails, respond with 400 Bad Request
        return res.status(400).send("Invalid token");
      }

      if (decoded && decoded.role === "member") {
        // If the token is decoded and the user's role is "member"
        try {
          // Find the user by their ID from the decoded token
          const user = await userModel.findById(decoded.userID);

          if (user) {
            // Check if the user is disabled
            if (user.isEnabled === false) {
              // If the user is disabled, respond with 403 Forbidden
              return res.status(403).send("You are disabled by Admin");
            }

            // If the user is enabled, proceed to the next middleware
            next();
          } else {
            // If no user is found, respond with 404 Not Found
            return res.status(404).send("User not found");
          }
        } catch (error) {
          // Handle any errors that occur during the database query
          logger.error("Error finding user:", error);
          return res.status(500).send("Internal server error");
        }
      } else {
        // If the user's role is not "member", respond with 403 Forbidden
        return res.status(403).send("Unauthorized access");
      }
    });
  } catch (error) {
    // Handle any errors that occur during the token extraction or verification process
   logger.error("Error in memberMiddleware:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = memberMiddleware;
