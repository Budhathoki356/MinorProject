var express = require('express');
var app = express();
var morgan = require('morgan');
var config = require('./config/index');

//call internal files
var authRoute = require('./controllers/auth');
var userRoute = require('./controllers/users');

require('./config/mongoose.config');

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
    }
});