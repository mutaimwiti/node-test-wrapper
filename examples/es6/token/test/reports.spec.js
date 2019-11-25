import app from './testUtils/app';

describe('Reports', () => {
  describe('GET', () => {
    it('should not allow unauthenticated users to list all reports', async () => {
      const res = await app.get('/reports');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all reports', async () => {
      await app.loginRandom();
      const { body } = await app.get('/reports');
      expect(body.reports).toEqual('All reports');
      app.logout();
    });
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one report', async () => {
      const res = await app.get('/reports/25');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one report', async () => {
      await app.loginRandom();
      const { body } = await app.get('/reports/6');
      expect(body.report).toEqual('Report 6');
      app.logout();
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create reports', async () => {
      const res = await app.post('/reports');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create reports', async () => {
      await app.loginRandom();
      const { body } = await app.post('/reports').send({ title: 'foo' });
      expect(body.message).toEqual('Created report foo');
      app.logout();
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an report', async () => {
      const res = await app.put('/reports/97');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an report', async () => {
      await app.loginRandom();
      const { body } = await app.put('/reports/14');
      expect(body.message).toEqual('Updated report 14');
      app.logout();
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an report', async () => {
      const res = await app.delete('/reports/33');

      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an report', async () => {
      await app.loginRandom();
      const { body } = await app.delete('/reports/2');
      expect(body.message).toEqual('Deleted report 2');
      app.logout();
    });
  });
});
