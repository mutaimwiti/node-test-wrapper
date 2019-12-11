var db = require('../../src/db');

var connect = db.connect;

var connection;

beforeAll(function(done) {
  connect().then(function(conn) {
    connection = conn;
    done();
  });
});

afterAll(function(done) {
  connection.disconnect().then(function() {
    done();
  });
});
