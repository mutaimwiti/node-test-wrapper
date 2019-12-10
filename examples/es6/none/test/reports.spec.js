import app from './testUtils/app';
import { createReport, makeReport } from './testUtils/factories/reports';

const reportFields = (data) => {
  const { _id, title, body } = data;

  return { _id: _id.toString(), title, body };
};

describe('Reports', () => {
  it('should allow users to list all reports', async () => {
    const existingReport = await createReport();

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

  it('should allow users to get one report', async () => {
    const existingReport = await createReport();

    const {
      status,
      body: { report },
    } = await app.get(`/reports/${existingReport._id}`);

    expect(status).toBe(200);
    expect(reportFields(report)).toEqual(reportFields(existingReport));
  });

  it('should allow users to get one report', async () => {
    const reportData = makeReport();

    const {
      status,
      body: { report },
    } = await app.post('/reports').send(reportData);

    expect(status).toBe(201);
    expect(report).toEqual(expect.objectContaining(reportData));
  });

  it('should allow users to update an report', async () => {
    const existingReport = await createReport();

    const updates = makeReport();

    const {
      status,
      body: { report },
    } = await app.put(`/reports/${existingReport._id}`).send(updates);

    expect(status).toBe(200);
    expect(report).toEqual(expect.objectContaining(updates));
  });

  it('should allow users to delete an report', async () => {
    const report = await createReport();

    const {
      body: { message },
    } = await app.delete(`/reports/${report._id}`);

    expect(message).toEqual('Report deleted successfully');
  });
});
