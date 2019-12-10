import faker from 'faker';
import { Article } from '../../../src/models';

const makeArticle = (overrides = {}) => {
  return {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    ...overrides,
  };
};

const createArticle = (overrides = {}) => {
  return Article.create(makeArticle(overrides));
};

export { makeArticle, createArticle };
