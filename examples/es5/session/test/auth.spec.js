var app = require('./utils/app');

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

    it('should maintain the session if it has not expired', function(done) {
      var user = {
        username: 'admin',
        password: 'admin_pass'
      };
      // login to get session cookie
      app
        .post('/auth/login')
        .send(user)
        .then(function(res) {
          // simulate another login attempt using cookie received when logging in
          app
            .post('/auth/login')
            .set('cookie', res.headers['set-cookie'])
            .send(user)
            .then(function(resp) {
              expect(resp.body.message).toEqual('You are already logged in');
              app.logout();
              done();
            });
        });
    });
  });

  describe('POST auth/logout', function() {
    it('should destroy session', function(done) {
      var user = {
        username: 'admin',
        password: 'admin_pass'
      };
      // login to get session cookie
      app
        .post('/auth/login')
        .send(user)
        .then(function(res) {
          // simulate log out using cookie received when logging in
          app
            .post('/auth/logout')
            .set('cookie', res.headers['set-cookie'])
            .then(function(resp) {
              expect(resp.body.message).toEqual('Logged out successfully');
              // try to access route requiring authentication
              app.get('/articles').expect(401, done);
            });
        });
    });
  });
});
