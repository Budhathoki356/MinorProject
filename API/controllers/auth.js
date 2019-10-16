var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config = require('./../config/index')

var UserModel = require('./../models/user.models');
var mapUser = require('./../helpers/map_user_req');

function generateToken(user) {
  var token = jwt.sign({
    _id: user._id
  }, config.jwtSecretKey);
  return token;
}

/* GET home page. */
router.route('/')
  .get(function (req, res, next) {
    res.render('index');
  })

router.route('/login')
  .post(function (req, res, next) {
    console.log('i should be here when path match to login', req.body);

    UserModel.findOne({
        username: req.body.username,
      })
      .exec(function (err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          var passwordMatch = passwordHash.verify(req.body.password, user.password);
          if (passwordMatch) {
            var token = generateToken(user);
            res.status(200).json({
              user: user,
              token: token
            });
          } else {
            next({
              message: "password didnot match",
              status: 400
            })
          }
        } else {
          next({
            message: 'Invalid Username',
            status: 400
          })
        }
      });
  });

router.route('/register')
  .post(function (req, res, next) {
    console.log('Request body ==> ', req.body);
    var newUser = new UserModel({});

    var newMappedUser = mapUser(newUser, req.body);
    if (req.body.password) {
      newMappedUser.password = passwordHash.generate(req.body.password);
    };
    newMappedUser.save(function (err, done) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(done);
      }
    });
  })

module.exports = router;