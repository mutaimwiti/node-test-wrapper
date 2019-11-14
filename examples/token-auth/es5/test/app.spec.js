const appSpec = require('./utils/app');

describe('App', function() {
  it('should show welcome message', function(done) {
    appSpec.get('/').then(function({ body }) {
      expect(body.message).toEqual('Welcome');
      done();
    });
  });
});
