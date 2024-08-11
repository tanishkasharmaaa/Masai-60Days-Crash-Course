// Importing the jsonwebtoken library to work with JWT tokens.
const jwt = require("jsonwebtoken");

// Importing a function that checks if a token is blacklisted (i.e., invalidated).
const { isBlacklisted } = require("../blacklist");

// Loading environment variables from a .env file into our application.
const dotenv = require("dotenv").config();

// Middleware function to authenticate the user.
const auth = (req, res, next) => {
    // Extracting the token from the Authorization header.
    let token = req.headers.authorization.split(" ")[1];

    // Checking if the token is blacklisted.
    if (isBlacklisted(token)) {
        // If the token is blacklisted, send a 401 status with a message that the user needs to log in again.
        return res.status(401).send("You have been logged out, please login again to access this route");
    }

    // Verifying the token using the secret key.
    jwt.verify(token, process.env.SECRET_KEY1, function (err, decoded) {
        if (err) {
            // If there's an error in verifying the token, send a 400 status with an error message.
            return res.status(400).send("Internal server issue");
        }
        if (decoded) {
            // If the token is successfully decoded, log the user's name and role.
            console.log({ name: decoded.name, role: decoded.role });
            // Attach the decoded token (user info) to the request object so it can be used in other routes.
            req.user = decoded;
            // Call the next middleware or route handler.
            next();
        }
    });
};

// Exporting the auth middleware so it can be used in other parts of the application.
module.exports = auth;
