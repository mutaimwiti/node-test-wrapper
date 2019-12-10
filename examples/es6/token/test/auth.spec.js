import app from './testUtils/app';
import { makeUser, createUser } from './testUtils/factories/users';

describe('Auth', () => {
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

  it('should reject requests made with invalid token', async () => {
    await app
      .get('/articles')
      .set('authorization', 'SomeValue')
      .expect(401);
  });
});
