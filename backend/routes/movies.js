const express = require('express');

const MovieController = require('../controllers/movie');

const router = express.Router();
const checkAuth = require('../middleware/check-Auth');

router.get(
  "",
  checkAuth,
  MovieController.getAllForUser);

router.post(
  "",
  checkAuth,
  MovieController.addNewOne);

router.put("",
  checkAuth,
  MovieController.updateOne);

router.delete("/:id",
  checkAuth,
  MovieController.deleteOne);

module.exports = router;
