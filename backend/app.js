const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Movie = require("./models/movie");

const app = express();

mongoose
  .connect(// PW: 0yigUYH5y2mTAmkc
    // mongodb+srv://max:<password>@cluster0.bm0yx.mongodb.net/<dbname>?retryWrites=true&w=majority
    "mongodb+srv://max:0yigUYH5y2mTAmkc@cluster0.bm0yx.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Added middleware to add headers to response
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/movies", (req, res) => {
  Movie.find().then(documents => {
    res.status(200).json({
      message: 'Successfully got movies from MongoDB',
      movies: documents
    });
  });
});

app.post("/api/movies", (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered
  });
  movie.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Movie added successfully',
      movieId: createdPost._id
    });
  });
});

app.put("/api/movies", (req, res) => {
  const movie = new Movie({
    _id: req.body.id,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered
  });
  Movie.updateOne({ _id: req.body.id }, movie).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

app.delete("/api/movies:id", (req, res) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    // console.log(result);
    res.status(200).json({message: 'Post Deleted!', result: result})
  });
});

module.exports = app;
