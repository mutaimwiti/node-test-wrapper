const { Router } = require('express');

const router = Router();

router.get('/articles', function(req, res) {
  return res.json({ articles: 'All articles' });
});

router.get('/articles/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Article ${id}` });
});

router.post('/articles', function(req, res) {
  return res.json({ articles: 'Created article' });
});

router.patch('/articles/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Updated article ${id}` });
});

router.delete('/articles/:id', function(req, res) {
  const { id } = req.params;

  return res.json({ articles: `Deleted article ${id}` });
});

module.exports = router;
