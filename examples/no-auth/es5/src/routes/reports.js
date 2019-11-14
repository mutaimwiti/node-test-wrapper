const Router = require('express').Router;

const router = Router();

router.get('/', function(req, res) {
  return res.json({ reports: 'All reports' });
});

router.get('/:id', function(req, res) {
  const id = req.params.id;

  return res.json({ report: `Report ${id}` });
});

router.post('/', function(req, res) {
  const title = req.body.title;

  return res.json({ message: `Created report ${title}` });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ message: `Updated report ${id}` });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ message: `Deleted report ${id}` });
});

module.exports = router;
