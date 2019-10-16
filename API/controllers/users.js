var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user.models');

var passwordHash = require('password-hash');
var mapUser = require('./../helpers/map_user_req');

//Middleware
var authorize = require('./../middlewares/authorize');

/* GET users listing. */
router.route('/')
  .get(function (req, res, next) {
    UserModel.find({}).exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.status(200).json(users);
    })
  });

router.route('/:id')
  .get(function (req, res, next) {
    var userId = req.params.id;
    UserModel.findOne({
      _id: userId
    }).exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        res.status(200).json(user);
      } else {
        next({
          message: 'User not found.',
          status: 404
        })
      }
    })
  })
  .put(function (req, res, next) {
    var userId = req.params.id;
    UserModel.findById(userId, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        var updatedUser = mapUser(user, req.body);
        if (req.body.password) {
          updatedUser.password = passwordHash.generate(req.body.password);
        }
        updatedUser.save(function (err, done) {
          if (err) {
            return next(err);
          }
          res.status(200).json(done);
        })
      } else {
        next({
          message: 'User not found',
          status: 404
        })
      }
    })
  })
  .delete(authorize, function (req, res, next) {
    var userId = req.params.id;
    UserModel.findOne({
      _id: userId
    }).exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        user.remove(function (err, done) {
          if (err) {
            return next(err);
          }
          res.status(200).json(done);
        })
      } else {
        next({
          message: 'User not found',
          status: 404
        })
      }
    })
  })

module.exports = router;