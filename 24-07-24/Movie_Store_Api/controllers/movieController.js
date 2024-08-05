// Import the Movie model
const movieModel = require('../models/movie.model');
const Movie = require('../models/movie.model');

// Create a new movie
exports.createMovies = async (req, res) => {
    try {
        // Create a new instance of the Movie model with data from the request body
        const movie = new Movie(req.body);
        // Save the movie to the database
        await movie.save();
        // Send a 201 status code and the saved movie as the response
        res.status(201).send(movie);
    } catch (error) {
        // If there is an error, send a 400 status code and the error message
        res.status(400).send(error);
    }
};

// Get movies with filtering, sorting, and pagination
exports.getMovies = async (req, res) => {
    try {
        // Extract query parameters
        const { title, rating, q, sortBy, page = 1, limit = 10 } = req.query;
        // Create a filter object
        const filter = {};
        if (title) filter.title = title;
        if (rating) filter.rating = rating;
        if (q) filter.title = new RegExp(q, 'i');

        // Find movies with the given filter, sort, skip, and limit
        const movies = await Movie.find(filter)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        // Send the movies as the response
        res.send(movies);
    } catch (error) {
        // If there is an error, send a 500 status code and the error message
        res.status(500).send(error);
    }
};

// Get a movie by ID
exports.getMoviesById = async (req, res) => {
    try {
        // Find a movie by its ID
        const movie = await movieModel.findById(req.params.id);
        // If the movie is not found, send a 404 status code
        if (!movie) return res.status(404).send();
        // Send the movie as the response
        res.send(movie);
    } catch (error) {
        // If there is an error, send a 500 status code and the error message
        res.status(500).send(error);
    }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
    try {
        // Find a movie by its ID and update it with data from the request body
        const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // If the movie is not found, send a 404 status code
        if (!movie) return res.status(404).send();
        // Send the updated movie as the response
        res.send(movie);
    } catch (error) {
        // If there is an error, send the error message
        res.status(400).send(error);
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    try {
        // Find a movie by its ID and delete it
        const movie = await Movie.findByIdAndDelete(req.params.id);
        // If the movie is not found, send a 404 status code
        if (!movie) return res.status(404).send();
        // Send the deleted movie as the response
        res.send(movie);
    } catch (error) {
        // If there is an error, send a 500 status code and the error message
        res.status(500).send(error);
    }
};
