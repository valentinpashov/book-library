import { Router } from "express";
import movieService from "../services/movie-service.js";

const router = Router();

router.get("/", (req, res) => {
  const movies = movieService.getAll();

  res.render("home", { movies });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

export default router;
