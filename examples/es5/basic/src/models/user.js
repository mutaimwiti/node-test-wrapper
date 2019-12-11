var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var model = mongoose.model;

var UserSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = model('User', UserSchema);
