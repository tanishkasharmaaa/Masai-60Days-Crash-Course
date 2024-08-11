// Importing the Mongoose library, which helps us connect and interact with a MongoDB database.
const mongoose = require("mongoose");

// Loading environment variables from a .env file into our application.
const dotenv = require("dotenv").config();

// Connecting to the MongoDB database.
// The connection string is first taken from an environment variable (MONGO_URL).
// If that environment variable isn't set, it defaults to connecting to a local MongoDB instance.
const connection = mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/user");

// Exporting the connection so it can be used in other parts of the application.
module.exports = connection;
