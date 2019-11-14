import { mockUsers } from './__mock__';

const findUser = (data) =>
  mockUsers.find(function(user) {
    return user.username === data.username && user.password === data.password;
  });

// eslint-disable-next-line
export { findUser };
