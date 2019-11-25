import app from './testUtils/app';

describe('Articles', () => {
  describe('GET', () => {
    it('should not allow unauthenticated users to list all articles', async () => {
      const res = await app.get('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all articles', async () => {
      await app.loginRandom();
      const { body } = await app.get('/articles');
      expect(body.articles).toEqual('All articles');
      app.logout();
    });
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one article', async () => {
      const res = await app.get('/articles/25');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one article', async () => {
      await app.loginRandom();
      const { body } = await app.get('/articles/6');
      expect(body.article).toEqual('Article 6');
      app.logout();
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create articles', async () => {
      const res = await app.post('/articles');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create articles', async () => {
      await app.loginRandom();
      const { body } = await app.post('/articles').send({ title: 'foo' });
      expect(body.message).toEqual('Created article foo');
      app.logout();
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an article', async () => {
      const res = await app.put('/articles/97');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an article', async () => {
      await app.loginRandom();
      const { body } = await app.put('/articles/14');
      expect(body.message).toEqual('Updated article 14');
      app.logout();
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an article', async () => {
      const res = await app.delete('/articles/33');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an article', async () => {
      await app.loginRandom();
      const { body } = await app.delete('/articles/2');
      expect(body.message).toEqual('Deleted article 2');
      app.logout();
    });
  });
});
