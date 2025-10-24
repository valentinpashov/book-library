import { Router } from "express";
import movieService from "../services/movie-service.js";
import movie from "../book.js";

const bookController = Router();

bookController.get('/search', (req, res) => {
  const filter = req.query;
  const movies = movieService.getAll(filter);

  res.render('search', { movies, filter });
});

bookController.get('/create', (req, res) => {
  res.render('create');
});

bookController.post('/create', (req, res) => {
  const newMovie = req.body;

  movieService.create(newMovie);

  res.redirect('/');
});

bookController.get('/:movieId/details', (req, res) => {
  const movieId = req.params.movieId;
  const movie = movieService.findOne(movieId);

  res.render('details', { movie });
});

bookController.delete("/:movieId/delete", (req, res) => {
  const movieId = req.params.movieId; 
  movieService.delete(movieId);
  res.redirect('/');
});

/*
// Update
bookController.put("/:movieId/update", (req, res) => {
  const movieId = req.params.movieId; 
  const movie = req.body;
  movieService.update(movieId, movie);
  res.redirect('/');
});
*/

export default bookController;
