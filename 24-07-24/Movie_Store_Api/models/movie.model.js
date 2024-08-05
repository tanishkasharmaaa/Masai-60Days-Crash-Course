// Import the mongoose module
const mongoose = require('mongoose');

// Define the movie schema
const movieSchema = mongoose.Schema({
    title: { type: String, required: true },  // The title of the movie, which is a required string
    rating: { type: Number, required: true }, // The rating of the movie, which is a required number
    genre: { type: String },                  // The genre of the movie, which is an optional string
    releaseDate: { type: Date }               // The release date of the movie, which is an optional date
});

// Create the movie model using the schema
const movieModel = mongoose.model('movie', movieSchema);

// Export the movie model
module.exports = movieModel;
