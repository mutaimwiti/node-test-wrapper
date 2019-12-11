var app = require('./testUtils/app');
var factories = require('./testUtils/factories/articles');

var createArticle = factories.createArticle;
var makeArticle = factories.makeArticle;

function articleFields(data) {
  return { _id: data._id.toString(), title: data.title, body: data.body };
}

describe('Articles', function() {
  beforeEach(function() {
    app.logout();
  });

  describe('GET', function() {
    it('should not allow unauthenticated users to list all articles', function(done) {
      app.get('/articles').expect(401, done);
    });

    it('should allow authenticated users to list all articles', function(done) {
      createArticle().then(function(existingArticle) {
        app.loginRandom().then(function() {
          app.get('/articles').then(function(res) {
            expect(res.status).toBe(200);

            expect(res.body.articles).toEqual(
              expect.arrayContaining([
                expect.objectContaining(articleFields(existingArticle))
              ])
            );

            done();
          });
        });
      });
    });
  });

  describe('GET /:id', function() {
    it('should not allow unauthenticated users to get one article', function(done) {
      app.get('/articles/25').expect(401, done);
    });

    it('should allow authenticated users to get one article', function(done) {
      createArticle().then(function(existingArticle) {
        app.loginRandom().then(function() {
          app.get('/articles/' + existingArticle._id).then(function(res) {
            expect(res.status).toBe(200);
            expect(articleFields(res.body.article)).toEqual(
              articleFields(existingArticle)
            );

            done();
          });
        });
      });
    });
  });

  describe('POST', function() {
    it('should not allow unauthenticated users to get create articles', function(done) {
      app.post('/articles').expect(401, done);
    });

    it('should allow authenticated users to get create articles', function(done) {
      var articleData = makeArticle();

      app.loginRandom().then(function() {
        app
          .post('/articles')
          .send(articleData)
          .then(function(res) {
            expect(res.status).toBe(201);
            expect(res.body.article).toEqual(
              expect.objectContaining(articleData)
            );

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
      createArticle().then(function(existingArticle) {
        var updates = makeArticle();

        app.loginRandom().then(function() {
          app
            .put('/articles/' + existingArticle._id)
            .send(updates)
            .then(function(res) {
              expect(res.status).toBe(200);
              expect(res.body.article).toEqual(
                expect.objectContaining(updates)
              );

              done();
            });
        });
      });
    });
  });

  describe('DELETE /:id', function() {
    it('should not allow unauthenticated users to delete an article', function(done) {
      app.delete('/articles/33').expect(401, done);
    });

    it('should allow authenticated users to delete an article', function(done) {
      createArticle().then(function(article) {
        app.loginRandom().then(function() {
          app.delete('/articles/' + article._id).then(function(res) {
            expect(res.body.message).toEqual('Article deleted successfully');

            done();
          });
        });
      });
    });
  });
});
