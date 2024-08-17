const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();  // Load environment variables from .env file

// Middleware function for general authentication
const authMiddleware = (req, res, next) => {
    // Extract the JWT token from the Authorization header
    let token = req.headers.authorization.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if (err) {
            // If token verification fails, send a 400 Bad Request error response with the error message
            return res.status(400).send(err);
        }

        if (decoded) {
            // If the token is successfully decoded, proceed to the next middleware or route handler
            next();
        }
    });
}

module.exports = authMiddleware;
