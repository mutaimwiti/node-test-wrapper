var app = require('./testUtils/app');

describe('Articles', function() {
  it('should list all articles', function(done) {
    app.get('/articles').expect({ articles: 'All articles' }, done);
  });

  it('should get one article', function(done) {
    app.get('/articles/6').expect({ article: 'Article 6' }, done);
  });

  it('should create an article', function(done) {
    app
      .post('/articles')
      .send({ title: 'foo' })
      .expect({ message: 'Created article foo' }, done);
  });

  it('should update an article', function(done) {
    app.put('/articles/14').expect({ message: 'Updated article 14' }, done);
  });

  it('should delete an article', function(done) {
    app.delete('/articles/2').expect({ message: 'Deleted article 2' }, done);
  });
});
