var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var model = mongoose.model;

var ReportSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
});

module.exports = model('Report', ReportSchema);
