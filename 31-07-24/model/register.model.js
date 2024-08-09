// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Defining a schema for the register model
// This schema specifies the structure of documents in the "register" collection
const registerSchema = mongoose.Schema({
    name: { 
        type: String, // Data type for name field
        required: true // This field is required
    },
    age: { 
        type: String, // Data type for age field
        required: true // This field is required
    },
    email: { 
        type: String, // Data type for email field
        required: true // This field is required
    },
    password: { 
        type: String, // Data type for password field
        required: true // This field is required
    },
    role: { 
        type: String, // Data type for role field
        required: true // This field is required
    }
},
{ 
    versionKey: false // Disable the "__v" field that Mongoose adds by default
});

// Creating a model named "register" based on the registerSchema
// This model represents the "register" collection in the MongoDB database
const registerModel = mongoose.model("register", registerSchema);

// Exporting the registerModel to use in other parts of the application
module.exports = registerModel;
