var faker = require('faker');
var User = require('../../../src/models').User;

function makeUser(overrides) {
  var overrideData = overrides || {};

  var data = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  Object.assign(data, overrideData);

  return data;
}

function createUser(overrides) {
  return User.create(makeUser(overrides));
}

module.exports = { makeUser: makeUser, createUser: createUser };
