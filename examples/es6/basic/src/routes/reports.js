import { Router } from 'express';
import { Report } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  return res.json({ reports: await Report.find({}) });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  return res.json({ report: await Report.findOne({ _id: id }) });
});

router.post('/', async (req, res) => {
  const report = await Report.create({ ...req.body });

  return res
    .status(201)
    .json({ report, message: 'Created report successfully' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const report = await Report.findOne({ _id: id });

  report.title = title;
  report.body = body;

  await report.save();

  return res.json({ report, message: 'Updated report successfully' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Report.findOneAndDelete({ _id: id });

  return res.json({ message: 'Report deleted successfully' });
});

export default router;
