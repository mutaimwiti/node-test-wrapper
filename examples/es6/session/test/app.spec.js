import app from './utils/app';

describe('App', () => {
  it('should show welcome message', async () => {
    await app.get('/').expect({ message: 'Welcome' });
  });
});
