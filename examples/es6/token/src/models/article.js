import { Schema, model } from 'mongoose';

const ArticleSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default model('Article', ArticleSchema);
