import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ reports: 'All reports' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ reports: `Report ${id}` });
});

router.post('/', (req, res) => {
  return res.json({ reports: 'Created report' });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ reports: `Updated report ${id}` });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ reports: `Deleted report ${id}` });
});

export default router;
