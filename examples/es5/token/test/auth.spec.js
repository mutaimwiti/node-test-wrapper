var app = require('./testUtils/app');

describe('Auth', function() {
  describe('POST /auth/login', function() {
    it('should successfully login registered users', function(done) {
      var user = {
        username: 'admin',
        password: 'admin_pass'
      };

      app
        .post('/auth/login')
        .send(user)
        .expect(201, done);
    });

    it('should not login unregistered users', function(done) {
      var user = {
        username: 'foo',
        password: 'foo_pass'
      };

      app
        .post('/auth/login')
        .send(user)
        .expect(401, done);
    });

    it('should not log in users with incorrect password', function(done) {
      var user = {
        username: 'admin',
        password: 'foo_pass'
      };

      app
        .post('/auth/login')
        .send(user)
        .expect(401, done);
    });

    it('should reject requests made with invalid token', function(done) {
      app
        .get('/articles')
        .set('authorization', 'SomeValue')
        .expect(401, done);
    });
  });
});
