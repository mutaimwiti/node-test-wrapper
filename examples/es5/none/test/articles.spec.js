var app = require('./testUtils/app');
var factories = require('./testUtils/factories/articles');

var createArticle = factories.createArticle;
var makeArticle = factories.makeArticle;

function articleFields(data) {
  return { _id: data._id.toString(), title: data.title, body: data.body };
}

describe('Articles', function() {
  it('should allow users to list all articles', function(done) {
    createArticle().then(function(existingArticle) {
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

  it('should allow users to get one article', function(done) {
    createArticle().then(function(existingArticle) {
      app.get('/articles/' + existingArticle._id).then(function(res) {
        expect(res.status).toBe(200);
        expect(articleFields(res.body.article)).toEqual(
          articleFields(existingArticle)
        );

        done();
      });
    });
  });

  it('should allow users to get one article', function(done) {
    var articleData = makeArticle();

    app
      .post('/articles')
      .send(articleData)
      .then(function(res) {
        expect(res.status).toBe(201);
        expect(res.body.article).toEqual(expect.objectContaining(articleData));

        done();
      });
  });

  it('should allow users to update an article', function(done) {
    createArticle().then(function(existingArticle) {
      var updates = makeArticle();
      app
        .put('/articles/' + existingArticle._id)
        .send(updates)
        .then(function(res) {
          expect(res.status).toBe(200);
          expect(res.body.article).toEqual(expect.objectContaining(updates));

          done();
        });
    });
  });

  it('should allow users to delete an article', function(done) {
    createArticle().then(function(article) {
      app.delete('/articles/' + article._id).then(function(res) {
        expect(res.body.message).toEqual('Article deleted successfully');

        done();
      });
    });
  });
});
