import app from './testUtils/app';
import { createUser, makeUser } from './testUtils/factories/users';

describe('Auth', () => {
  describe('POST /auth/login', () => {
    it('should successfully login registered users', async () => {
      const existingUser = createUser();

      await app
        .post('/auth/login')
        .send(existingUser)
        .expect(201);
    });

    it('should not login unregistered users', async () => {
      const nonExistingUser = makeUser();

      await app
        .post('/auth/login')
        .send(nonExistingUser)
        .expect(401);
    });

    it('should not log in users with incorrect password', async () => {
      const existingUser = createUser();

      existingUser.password = 'some_pass';

      await app
        .post('/auth/login')
        .send(existingUser)
        .expect(401);
    });

    it('should maintain the session if it has not expired', async () => {
      const existingUser = createUser();

      // login to get session cookie
      const res = await app.post('/auth/login').send(existingUser);

      // simulate another login attempt using cookie received when logging in
      const resp = await app
        .post('/auth/login')
        .set('cookie', res.headers['set-cookie'])
        .send(existingUser);

      expect(resp.body.message).toEqual('You are already logged in');

      app.logout();
    });
  });

  describe('POST auth/logout', () => {
    it('should destroy session', async () => {
      const existingUser = createUser();

      // login to get session cookie
      const res = await app.post('/auth/login').send(existingUser);

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
