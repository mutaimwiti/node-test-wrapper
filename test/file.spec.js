import { jsExtensionPath } from '../src/utils/file';

describe('utils/file.js', () => {
  describe('jsExtensionPath()', () => {
    it('should return as is if valid js extension', () => {
      expect(jsExtensionPath('testFile.js')).toEqual('testFile.js');
    });

    it('should only append js if it ends with a dot', () => {
      expect(jsExtensionPath('test/testFile.')).toEqual('test/testFile.js');
    });

    it('should append .js if it is not valid js extension', () => {
      expect(jsExtensionPath('testFile')).toEqual('testFile.js');
    });
  });
});
