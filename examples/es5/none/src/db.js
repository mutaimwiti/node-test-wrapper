var mongoose = require('mongoose');

var DEV_URL = 'mongodb://localhost:27017/ntw-es5-none';
var TEST_URL = DEV_URL + '-test';

var URL = process.env.NODE_ENV === 'test' ? TEST_URL : DEV_URL;

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

function connect(callback) {
  return mongoose.connect(URL, options, callback);
}

function disconnect(callback) {
  return mongoose.disconnect(callback);
}

module.exports.connect = connect;
module.exports.disconnect = disconnect;
