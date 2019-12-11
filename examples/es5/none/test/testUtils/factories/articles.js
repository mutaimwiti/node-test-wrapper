var faker = require('faker');
var models = require('../../../src/models');

var Article = models.Article;

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
