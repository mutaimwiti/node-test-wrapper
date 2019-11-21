var Router = require('express').Router;

var router = Router();

router.get('/', function(req, res) {
  return res.json({ reports: 'All reports' });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  return res.json({ report: 'Report ' + id });
});

router.post('/', function(req, res) {
  var title = req.body.title;

  return res.json({ message: 'Created report ' + title });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;

  return res.json({ message: 'Updated report ' + id });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  return res.json({ message: 'Deleted report ' + id });
});

module.exports = router;
