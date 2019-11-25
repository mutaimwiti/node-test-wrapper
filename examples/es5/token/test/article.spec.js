var app = require('./testUtils/app');

describe('Articles', function() {
  describe('GET', function() {
    it('should not allow unauthenticated users to list all articles', function(done) {
      app.get('/articles').expect(401, done);
    });

    it('should allow authenticated users to list all articles', function(done) {
      app.loginRandom(function() {
        app.get('/articles').then(function(res) {
          expect(res.body.articles).toEqual('All articles');
          app.logout();
          done();
        });
      });
    });
  });

  describe('GET /:id', function() {
    it('should not allow unauthenticated users to get one article', function(done) {
      app.get('/articles/25').expect(401, done);
    });

    it('should allow authenticated users to get one article', function(done) {
      app.loginRandom(function() {
        app.get('/articles/6').then(function(res) {
          expect(res.body.article).toEqual('Article 6');
          app.logout();
          done();
        });
      });
    });
  });

  describe('POST', function() {
    it('should not allow unauthenticated users to get create articles', function(done) {
      app.post('/articles').expect(401, done);
    });

    it('should allow authenticated users to get create articles', function(done) {
      app.loginRandom(function() {
        app
          .post('/articles')
          .send({ title: 'foo' })
          .then(function(res) {
            expect(res.body.message).toEqual('Created article foo');
            app.logout();
            done();
          });
      });
    });
  });

  describe('PUT', function() {
    it('should not allow unauthenticated users to update an article', function(done) {
      app.put('/articles/97').expect(401, done);
    });

    it('should allow authenticated users to update an article', function(done) {
      app.loginRandom(function() {
        app.put('/articles/14').then(function(res) {
          expect(res.body.message).toEqual('Updated article 14');
          app.logout();
          done();
        });
      });
    });
  });

  describe('DELETE /:id', function() {
    it('should not allow unauthenticated users to delete an article', function(done) {
      app.delete('/articles/33').expect(401, done);
    });

    it('should allow authenticated users to delete an article', function(done) {
      app.loginRandom(function() {
        app.delete('/articles/2').then(function(res) {
          expect(res.body.message).toEqual('Deleted article 2');
          app.logout();
          done();
        });
      });
    });
  });
});
