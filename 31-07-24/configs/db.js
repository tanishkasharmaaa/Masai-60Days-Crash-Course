// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Establishing a connection to the MongoDB database
// `process.env.MONGO_URL` is used to get the MongoDB URL from environment variables if available
// If not available, it defaults to connecting to a local MongoDB instance at "mongodb://127.0.0.1:27017/amazon"
const connection = mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/amazon");

// Exporting the connection object so that it can be used in other parts of the application
module.exports = connection;
