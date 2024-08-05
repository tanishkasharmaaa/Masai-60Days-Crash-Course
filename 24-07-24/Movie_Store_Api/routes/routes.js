// Import necessary modules
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Middleware to parse JSON bodies
router.use(express.json());

// Route to create a new movie
router.post('/movies', movieController.createMovies);

// Route to get a list of movies with optional filtering, sorting, and pagination
router.get('/movies', movieController.getMovies);

// Route to get a specific movie by ID
router.get('/movies/:id', movieController.getMoviesById);

// Route to update a specific movie by ID
router.put('/movies/:id', movieController.updateMovie);

// Route to delete a specific movie by ID
router.delete('/movies/:id', movieController.deleteMovie);

// Export the router
module.exports = router;
