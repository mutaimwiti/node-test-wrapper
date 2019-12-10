import faker from 'faker';
import { Report } from '../../../src/models';

const makeReport = (overrides = {}) => {
  return {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    ...overrides,
  };
};

const createReport = (overrides = {}) => {
  return Report.create(makeReport(overrides));
};

export { makeReport, createReport };
