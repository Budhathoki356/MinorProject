var express = require('express');
var app = express();

app.get('/', function( req, res){
    res.end('hello from express server');
});

app.listen(4000, function(err, done){
    if(err) {
        console.log('Server listening failed.');
    } else {
        console.log('Server listening at port 4000.');
        console.log('Press CTRL + C to exit');
    }
});
