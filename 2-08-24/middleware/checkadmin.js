// Importing the jsonwebtoken library, which is used to create and verify JWT tokens.
const jwt = require("jsonwebtoken");

// Middleware function to check if the user is an admin.
const checkAdmin = (req, res, next) => {
   // Getting the token from the Authorization header in the request.
   let token = req.headers.authorization;

   // Checking if the token exists and starts with "Bearer".
   if (token && token.startsWith("Bearer")) {
       // Removing the "Bearer " part from the token to get the actual token string.
       token = token.slice(7, token.length);

       // Verifying the token using the secret key.
       jwt.verify(token, process.env.SECRET_KEY1, function(err, decoded) {
           if (err) {
               // If there's an error in verifying the token, send a 500 status with an error message.
               res.status(500).send("Internal server error");
           }

           if (decoded) {
               // If the token is successfully decoded, check if the user's role is "admin".
               if (decoded.role === "admin") {
                   // If the user is an admin, allow them to proceed to the next middleware or route handler.
                   next();
               } else {
                   // If the user is not an admin, send a message that they are not allowed to access this route.
                   res.send("You are not allowed to access this route");
               }
           }
       });
   }
};

// Exporting the checkAdmin middleware so it can be used in other parts of the application.
module.exports = checkAdmin;
