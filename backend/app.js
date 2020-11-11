const express = require('express');
const bodyParser = require("body-parser");

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Added middleware to add headers to response
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/movies", (req, res) => {
  const movies = [{
    id: null,
    title: 'Movie1',
    rating: 0,
    description: 'gool',
    dateEntered: null
  },{
    id: null,
    title: 'Movie2',
    rating: 0,
    description: 'gool',
    dateEntered: null
  }];
  res.status(200).json({
    message: 'Success',
    movies: movies
  });
});

module.exports = app;
