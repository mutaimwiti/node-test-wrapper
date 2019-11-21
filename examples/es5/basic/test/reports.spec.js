var app = require('./utils/app');

describe('Reports', function() {
  describe('GET', function() {
    it('should not allow unauthenticated users to list all Reports', function(done) {
      app.get('/reports').expect(401, done);
    });

    it('should allow authenticated users to list all reports', function(done) {
      app.loginRandom();

      app.get('/reports').then(function(res) {
        expect(res.body.reports).toEqual('All reports');
        app.logout();
        done();
      });
    });
  });

  describe('GET /:id', function() {
    it('should not allow unauthenticated users to get one report', function(done) {
      app.get('/reports/25').expect(401, done);
    });

    it('should allow authenticated users to get one report', function(done) {
      app.loginRandom();

      app.get('/reports/6').then(function(res) {
        expect(res.body.report).toEqual('Report 6');
        app.logout();
        done();
      });
    });
  });

  describe('POST', function() {
    it('should not allow unauthenticated users to get create reports', function(done) {
      app.post('/reports').expect(401, done);
    });

    it('should allow authenticated users to get create reports', function(done) {
      app.loginRandom();

      app
        .post('/reports')
        .send({ title: 'foo' })
        .then(function(res) {
          expect(res.body.message).toEqual('Created report foo');
          app.logout();
          done();
        });
    });
  });

  describe('PUT', function() {
    it('should not allow unauthenticated users to update an report', function(done) {
      app.put('/reports/97').expect(401, done);
    });

    it('should allow authenticated users to update an report', function(done) {
      app.loginRandom();

      app.put('/reports/14').then(function(res) {
        expect(res.body.message).toEqual('Updated report 14');
        app.logout();
        done();
      });
    });
  });

  describe('DELETE /:id', function() {
    it('should not allow unauthenticated users to delete an report', function(done) {
      app.delete('/reports/33').expect(401, done);
    });

    it('should allow authenticated users to delete an report', function(done) {
      app.loginRandom();

      app.delete('/reports/2').then(function(res) {
        expect(res.body.message).toEqual('Deleted report 2');
        app.logout();
        done();
      });
    });
  });
});
