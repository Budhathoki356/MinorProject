var jwt = require('jsonwebtoken');
var config = require('./../config/index');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = function (req, res, next) {
    var token;
    if (req.headers.token) {
        token = req.headers.token;
    }
    if (req.headers['x-access-token']) {
        token = req.header['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if(req.query.token) {
        token = req.query.token;
    }
    if (token) {
        jwt.verify(token, config.jwtSecretKey, function (err, verified) {
            if (err) {
                return next(err);
            }
            MongoClient.connect(config.dbUrl,function(err,client){
                if(err){
                    return next(err);
                }
                var db = client.db(config.dbName);
                db.collection('users')
                    .find({_id: new mongodb.ObjectID(verified._id)})
                    .toArray(function ( err, users){
                        if(err) {
                            return next(err);
                        }
                        if(Array.isArray(users) && users.length) {
                            //loggedInUser 
                            req.loggedInUser = users[0];
                            return next();
                        } else {
                            next({
                                message: 'User removed from system',
                                status: 404
                            });
                        }
                    })
            })
        })
    } else {
        next({
            message: 'Token are not provided',
            status: 400
        })
    }

}