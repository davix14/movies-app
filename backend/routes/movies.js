const express = require('express');
const Movie = require("../models/movie");

const router = express.Router();


router.get("", (req, res) => {
  Movie.find().then(documents => {
    res.status(200).json({
      message: 'Successfully got movies from MongoDB',
      movies: documents
    });
  });
});

router.post("", (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered
  });
  movie.save().then(createdPost => {
    // console.log(createdPost);
    res.status(201).json({
      message: 'Movie added successfully',
      movieId: createdPost._id
    });
  });
});

router.put("", (req, res) => {
  const movie = new Movie({
    _id: req.body.id,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered
  });
  Movie.updateOne({ _id: req.body.id }, movie).then(result => {
    // console.log(result);
    console.log('Update of Record Successful');
    res.status(200).json({ message: "Update successful!" });
  });
});

router.delete("/:id", (req, res) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    // console.log(result);
    res.status(200).json({message: 'Post Deleted!', result: result})
  });
});

module.exports = router;
