var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var model = mongoose.model;

var ArticleSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
});

module.exports = model('Article', ArticleSchema);
