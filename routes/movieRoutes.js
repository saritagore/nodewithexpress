const express = require('express');
const moviesController = require('../controllers/movieControllers');
const router = express.Router();
// router.param('id',moviesController.checkID);
router.route('/movie-stats').get(moviesController.getMovieStats);
router.route('/movies-by-genre/:genre').get(moviesController.getMovieByGenre);

router.route('/').get(moviesController.getAllMovies)
.post(moviesController.validateBody,moviesController.addMovie);
router.route('/:id').get(moviesController.getMovie)
.patch(moviesController.updateMovie).delete(moviesController.deleteMovie);

// app.get('/api/v1/movies',getAllMovies);

module.exports = router;