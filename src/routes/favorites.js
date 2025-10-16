const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const { listFavorites, addFavorite, removeFavorite } = require("../services/favorites");

const router = express.Router();

// GET /favorites
router.get("/", requireAuth, async (req, res) => {
  const items = await listFavorites(req.user.sub);
  res.json(items);
});

// POST /favorites  (body mínimo: movieId, title; opcional: posterPath, overview, releaseDate)
router.post("/", requireAuth, async (req, res) => {
  const { movieId, title, posterPath, overview, releaseDate } = req.body || {};
  if (!movieId || !title) return res.status(400).json({ error: "movieId y title son requeridos" });

  const { added, items } = await addFavorite(req.user.sub, {
    movieId,
    title,
    posterPath: posterPath || null,
    overview: overview || null,
    releaseDate: releaseDate || null,
    addedAt: new Date().toISOString()
  });

  res.status(added ? 201 : 200).json(items);
});

// DELETE /favorites/:movieId
router.delete("/:movieId", requireAuth, async (req, res) => {
  const { removed, items } = await removeFavorite(req.user.sub, req.params.movieId);
  res.status(removed ? 200 : 404).json(removed ? items : { error: "favorito no encontrado" });
});

module.exports = router;
