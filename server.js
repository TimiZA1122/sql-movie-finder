const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// ===== Database setup =====
const db = new sqlite3.Database("movies.db", (err) => {
  if (err) console.error("Error opening database", err);
  else console.log("Database connected");
});

// Create tables and prefill data
db.serialize(() => {
  // Movies table
  db.run(`CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      genre TEXT,
      rating REAL
  )`);

  // Actors table
  db.run(`CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
  )`);

  // Movie-Actors relationship
  db.run(`CREATE TABLE IF NOT EXISTS movie_actors (
      movie_id INTEGER,
      actor_id INTEGER,
      FOREIGN KEY(movie_id) REFERENCES movies(id),
      FOREIGN KEY(actor_id) REFERENCES actors(id)
  )`);

  // Prefill 8-10 movies
  const movies = [
    ["Inception", "Action", 8.8],
    ["The Dark Knight", "Action", 9.0],
    ["Interstellar", "Sci-Fi", 8.6],
    ["The Matrix", "Sci-Fi", 8.7],
    ["Titanic", "Romance", 7.8],
    ["The Godfather", "Crime", 9.2],
    ["Forrest Gump", "Drama", 8.8],
    ["Avengers: Endgame", "Action", 8.4]
  ];

  movies.forEach((m) => {
    db.run(`INSERT INTO movies (title, genre, rating) VALUES (?, ?, ?)`, m);
  });

  // Prefill some actors
  const actors = [
    ["Leonardo DiCaprio"],
    ["Joseph Gordon-Levitt"],
    ["Christian Bale"],
    ["Matthew McConaughey"],
    ["Keanu Reeves"],
    ["Kate Winslet"],
    ["Marlon Brando"],
    ["Tom Hanks"],
    ["Robert Downey Jr."],
    ["Chris Evans"]
  ];

  actors.forEach((a) => {
    db.run(`INSERT INTO actors (name) VALUES (?)`, a);
  });

  // Prefill movie_actors relationships
  const movieActors = [
    [1, 1], // Inception - Leonardo DiCaprio
    [1, 2], // Inception - Joseph Gordon-Levitt
    [2, 3], // Dark Knight - Christian Bale
    [3, 4], // Interstellar - Matthew McConaughey
    [4, 5], // Matrix - Keanu Reeves
    [5, 6], // Titanic - Kate Winslet
    [6, 7], // Godfather - Marlon Brando
    [7, 8], // Forrest Gump - Tom Hanks
    [8, 9], // Avengers - Robert Downey Jr.
    [8, 10] // Avengers - Chris Evans
  ];

  movieActors.forEach((ma) => {
    db.run(`INSERT INTO movie_actors (movie_id, actor_id) VALUES (?, ?)`, ma);
  });
});

// ===== API routes =====

// Get all movies
app.get("/movies", (req, res) => {
  db.all(`SELECT * FROM movies`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get top-rated movies
app.get("/movies/top-rated", (req, res) => {
  db.all(`SELECT * FROM movies ORDER BY rating DESC LIMIT 5`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Search movies by title or genre
app.get("/movies/search", (req, res) => {
  const { title, genre } = req.query;
  let query = `SELECT * FROM movies WHERE 1=1`;
  const params = [];

  if (title) {
    query += ` AND title LIKE ?`;
    params.push(`%${title}%`);
  }

  if (genre) {
    query += ` AND genre LIKE ?`;
    params.push(`%${genre}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
