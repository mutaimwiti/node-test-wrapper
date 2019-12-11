var app = require('./testUtils/app');
var factories = require('./testUtils/factories/reports');

var createReport = factories.createReport;
var makeReport = factories.makeReport;

function reportFields(data) {
  return { _id: data._id.toString(), title: data.title, body: data.body };
}

describe('Reports', function() {
  it('should allow users to list all reports', function(done) {
    createReport().then(function(existingReport) {
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

  it('should allow users to get one report', function(done) {
    createReport().then(function(existingReport) {
      app.get('/reports/' + existingReport._id).then(function(res) {
        expect(res.status).toBe(200);
        expect(reportFields(res.body.report)).toEqual(
          reportFields(existingReport)
        );

        done();
      });
    });
  });

  it('should allow users to get one report', function(done) {
    var reportData = makeReport();

    app
      .post('/reports')
      .send(reportData)
      .then(function(res) {
        expect(res.status).toBe(201);
        expect(res.body.report).toEqual(expect.objectContaining(reportData));

        done();
      });
  });

  it('should allow users to update an report', function(done) {
    createReport().then(function(existingReport) {
      var updates = makeReport();
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

  it('should allow users to delete an report', function(done) {
    createReport().then(function(report) {
      app.delete('/reports/' + report._id).then(function(res) {
        expect(res.body.message).toEqual('Report deleted successfully');

        done();
      });
    });
  });
});
