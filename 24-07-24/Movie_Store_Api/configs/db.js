// Import the mongoose module
const mongoose = require('mongoose');

// Establish a connection to the MongoDB database
const connection = mongoose.connect('mongodb://127.0.0.1:27017/movie');

// Export the connection
module.exports = connection;
