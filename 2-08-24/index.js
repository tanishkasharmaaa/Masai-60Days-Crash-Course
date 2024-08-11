// Importing necessary libraries and modules.
const express = require("express"); // Importing Express to create the server.
const app = express(); // Creating an Express application instance.
const connection = require("./config/db"); // Importing the database connection.
const dotenv = require("dotenv").config(); // Loading environment variables from a .env file.
const router = require("./routes/routes"); // Importing the routes from the routes module.
const port = process.env.PORT || 4000; // Setting the server's port, using the value from .env or defaulting to 4000.

// Using the "/user" route prefix for all routes defined in the router.
app.use("/user", router);

// Starting the server and connecting to the database.
app.listen(port, async () => {
    try {
        await connection; // Awaiting the database connection before proceeding.
        console.log(`Server is running at port ${port}`); // Logging that the server is running.
    } catch (error) {
        console.log(error); // Logging any errors that occur during the connection.
    }
});
