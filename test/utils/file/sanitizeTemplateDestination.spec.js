/* eslint-disable import/first */
jest.mock('shelljs');
import { mkdir } from 'shelljs';
import { sanitizeTemplateDestination } from '../../../src/utils/file';

describe('sanitizeTemplateDestination()', () => {
  beforeEach(() => {
    mkdir.mockClear();
  });

  it('should try to create parent directory if file path is provided', () => {
    sanitizeTemplateDestination('test/stubs/bar/foo.js');
    expect(mkdir).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if the file is specified directly', () => {
    sanitizeTemplateDestination('foo.js');
    expect(mkdir).not.toHaveBeenCalled();
  });
});
