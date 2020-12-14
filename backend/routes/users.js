const express = require('express');
const User = require("../models/user");
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/checkOne', (req, res) => {

});

router.post('/newUser', (req, res) => {
  // console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        registrationDate: req.body.registrationDate,
        lastUpdate: req.body.lastUpdate
      });

      newUser.save()
        .then(createdUser => {
          res.status(201).json({
            message: 'User added successfully',
            user: {
              ...createdUser._doc,
              id: createdUser._doc._id
            }
          });
          console.log(createdUser);
        })
        .catch((e) => {
          console.log(e);
        });
    });


});

module.exports = router;
