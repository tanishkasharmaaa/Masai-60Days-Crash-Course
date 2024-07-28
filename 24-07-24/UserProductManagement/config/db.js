const mongoose=require("mongoose");  // Importing the mongoose module

// Establishing a connection to the MongoDB database
const connection=mongoose.connect("mongodb://127.0.0.1:27017/user_product_manager");

// Exporting the connection for use in other parts of the application
module.exports=connection