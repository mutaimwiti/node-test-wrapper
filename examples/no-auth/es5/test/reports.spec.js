const app = require('./utils/app');

describe('Reports', function() {
  it('should list all reports', function(done) {
    app.get('/reports').then(function({ body }) {
      expect(body.reports).toEqual('All reports');
      done();
    });
  });

  it('should get one report', function(done) {
    app.get('/reports/6').then(function({ body }) {
      expect(body.reports).toEqual('Report 6');
      done();
    });
  });

  it('should create an report', function(done) {
    app.post('/reports').then(function({ body }) {
      expect(body.reports).toEqual('Created report');
      done();
    });
  });

  it('should update an report', function(done) {
    app.put('/reports/14').then(function({ body }) {
      expect(body.reports).toEqual('Updated report 14');
      done();
    });
  });

  it('should delete an report', function(done) {
    app.delete('/reports/2').then(function({ body }) {
      expect(body.reports).toEqual('Deleted report 2');
      done();
    });
  });
});
