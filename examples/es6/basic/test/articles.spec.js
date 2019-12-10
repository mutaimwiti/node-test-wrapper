import faker from 'faker';
import app from './testUtils/app';
import { Article } from '../src/models';

const makeArticle = (overrides = {}) => {
  return {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    ...overrides,
  };
};

const createArticle = (overrides = {}) => {
  return Article.create(makeArticle(overrides));
};

const articleFields = (data) => {
  const { _id, title, body } = data;

  return { _id: _id.toString(), title, body };
};

describe('Articles', () => {
  beforeEach(async () => {
    await app.logout();
  });

  describe('GET', () => {
    it('should not allow unauthenticated users to list all articles', async () => {
      const res = await app.get('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all articles', async () => {
      const existingArticle = await createArticle();

      await app.loginRandom();

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
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one article', async () => {
      const res = await app.get('/articles/25');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one article', async () => {
      const existingArticle = await createArticle();

      await app.loginRandom();

      const {
        status,
        body: { article },
      } = await app.get(`/articles/${existingArticle._id}`);

      expect(status).toBe(200);
      expect(articleFields(article)).toEqual(articleFields(existingArticle));
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create articles', async () => {
      const res = await app.post('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create articles', async () => {
      const articleData = makeArticle();

      await app.loginRandom();

      const {
        status,
        body: { article },
      } = await app.post('/articles').send(articleData);

      expect(status).toBe(201);
      expect(article).toEqual(expect.objectContaining(articleData));
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an article', async () => {
      const res = await app.put('/articles/97');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an article', async () => {
      const existingArticle = await createArticle();

      const updates = makeArticle();

      await app.loginRandom();

      const {
        status,
        body: { article },
      } = await app.put(`/articles/${existingArticle._id}`).send(updates);

      expect(status).toBe(200);
      expect(article).toEqual(expect.objectContaining(updates));
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an article', async () => {
      const res = await app.delete('/articles/33');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an article', async () => {
      const article = await createArticle();

      await app.loginRandom();

      const {
        body: { message },
      } = await app.delete(`/articles/${article._id}`);

      expect(message).toEqual('Article deleted successfully');
    });
  });
});
