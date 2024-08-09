// Importing the express library to create the server
const express = require("express");

// Getting the port number from environment variables or defaulting to 3000
const port = process.env.PORT || 3000;

// Creating an instance of an Express application
const app = express();

// Importing the database connection configuration
const connection = require("./configs/db");

// Importing the product routes
const productRouter = require("./routes/routes");

// Using the productRouter for handling routes starting with "/amazon"
app.use("/amazon", productRouter);

// Starting the server and establishing a connection to the database
app.listen(port, async () => {
    try {
        // Waiting for the database connection to be established
        await connection;
        // Logging a success message once the server is running and connected to the database
        console.log(`Connection is made to the database and server is running at port ${port}`);
    } catch (error) {
        // Logging any errors that occur during server startup or database connection
        console.log(error);
    }
});
