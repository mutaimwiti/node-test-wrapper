/* eslint-disable import/first */
jest.mock('fs');
import { copyFileSync } from 'fs';
import { copyTemplate } from '../../../src/utils/file';

const getSourceArg = ({ esVersion, authOpt }) => {
  // we are having to do this because copyTemplate fn is having to pass
  // the path based on it's location
  return `${process.cwd()}/src/utils/../assets/${esVersion}/${authOpt}.js`;
};

describe('copyTemplate()', () => {
  beforeEach(() => {
    copyFileSync.mockClear();
  });

  it('should create the requested file', () => {
    const options = {
      esVersion: 'es5',
      authOpt: 'token',
      filePath: 'test/stubs/foo.js',
    };

    copyTemplate(options);

    expect(copyFileSync).toHaveBeenNthCalledWith(
      1,
      getSourceArg(options),
      'test/stubs/foo.js',
    );
  });

  it('should invoke jsExtension() to ensure correct extension', () => {
    const options = {
      esVersion: 'es6',
      authOpt: 'session',
      filePath: 'test/stubs/bar',
    };

    copyTemplate(options);

    expect(copyFileSync).toHaveBeenNthCalledWith(
      1,
      getSourceArg(options),
      'test/stubs/bar.js',
    );
  });
});
