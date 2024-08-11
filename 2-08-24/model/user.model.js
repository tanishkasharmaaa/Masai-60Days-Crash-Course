// Importing the mongoose library to interact with MongoDB.
const mongoose = require("mongoose");

// Defining a schema for the User model using mongoose.
// This schema outlines the structure of the documents in the "user" collection.
const userSchema = mongoose.Schema({
    name: { type: String, required: true },      // Name of the user (string, required).
    age: { type: String, required: true },       // Age of the user (string, required).
    email: { type: String, required: true, unique: true }, // Email of the user (string, required, unique).
    password: { type: String, required: true },  // Password of the user (string, required).
    role: { type: String, default: "user" }      // Role of the user (string, defaults to "user").
},
{ versionKey: false } // Disables the "__v" version key in MongoDB documents.
);

// Creating a model called "UserModel" based on the "userSchema".
// This model represents the "user" collection in MongoDB.
const UserModel = mongoose.model("user", userSchema);

// Exporting the UserModel so it can be used in other parts of the application.
module.exports = UserModel;
