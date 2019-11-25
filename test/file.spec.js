import { jsExtensionPath, fileAvailable } from '../src/utils/file';

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

  describe('fileAvailable()', () => {
    it('should fail if is invalid file path', () => {
      expect(fileAvailable('test/*app.js')).toEqual(
        "'test/*app.js' is not a valid file path",
      );
    });

    it('should fail if it ends with /', () => {
      expect(fileAvailable('test/app.js/')).toEqual(
        "'test/app.js/' is not a valid file path",
      );
    });

    it('should fail if it ends with \\', () => {
      expect(fileAvailable('test/app.js\\')).toEqual(
        "'test/app.js\\' is not a valid file path",
      );
    });

    it('should fail if it is an absolute path', () => {
      expect(fileAvailable('/test/app.js')).toEqual(
        'Specify a relative file path',
      );
    });

    it('should fail if it is an existing directory', () => {
      expect(fileAvailable('test/stubs/dir.js')).toEqual(
        "'test/stubs/dir.js' is a directory",
      );
    });

    it('should fail if it is an existing file', () => {
      expect(fileAvailable('test/stubs/app.js')).toEqual(
        "File 'test/stubs/app.js' already exists",
      );
    });

    it('should return true if file path is available', () => {
      expect(fileAvailable('tests/stubs/testFile.js')).toEqual(true);
    });
  });
});
