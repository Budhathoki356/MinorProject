var mongoose = require('mongoose');
var config = require('./index');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.dbUrl+ '/' + config.dbName, function(err ,done){
    if(err) {
        console.log('error in connecting to db.');
    } else {
        console.log('db connectioon success.');
    }
});