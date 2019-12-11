var faker = require('faker');
var Report = require('../../../src/models').Report;

function makeReport(overrides) {
  var overrideData = overrides || {};

  var data = {
    title: faker.lorem.word(),
    body: faker.lorem.sentence()
  };

  Object.assign(data, overrideData);

  return data;
}

function createReport(overrides) {
  return Report.create(makeReport(overrides));
}

module.exports = { makeReport: makeReport, createReport: createReport };
