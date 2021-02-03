const Movie = require("../models/movie");
const SearchResult = require("../models/searchResult");

exports.getAllForUser = (req, res) => {
  // console.log(req.body.userId);
  Movie.find({creator: req.body.userId}).then(documents => {
    res.status(200).json({
      message: 'Successfully got movies from MongoDB for that user',
      movies: documents
    });
  });
}

exports.addNewOne = (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered,
    dateChanged: req.body.dateEntered,
    creator: req.body.userId,
    searchResult: (req.body.savedSearchResult ? {
      ...req.body.savedSearchResult
    } : null),
    tags: req.body.tags
  });
  /*console.log(movie);
  res.status(201).json({
    message: 'Movie added successfully'
  });*/
  movie.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Movie added successfully',
      movieId: createdPost._id
    });
  })
    .catch((err) => {
      console.log(err);
      res.status(402).json({ message: 'Error adding the entry!' });
    });
}

exports.updateOne = (req, res) => {
  const movie = new Movie({
    _id: req.body.id,
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    dateEntered: req.body.dateEntered,
    dateChanged: req.body.dateChanged,
    creator: req.body.creator,
    searchResult: req.body.savedSearchResult,
    tags: req.body.tags
  });

  Movie.updateOne({ _id: req.body.id, creator: req.body.userId }, movie).then(result => {
    //
    if(result.nModified > 0) {
      console.log('Update of Record Successful');
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "Update unsuccessful!"});
    }
  });
}

exports.deleteOne = (req, res) => {
  Movie.deleteOne({_id: req.params.id, creator: req.body.userId}).then(result => {
    if(result.n > 0) {
      console.log('Update of Record Successful');
      res.status(200).json({message: "Deletion successful!"});
    } else {
      res.status(401).json({message: "Deletion unsuccessful!"});
    }
  });
}
