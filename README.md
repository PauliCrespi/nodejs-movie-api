# 🎬 NodeJS Movie API
Evaluación técnica – CodigoDelSur

## 📖 Descripción
API REST desarrollada con **Node.js v18** y **Express** que permite:
- Registrar y autenticar usuarios.
- Obtener películas desde la API pública de **TheMovieDB**.
- Agregar y listar películas favoritas.

Cumple con los requerimientos de la evaluación técnica:
- Almacenamiento local en archivos JSON (`users.json`, `favorites.json`).
- Integración con la API externa de TheMovieDB.
- Simulación de base de datos sin usar un motor real.
- Autenticación mediante token (JWT).

## ⚙️ Tecnologías principales
- Node.js 18
- Express
- dotenv (variables de entorno)
- jsonwebtoken (JWT)
- axios (TMDB)
- nodemon (desarrollo)
- REST Client (VSCode) para pruebas

## 📁 Estructura del proyecto
```
nodejs-movie-api/
│
├── src/
│ ├── index.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── movies.js
│ │ └── favorites.js
│ ├── services/
│ │ ├── tmdb.js
│ │ ├── favorites.js
│ │ └── store.js
│ ├── middlewares/
│ │ └── requireAuth.js
│ └── data/
│ ├── users.json
│ └── favorites.json
│
├── .env
├── test.http
├── package.json
└── README.md


---

## 🔑 Variables de entorno
Crea un archivo `.env` en la raíz con:


---

## 🚀 Instalación y ejecución
```bash
git clone https://github.com/<tu_usuario>/nodejs-movie-api.git
cd nodejs-movie-api
npm install
npm run dev

## 🔥 Endpoints
Método	Ruta	Descripción	Auth
POST	/auth/register	Registrar usuario (email, firstName, lastName, password)	❌
POST	/auth/login	Autenticar usuario (devuelve token)	❌
GET	/me	Usuario autenticado (desde el token)	✅
GET	/movies	Listar películas (o buscar con ?keyword=) + suggestionScore	✅
GET	/movies/:id	Detalle de película (opcional)	✅
GET	/favorites	Listar favoritos + suggestionForTodayScore	✅
POST	/favorites	Agregar favorito { movieId, title, ... }	✅
DELETE	/favorites/:movieId	Eliminar favorito	✅
---
## 🧪 Pruebas con REST Client (VS Code)
```
Usa test.http (requiere extensión REST Client):

POST /auth/register

# @name login + POST /auth/login

Usa Authorization: Bearer {{login.response.body.token}} en las demás requests:

GET /me

GET /movies o GET /movies?keyword=matrix

GET /favorites / POST /favorites / DELETE /favorites/:id

---

## 🧠 Notas de diseño
```
Persistencia local: archivos JSON en data/.

JWT incluye sub, email, firstName, lastName.

TMDB con API Key v3 (query param api_key).

suggestionScore y suggestionForTodayScore (0–99) y orden descendente, como pide la consigna.

Rutas protegidas con requireAuth.

