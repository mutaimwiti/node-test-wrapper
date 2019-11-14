import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ articles: 'All articles' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ articles: `Article ${id}` });
});

router.post('/', (req, res) => {
  return res.json({ articles: 'Created article' });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ articles: `Updated article ${id}` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ articles: `Deleted article ${id}` });
});

export default router;
