// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Defining a schema for the login model
// This schema specifies the structure of documents in the "register" collection
const loginSchema = mongoose.Schema({
    email: { 
        type: String, // Data type for email field
        required: true // This field is required
    },
    password: { 
        type: String, // Data type for password field
        required: true // This field is required
    }
});

// Creating a model named "register" based on the loginSchema
// This model represents the "register" collection in the MongoDB database
const loginModel = mongoose.model("register", loginSchema);

// Exporting the loginModel to use in other parts of the application
module.exports = loginModel;
