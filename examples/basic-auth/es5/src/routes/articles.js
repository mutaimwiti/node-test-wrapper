const Router = require('express').Router;

const router = Router();

router.get('/', function(req, res) {
  return res.json({ articles: 'All articles' });
});

router.get('/:id', function(req, res) {
  const id = req.params.id;

  return res.json({ article: `Article ${id}` });
});

router.post('/', function(req, res) {
  const title = req.body.title;

  return res.json({ message: `Created article ${title}` });
});

router.put('/:id', function(req, res) {
  const id = req.params.id;

  return res.json({ message: `Updated article ${id}` });
});

router.delete('/:id', function(req, res) {
  const id = req.params.id;

  return res.json({ message: `Deleted article ${id}` });
});

module.exports = router;
