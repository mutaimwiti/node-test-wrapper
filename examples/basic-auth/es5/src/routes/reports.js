const Router = require('express').Router;

const router = Router();

router.get('/', function(req, res) {
  return res.json({ reports: 'All reports' });
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ reports: `Report ${id}` });
});

router.post('/', function(req, res) {
  return res.json({ reports: 'Created report' });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ reports: `Updated report ${id}` });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ reports: `Deleted report ${id}` });
});

module.exports = router;
