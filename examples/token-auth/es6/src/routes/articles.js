import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ articles: 'All articles' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ article: `Article ${id}` });
});

router.post('/', (req, res) => {
  const { title } = req.body;

  return res.json({ message: `Created article ${title}` });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Updated article ${id}` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Deleted article ${id}` });
});

export default router;
