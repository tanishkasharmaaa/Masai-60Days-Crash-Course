const mongoose=require("mongoose");
const express=require("express");
// Import necessary modules
const express = require('express');
const port = 5000;
const connection = require('./configs/db');
const router = require('./routes/routes');

// Create an instance of Express
const app = express();

// Connect to the database
connection.then(() => {
    console.log('Connected with db');
})
.catch((error) => {
    console.log('Error in making connection', error);
});

// Use the router for handling routes under /movie
app.use('/movie', router);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
