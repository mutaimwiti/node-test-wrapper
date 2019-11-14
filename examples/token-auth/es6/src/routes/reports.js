import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ reports: 'All reports' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ report: `Report ${id}` });
});

router.post('/', (req, res) => {
  const { title } = req.body;

  return res.json({ message: `Created report ${title}` });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Updated report ${id}` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Deleted report ${id}` });
});

export default router;
