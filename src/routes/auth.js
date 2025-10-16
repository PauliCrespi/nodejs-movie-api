const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const { load, save } = require("../services/store");

const router = express.Router();

// POST /auth/register
router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body || {};

  // validación de campos obligatorios
  if (!email || !firstName || !lastName || !password) {
    return res
      .status(400)
      .json({ error: "email, firstName, lastName y password son requeridos" });
  }

  const users = await load("users");

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "el email ya está registrado" });
  }

  const id = randomUUID();
  const hash = await bcrypt.hash(password, 10);

  users.push({ id, email, firstName, lastName, password: hash });
  await save("users", users);

  res.status(201).json({ id, email, firstName, lastName });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const users = await load("users");
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "credenciales inválidas" });

  const token = jwt.sign(
    { sub: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

module.exports = router;

