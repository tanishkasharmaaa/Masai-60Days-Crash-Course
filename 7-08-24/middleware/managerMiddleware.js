const jwt = require("jsonwebtoken");

// Middleware function to check if the user has a "manager" role
const managerMiddleware = (req, res, next) => {
    // Extract the JWT token from the Authorization header
    let token = req.headers.authorization.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if (err) {
            // If token verification fails, send a 400 Bad Request error response with the error message
            return res.status(400).send("Invalid token");
        }

        if (decoded) {
            // If the token is successfully decoded
            if (decoded.role === "manager") {
                // If the user's role is "manager", proceed to the next middleware or route handler
                next();
            } else {
                // If the user's role is not "manager", send a 403 Forbidden response
                return res.status(403).send("Access denied. Managers only.");
            }
        }
    });
}

module.exports = managerMiddleware;
