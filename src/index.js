const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const { requireAuth } = require("./middlewares/requireAuth");

const app = express();
app.use(express.json());

// Ruta de prueba
app.get("/health", (_, res) => res.json({ ok: true }));

// Rutas de autenticación
app.use("/auth", authRoutes);


// Ruta protegida (requiere token JWT)
app.get("/me", requireAuth, (req, res) => {
  const { sub, email, firstName, lastName } = req.user;
  res.json({
    id: sub,
    email,
    firstName,
    lastName
  });
});

//Ruta peliculas
const moviesRoutes = require("./routes/movies");
app.use("/movies", moviesRoutes);

//Ruta peliculas favoritas
const favoritesRoutes = require("./routes/favorites");
app.use("/favorites", favoritesRoutes);


app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
