// Importing the jsonwebtoken library to handle JWT operations
const jwt = require("jsonwebtoken");

// Middleware function to check and verify the JWT token
const checkToken = (req, res, next) => {
    // Extract the token from the Authorization header
    // The Authorization header should be in the format "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token part after 'Bearer'

    // If no token is provided, respond with a 401 status and an error message
    if (!token) {
        return res.status(401).send('Access token required');
    }

    // Verify the token using the secret key
    // `process.env.SECRET_KEY` is used to get the secret key from environment variables if available
    // If not available, it defaults to "masai"
    jwt.verify(token, process.env.SECRET_KEY || "masai", (err, decoded) => {
        // If there's an error in token verification, respond with a 401 status and an error message
        if (err) {
            return res.status(401).send('Invalid token');
        }
        
        // Attach the decoded token information to the request object for access in subsequent middlewares or route handlers
        req.user = { name: decoded.name, role: decoded.role };

        // Optionally log the user information for debugging purposes
        console.log(req.user);

        // Proceed to the next middleware or route handler
        next();
    });
};

// Exporting the middleware function to use in other parts of the application
module.exports = checkToken;
