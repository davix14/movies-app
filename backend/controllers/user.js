const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => { //  Used to login and obtain a JWT from server
  let fetchedUser;
  let token;
  User.findOne({username: req.body.username}) //  Query DB for user that matches the user provided
    .then(user => { //  STEP 1
      if (!user) { //  If user is not found return error response
        return res.status(401).json({
          message: 'Username not found'
        });
      }
      fetchedUser = user; //  If user retrieved then save it in local var
      // console.log(fetchedUser); //  for debugging
      return bcrypt.compare(req.body.password, fetchedUser.password); //  Compare stored pw with pw provided returns TRUE OR FALSE
    })
    .then(result => {
      if (!result) { //  If pw did not match return auth error
        console.log('Incorrect Password');
        return res.status(401).json({
          message: 'Incorrect Password'
        });
      }
      token = jwt.sign( //  If pw matches, create a JWT using username and userID and set expiration time
        {username: fetchedUser.username, userId: fetchedUser._id},
        'secret-should-be-longer',
        {expiresIn: '1h'}
      );
      // console.log(fetchedUser + token); //  for debugging
      res.status(200).json({ //  Return success with the user, token, and expiration time in ms (milliseconds)
        authUser: {
          ...fetchedUser._doc
        },
        token,
        expiresIn: 3600,
        message: 'Successful!'
      });
    })
    .catch((e) => { // Catch errors and log to console
      console.log('JOKEER!!' + e);
    });
}

exports.register = (req, res) => { //  Route for registering new user
                                   // console.log(req.body);
  bcrypt.hash(req.body.password, 10) //  Take pw entered and encrypt it
    .then((hash) => {  // After encryption, take user info entered and create new Mongoose object
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        registrationDate: req.body.registrationDate,
        lastUpdate: req.body.lastUpdate
      });

      newUser.save() //  Use mongoose object to save it to the DB
        .then(createdUser => {  //  If saved successfully send back success message
          res.status(401).json({
            message: 'User added successfully',
            /*user: {
              ...createdUser._doc,
              id: createdUser._doc._id
            }*/
            success: true
          });
          // console.log(createdUser);  //  For debugging
        })
        .catch((e) => { //  Catch errors, print to the console, and return error response
          console.log(e);
          res.status(400).json({
            message: 'User not added',
            success: false
          });
        });
    });


}
