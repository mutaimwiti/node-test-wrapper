import app from './testUtils/app';

describe('App', function() {
  it('should show welcome message', function(done) {
    app.get('/').expect({ message: 'Welcome' }, done);
  });
});
