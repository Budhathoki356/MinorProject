var express = require('express');
var router = express.Router();
var config = require('./../config/index');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// For Register
router.route('/register')
    .post(function (req, res, next) {

    })

// For login
router.route('/login')
    .post(function (req, res, next) {
        console.log('***Im inside login.***');
        MongoClient.connect(config.dbUrl, function (err, client) {
            if (err) {
               return next(err)
            } 
            console.log('\\\\\\DB Connection is successful.////');
            db.collection('users').find({username: req.body.username, password: req.body.password})
        });
    })

module.exports = router;