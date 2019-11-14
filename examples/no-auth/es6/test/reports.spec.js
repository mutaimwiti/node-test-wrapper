import app from './utils/app';

describe('Reports', () => {
  it('should list all reports', async () => {
    const { body } = await app.get('/reports');

    expect(body.reports).toEqual('All reports');
  });

  it('should get one report', async () => {
    const { body } = await app.get('/reports/6');

    expect(body.report).toEqual('Report 6');
  });

  it('should create an report', async () => {
    const { body } = await app.post('/reports').send({title: 'foo'});

    expect(body.message).toEqual('Created report foo');
  });

  it('should update an report', async () => {
    const { body } = await app.put('/reports/14');

    expect(body.message).toEqual('Updated report 14');
  });

  it('should delete an report', async () => {
    const { body } = await app.delete('/reports/2');

    expect(body.message).toEqual('Deleted report 2');
  });
});
