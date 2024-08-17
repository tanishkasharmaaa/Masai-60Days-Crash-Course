const jwt = require("jsonwebtoken");

// Middleware function to check if the user has an "admin" role
const adminMiddleware = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  let token = req.headers.authorization.split(" ")[1];

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
    if (err) {
      // If token verification fails, send a 400 Bad Request error response with the error message
      return res.status(400).send(err);
    }

    if (decoded) {
      // If the token is successfully decoded and the user's role is "admin"
      if (decoded.role === "admin") {
        // Proceed to the next middleware or route handler
        next();
      } else {
        // If the user's role is not "admin", send a 403 Forbidden response
        return res.status(403).send("Access denied. Admins only.");
      }
    }
  });
}

module.exports = adminMiddleware;
