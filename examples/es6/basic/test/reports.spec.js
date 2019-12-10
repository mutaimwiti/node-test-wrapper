import faker from 'faker';
import app from './testUtils/app';
import { Report } from '../src/models';

const makeReport = (overrides = {}) => {
  return {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    ...overrides,
  };
};

const createReport = (overrides = {}) => {
  return Report.create(makeReport(overrides));
};

const reportFields = (data) => {
  const { _id, title, body } = data;

  return { _id: _id.toString(), title, body };
};

describe('Reports', () => {
  beforeEach(async () => {
    await app.logout();
  });

  describe('GET', () => {
    it('should not allow unauthenticated users to list all reports', async () => {
      const res = await app.get('/reports');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to list all reports', async () => {
      const existingReport = await createReport();

      await app.loginRandom();

      const {
        status,
        body: { reports },
      } = await app.get('/reports');

      expect(status).toBe(200);

      expect(reports).toEqual(
        expect.arrayContaining([
          expect.objectContaining(reportFields(existingReport)),
        ]),
      );
    });
  });

  describe('GET /:id', () => {
    it('should not allow unauthenticated users to get one report', async () => {
      const res = await app.get('/reports/25');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get one report', async () => {
      const existingReport = await createReport();

      await app.loginRandom();

      const {
        status,
        body: { report },
      } = await app.get(`/reports/${existingReport._id}`);

      expect(status).toBe(200);
      expect(reportFields(report)).toEqual(reportFields(existingReport));
    });
  });

  describe('POST', () => {
    it('should not allow unauthenticated users to get create reports', async () => {
      const res = await app.post('/reports');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to get create reports', async () => {
      const reportData = makeReport();

      await app.loginRandom();

      const {
        status,
        body: { report },
      } = await app.post('/reports').send(reportData);

      expect(status).toBe(201);
      expect(report).toEqual(expect.objectContaining(reportData));
    });
  });

  describe('PUT', () => {
    it('should not allow unauthenticated users to update an report', async () => {
      const res = await app.put('/reports/97');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to update an report', async () => {
      const existingReport = await createReport();

      const updates = makeReport();

      await app.loginRandom();

      const {
        status,
        body: { report },
      } = await app.put(`/reports/${existingReport._id}`).send(updates);

      expect(status).toBe(200);
      expect(report).toEqual(expect.objectContaining(updates));
    });
  });

  describe('DELETE /:id', () => {
    it('should not allow unauthenticated users to delete an report', async () => {
      const res = await app.delete('/reports/33');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated users to delete an report', async () => {
      const report = await createReport();

      await app.loginRandom();

      const {
        body: { message },
      } = await app.delete(`/reports/${report._id}`);

      expect(message).toEqual('Report deleted successfully');
    });
  });
});
