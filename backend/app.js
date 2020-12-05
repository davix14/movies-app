const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');


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

app.use('/api/movies', moviesRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
