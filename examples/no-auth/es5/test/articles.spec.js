const app = require('./utils/app');

describe('Articles', function() {
  it('should list all articles', function(done) {
    app.get('/articles').then(function({ body }) {
      expect(body.articles).toEqual('All articles');
      done();
    });
  });

  it('should get one article', function(done) {
    app.get('/articles/6').then(function({ body }) {
      expect(body.articles).toEqual('Article 6');
      done();
    });
  });

  it('should create an article', function(done) {
    app.post('/articles').then(function({ body }) {
      expect(body.articles).toEqual('Created article');
      done();
    });
  });

  it('should update an article', function(done) {
    app.put('/articles/14').then(function({ body }) {
      expect(body.articles).toEqual('Updated article 14');
      done();
    });
  });

  it('should delete an article', function(done) {
    app.delete('/articles/2').then(function({ body }) {
      expect(body.articles).toEqual('Deleted article 2');
      done();
    });
  });
});
