import { Router } from 'express';
import { Article } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  return res.json({ articles: await Article.find({}) });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  return res.json({ article: await Article.findOne({ _id: id }) });
});

router.post('/', async (req, res) => {
  const article = await Article.create({ ...req.body });

  return res
    .status(201)
    .json({ article, message: 'Created article successfully' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const article = await Article.findOne({ _id: id });

  article.title = title;
  article.body = body;

  await article.save();

  return res.json({ article, message: 'Updated article successfully' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Article.findOneAndDelete({ _id: id });

  return res.json({ message: 'Article deleted successfully' });
});

export default router;
