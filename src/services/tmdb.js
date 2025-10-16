const axios = require("axios");

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function searchMovies(query, page = 1) {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
      include_adult: false,
      language: "es-ES",
    },
  });
  return data;
}

async function popularMovies(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page,
      language: "es-ES",
    },
  });
  return data;
}

async function getMovie(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "es-ES",
    },
  });
  return data;
}

module.exports = { searchMovies, popularMovies, getMovie };
