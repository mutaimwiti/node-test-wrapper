import app from './testUtils/app';
import { Report } from '../src/models';

describe('Reports', () => {
  describe('GET', () => {
    it('should not allow unauthenticated users to list all reports', async () => {
      const res = await app.get('/reports');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all reports', async () => {
      await app.loginRandom();

      const {
        status,
        body: { reports },
      } = await app.get('/reports');

      expect(status).toBe(200);
      expect(reports).toEqual([]);

      app.logout();
    });
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one report', async () => {
      const res = await app.get('/reports/25');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one report', async () => {
      const data = {
        title: 'foo',
        body: 'bar',
      };

      const report = await Report.create(data);

      await app.loginRandom();

      const {
        status,
        body: {
          report: { title, body },
        },
      } = await app.get(`/reports/${report._id}`);

      expect(status).toBe(200);
      expect({ title, body }).toEqual(data);

      app.logout();
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create reports', async () => {
      const res = await app.post('/reports');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create reports', async () => {
      const data = {
        title: 'bar',
        body: 'baz',
      };

      await app.loginRandom();

      const {
        status,
        body: {
          report: { title, body },
        },
      } = await app.post('/reports').send(data);

      expect(status).toBe(201);
      expect({ title, body }).toEqual(data);

      app.logout();
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an report', async () => {
      const res = await app.put('/reports/97');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an report', async () => {
      const report = await Report.create({
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
          report: { title, body },
        },
      } = await app.put(`/reports/${report._id}`).send(updates);

      expect(status).toBe(200);
      expect({ title, body }).toEqual(updates);

      app.logout();
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an report', async () => {
      const res = await app.delete('/reports/33');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an report', async () => {
      const report = await Report.create({
        title: 'foo',
        body: 'bar',
      });

      await app.loginRandom();

      const {
        body: { message },
      } = await app.delete(`/reports/${report._id}`);

      expect(message).toEqual('Report deleted successfully');

      app.logout();
    });
  });
});
