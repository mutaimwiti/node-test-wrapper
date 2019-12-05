import app from './testUtils/app';
import { Article } from '../src/models';

describe('Articles', () => {
  describe('GET', () => {
    it('should not allow unauthenticated users to list all articles', async () => {
      const res = await app.get('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all articles', async () => {
      await app.loginRandom();

      const {
        status,
        body: { articles },
      } = await app.get('/articles');

      expect(status).toBe(200);
      expect(articles).toEqual([]);

      app.logout();
    });
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one article', async () => {
      const res = await app.get('/articles/25');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one article', async () => {
      const data = {
        title: 'foo',
        body: 'bar',
      };

      const article = await Article.create(data);

      await app.loginRandom();

      const {
        status,
        body: {
          article: { title, body },
        },
      } = await app.get(`/articles/${article._id}`);

      expect(status).toBe(200);
      expect({ title, body }).toEqual(data);

      app.logout();
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create articles', async () => {
      const res = await app.post('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create articles', async () => {
      const data = {
        title: 'bar',
        body: 'baz',
      };

      await app.loginRandom();

      const {
        status,
        body: {
          article: { title, body },
        },
      } = await app.post('/articles').send(data);

      expect(status).toBe(201);
      expect({ title, body }).toEqual(data);

      app.logout();
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an article', async () => {
      const res = await app.put('/articles/97');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an article', async () => {
      const article = await Article.create({
        title: 'foo',
        body: 'bar',
      });

      const updates = {
        title: 'bar',
        body: 'baz',
      };

      await app.loginRandom();

      const {
        status,
        body: {
          article: { title, body },
        },
      } = await app.put(`/articles/${article._id}`).send(updates);

      expect(status).toBe(200);
      expect({ title, body }).toEqual(updates);

      app.logout();
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an article', async () => {
      const res = await app.delete('/articles/33');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an article', async () => {
      const article = await Article.create({
        title: 'foo',
        body: 'bar',
      });

      await app.loginRandom();

      const {
        body: { message },
      } = await app.delete(`/articles/${article._id}`);

      expect(message).toEqual('Article deleted successfully');

      app.logout();
    });
  });
});
