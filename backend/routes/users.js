const express = require('express');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({username: req.body.username})
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'Authorization Failed'
          });
        }
        fetchedUser = user;
        console.log(fetchedUser);
        return bcrypt.compare(req.body.password, fetchedUser.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: 'Authorization Failed'
          });
        }
        const token = jwt.sign(
          {username: fetchedUser.username, userId: fetchedUser._id},
          'secret-should-be-longer',
          {expiresIn: '1h'}
        );
        res.status(200).json({
          authUser: fetchedUser,
          token: token
        });
      });
  }
);

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
