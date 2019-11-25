import app from './testUtils/app';

describe('Auth', () => {
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

  it('should reject requests made with invalid token', async () => {
    await app
      .get('/articles')
      .set('authorization', 'SomeValue')
      .expect(401);
  });
});
