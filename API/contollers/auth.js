var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('./../config/index');
var UserModel = require('./../models/user.model');

function generateToken(user) {
    var token = jwt.sign({
        _id: user._id
    }, config.jwtSecretKey);
    return token;
}

// For Register
router.post('/register', function (req, res, next) {
    var newUser = new UserModel({});
    newUser.username = req.body.firstName + ' ' + req.body.lastName;
    newUser.password = passwordHash.generate(req.body.password);
    newUser.email = req.body.email;
    newUser.role = req.body.role;
    newUser.address = req.body.address;
    newUser.mobileNumber = req.body.mobileNumber;
    newUser.gender = req.body.gender;
    newUser.activeStatus = req.body.activeStatus;
    newUser.dob = new Date(req.body.dob);
    newUser.createdTime = new Date(req.body.createdTime);
    newUser.updatedTime = new Date(req.body.updatedTime);

    newUser.save(function (err, done) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(done);
        }
    });
});

// For login
router.post('/login', function (req, res, next) {
    console.log('***Im inside login.***');

    UserModel.findOne({
            username: req.body.username
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
                            message: 'Password didnt match',
                            status: 400
                        });
                    }
                } else {
                    next({
                        message: 'Invalid Username.',
                        status: 400
                    });
                }
            });
});

module.exports = router;