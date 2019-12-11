var app = require('./testUtils/app');
var factory = require('./testUtils/factories/users');

var makeUser = factory.makeUser;
var createUser = factory.createUser;

describe('Auth', function() {
  describe('POST /auth/login', function() {
    it('should successfully login registered users', function(done) {
      createUser().then(function(existingUser) {
        done();
        app
          .post('/auth/login')
          .send(existingUser)
          .expect(201, done);
      });
    });

    it('should not login unregistered users', function(done) {
      var nonExistingUser = makeUser();

      app
        .post('/auth/login')
        .send(nonExistingUser)
        .expect(401, done);
    });

    it('should not log in users with incorrect password', function(done) {
      createUser().then(function(existingUser) {
        var user = existingUser;

        user.password = 'some_pass';

        app
          .post('/auth/login')
          .send(user)
          .expect(401, done);
      });
    });

    it('should reject requests made with invalid token', function(done) {
      app
        .get('/articles')
        .set('authorization', 'SomeValue')
        .expect(401, done);
    });
  });
});
