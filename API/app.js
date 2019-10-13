var express = require('express');
var app = express();
var morgan = require('morgan');
var config = require('./config/index');

//call internal files
var authRoute = require('./contollers/auth');
var userRoute = require('./contollers/users');


//third party middleware
app.use(morgan('dev'));

//inbuilt middleware 
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//router level middleware
app.use('/auth', authRoute);
app.use('/user', userRoute);

port = process.env.PORT || config.port;
//server 
app.listen(port, function (err, done) {
    if (err) {
        console.log('Server listening failed.');
    } else {
        console.log('Server listening at port 4000.');
        console.log('Press CTRL + C to exit');
    }
});