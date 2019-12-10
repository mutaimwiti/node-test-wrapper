import faker from 'faker';
import { User } from '../../../src/models';

const makeUser = (overrides = {}) => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
};

const createUser = (overrides = {}) => {
  return User.create(makeUser(overrides));
};

export { makeUser, createUser };
