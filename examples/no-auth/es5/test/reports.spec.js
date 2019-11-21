var app = require('./utils/app');

describe('Reports', function() {
  it('should list all reports', function(done) {
    app.get('/reports').expect({ reports: 'All reports' }, done);
  });

  it('should get one report', function(done) {
    app.get('/reports/6').expect({ report: 'Report 6' }, done);
  });

  it('should create an report', function(done) {
    app
      .post('/reports')
      .send({ title: 'foo' })
      .expect({ message: 'Created report foo' }, done);
  });

  it('should update an report', function(done) {
    app.put('/reports/14').expect({ message: 'Updated report 14' }, done);
  });

  it('should delete an report', function(done) {
    app.delete('/reports/2').expect({ message: 'Deleted report 2' }, done);
  });
});
