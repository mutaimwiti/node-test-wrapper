import app from './testUtils/app';
import { createArticle, makeArticle } from './testUtils/factories/articles';

const articleFields = (data) => {
  const { _id, title, body } = data;

  return { _id: _id.toString(), title, body };
};

describe('Articles', () => {
  it('should allow users to list all articles', async () => {
    const existingArticle = await createArticle();

    const {
      status,
      body: { articles },
    } = await app.get('/articles');

    expect(status).toBe(200);

    expect(articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining(articleFields(existingArticle)),
      ]),
    );
  });

  it('should allow users to get one article', async () => {
    const existingArticle = await createArticle();

    const {
      status,
      body: { article },
    } = await app.get(`/articles/${existingArticle._id}`);

    expect(status).toBe(200);
    expect(articleFields(article)).toEqual(articleFields(existingArticle));
  });

  it('should allow users to get one article', async () => {
    const articleData = makeArticle();

    const {
      status,
      body: { article },
    } = await app.post('/articles').send(articleData);

    expect(status).toBe(201);
    expect(article).toEqual(expect.objectContaining(articleData));
  });

  it('should allow users to update an article', async () => {
    const existingArticle = await createArticle();

    const updates = makeArticle();

    const {
      status,
      body: { article },
    } = await app.put(`/articles/${existingArticle._id}`).send(updates);

    expect(status).toBe(200);
    expect(article).toEqual(expect.objectContaining(updates));
  });

  it('should allow users to delete an article', async () => {
    const article = await createArticle();

    const {
      body: { message },
    } = await app.delete(`/articles/${article._id}`);

    expect(message).toEqual('Article deleted successfully');
  });
});
