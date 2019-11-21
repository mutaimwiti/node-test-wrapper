import app from './utils/app';

describe('Auth', () => {
  describe('POST /auth/login', () => {
    it('should successfully login registered users', async () => {
      const user = {
        username: 'admin',
        password: 'admin_pass',
      };

      await app
        .post('/auth/login')
        .send(user)
        .expect(201);
    });

    it('should not login unregistered users', async () => {
      const user = {
        username: 'foo',
        password: 'foo_pass',
      };

      await app
        .post('/auth/login')
        .send(user)
        .expect(401);
    });

    it('should not log in users with incorrect password', async () => {
      const user = {
        username: 'admin',
        password: 'foo_pass',
      };

      await app
        .post('/auth/login')
        .send(user)
        .expect(401);
    });

    it('should maintain the session if it has not expired', async () => {
      const user = {
        username: 'admin',
        password: 'admin_pass',
      };

      // login to get session cookie
      const res = await app.post('/auth/login').send(user);

      // simulate another login attempt using cookie received when logging in
      const resp = await app
        .post('/auth/login')
        .set('cookie', res.headers['set-cookie'])
        .send(user);

      expect(resp.body.message).toEqual('You are already logged in');

      app.logout();
    });
  });

  describe('POST auth/logout', () => {
    it('should destroy session', async () => {
      const user = {
        username: 'admin',
        password: 'admin_pass',
      };
      // login to get session cookie
      const res = await app.post('/auth/login').send(user);

      // simulate log out using cookie received when logging in
      const resp = await app
        .post('/auth/logout')
        .set('cookie', res.headers['set-cookie']);

      expect(resp.body.message).toEqual('Logged out successfully');

      // try to access route requiring authentication
      app.get('/articles').expect(401);
    });
  });
});
