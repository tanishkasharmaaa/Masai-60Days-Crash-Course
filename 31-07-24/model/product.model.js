// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Defining a schema for the product model
// This schema specifies the structure of documents in the "product" collection
const productSchema = mongoose.Schema({
    title: { 
        type: String, // Data type for title field
        required: true // This field is required
    },
    price: { 
        type: Number, // Data type for price field
        required: true // This field is required
    },
    category: { 
        type: String, // Data type for category field
        required: true // This field is required
    },
    color: { 
        type: String, // Data type for color field
        required: true // This field is required
    },
    brand: { 
        type: String, // Data type for brand field
        required: true // This field is required
    }
},
{ 
    versionKey: false // Disable the "__v" field that Mongoose adds by default
});

// Creating a model named "product" based on the productSchema
// This model represents the "product" collection in the MongoDB database
const productModel = mongoose.model("product", productSchema);

// Exporting the productModel to use in other parts of the application
module.exports = productModel;
