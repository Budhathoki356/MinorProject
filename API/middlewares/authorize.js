var jwt = require('jsonwebtoken');
var config = require('./../config/index');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = function (req, res, next) {
    if( req.loggedInUser.role == 1) {
        return next();
    } else {
        next({
            message : 'Permission deny',
            status: 403
        })
    }
}