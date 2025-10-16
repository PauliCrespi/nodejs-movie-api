const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const { searchMovies, popularMovies } = require("../services/tmdb");

const router = express.Router();

// GET /movies?keyword=matrix
router.get("/", requireAuth, async (req, res) => {
  const { keyword, page = 1 } = req.query;
  try {
    const data = keyword
      ? await searchMovies(String(keyword), Number(page))
      : await popularMovies(Number(page));

    // Agregar suggestionScore 0..99 y ordenar desc
    const results = (data.results || [])
      .map(m => ({ ...m, suggestionScore: Math.floor(Math.random() * 100) }))
      .sort((a, b) => b.suggestionScore - a.suggestionScore);

    res.json({ page: data.page, total_pages: data.total_pages, results });
  } catch (e) {
    const status = e.response?.status || 502;
    const detail = { message: e.message, code: e.code, response: e.response?.data };
    res.status(status).json({ error: "tmdb_error", detail });
  }
});

module.exports = router;
