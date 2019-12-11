var app = require('./testUtils/app');
var factories = require('./testUtils/factories/reports');

var createReport = factories.createReport;
var makeReport = factories.makeReport;

function reportFields(data) {
  return { _id: data._id.toString(), title: data.title, body: data.body };
}

describe('Reports', function() {
  beforeEach(function() {
    app.logout();
  });

  describe('GET', function() {
    it('should not allow unauthenticated users to list all reports', function(done) {
      app.get('/reports').expect(401, done);
    });

    it('should allow authenticated users to list all reports', function(done) {
      createReport().then(function(existingReport) {
        app.loginRandom().then(function() {
          app.get('/reports').then(function(res) {
            expect(res.status).toBe(200);

            expect(res.body.reports).toEqual(
              expect.arrayContaining([
                expect.objectContaining(reportFields(existingReport))
              ])
            );

            done();
          });
        });
      });
    });
  });

  describe('GET /:id', function() {
    it('should not allow unauthenticated users to get one report', function(done) {
      app.get('/reports/25').expect(401, done);
    });

    it('should allow authenticated users to get one report', function(done) {
      createReport().then(function(existingReport) {
        app.loginRandom().then(function() {
          app.get('/reports/' + existingReport._id).then(function(res) {
            expect(res.status).toBe(200);
            expect(reportFields(res.body.report)).toEqual(
              reportFields(existingReport)
            );

            done();
          });
        });
      });
    });
  });

  describe('POST', function() {
    it('should not allow unauthenticated users to get create reports', function(done) {
      app.post('/reports').expect(401, done);
    });

    it('should allow authenticated users to get create reports', function(done) {
      var reportData = makeReport();

      app.loginRandom().then(function() {
        app
          .post('/reports')
          .send(reportData)
          .then(function(res) {
            expect(res.status).toBe(201);
            expect(res.body.report).toEqual(
              expect.objectContaining(reportData)
            );

            done();
          });
      });
    });
  });

  describe('PUT', function() {
    it('should not allow unauthenticated users to update an report', function(done) {
      app.put('/reports/97').expect(401, done);
    });

    it('should allow authenticated users to update an report', function(done) {
      createReport().then(function(existingReport) {
        var updates = makeReport();

        app.loginRandom().then(function() {
          app
            .put('/reports/' + existingReport._id)
            .send(updates)
            .then(function(res) {
              expect(res.status).toBe(200);
              expect(res.body.report).toEqual(expect.objectContaining(updates));

              done();
            });
        });
      });
    });
  });

  describe('DELETE /:id', function() {
    it('should not allow unauthenticated users to delete an report', function(done) {
      app.delete('/reports/33').expect(401, done);
    });

    it('should allow authenticated users to delete an report', function(done) {
      createReport().then(function(report) {
        app.loginRandom().then(function() {
          app.delete('/reports/' + report._id).then(function(res) {
            expect(res.body.message).toEqual('Report deleted successfully');

            done();
          });
        });
      });
    });
  });
});
