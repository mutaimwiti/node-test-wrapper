const Router = require('express').Router;

const router = Router();

router.get('/', function(req, res) {
  return res.json({ articles: 'All articles' });
});

router.get('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Article ${id}` });
});

router.post('/', function(req, res) {
  return res.json({ articles: 'Created article' });
});

router.put('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Updated article ${id}` });
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Deleted article ${id}` });
});

module.exports = router;
