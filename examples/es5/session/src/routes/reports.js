var Router = require('express').Router;
var models = require('../models');

var Report = models.Report;
var router = Router();

router.get('/', function(req, res) {
  Report.find({}, function(err, reports) {
    return res.json({ reports: reports });
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Report.findOne({ _id: id }, function(err, report) {
    return res.json({ report: report });
  });
});

router.post('/', function(req, res) {
  var data = req.body;

  Report.create(data, function(err, report) {
    return res
      .status(201)
      .json({ report: report, message: 'Created report successfully' });
  });
});

router.put('/:id', function(req, res) {
  Report.findOne({ _id: req.params.id }, function(err, report) {
    var reportToUpdate = report;

    reportToUpdate.title = req.body.title;
    reportToUpdate.body = req.body.body;

    reportToUpdate.save(function(error, updated) {
      return res.json({
        report: updated,
        message: 'Updated report successfully'
      });
    });
  });
});

router.delete('/:id', function(req, res) {
  Report.findOneAndDelete({ _id: req.params.id }, function() {
    return res.json({ message: 'Report deleted successfully' });
  });
});

module.exports = router;
