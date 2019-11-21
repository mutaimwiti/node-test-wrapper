var mock = require('./__mock__');

var mockUsers = mock.mockUsers;

function findUser(data) {
  return mockUsers.find(function(user) {
    return user.username === data.username && user.password === data.password;
  });
}

module.exports.findUser = findUser;
