const app = require('./utils/app');

describe('App', function() {
  it('should show welcome message', function(done) {
    app.get('/').then(function({ body }) {
      expect(body.message).toEqual('Welcome');
      done();
    });
  });
});
