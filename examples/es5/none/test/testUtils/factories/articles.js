var faker = require('faker');
var Article = require('../../../src/models').Article;

function makeArticle(overrides) {
  var overrideData = overrides || {};

  var data = {
    title: faker.lorem.word(),
    body: faker.lorem.sentence()
  };

  Object.assign(data, overrideData);

  return data;
}

function createArticle(overrides) {
  return Article.create(makeArticle(overrides));
}

module.exports = { makeArticle: makeArticle, createArticle: createArticle };
