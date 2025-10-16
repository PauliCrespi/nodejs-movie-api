const express = require("express");
const { searchMovies, popularMovies, getMovie } = require("../services/tmdb");
const { requireAuth } = require("../middlewares/requireAuth");

const router = express.Router();

// GET /movies/search?query=matrix&page=1
router.get("/search", requireAuth, async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query || String(query).trim() === "") return res.status(400).json({ error: "query es requerido" });
  try {
    const data = await searchMovies(query, Number(page));
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "error consultando TMDB" });
  }
});

// GET /movies/popular?page=1
router.get("/popular", requireAuth, async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const data = await popularMovies(Number(page));
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: "error consultando TMDB" });
  }
});

// GET /movies/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const data = await getMovie(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: "película no encontrada" });
  }
});

module.exports = router;
