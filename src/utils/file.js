import fs from 'fs';
import shell from 'shelljs';
import isInvalidPath from 'is-invalid-path';

/**
 * Append a '.js' extension to the supplied file path if it does not have one.
 * If it has a '.js' extension it is returned unaltered. If it ends with '.',
 * 'js' is appended. Otherwise, '.js' is appended.
 *
 * @param filePath
 * @returns {string}
 */
const jsExtensionPath = (filePath) =>
  filePath.endsWith('.js')
    ? filePath
    : filePath + (filePath.endsWith('.') ? 'js' : '.js');

/**
 * Check if the supplied file path is available i.e. does not exist.
 * Returns true or a string describing why the file path cannot be
 * used.
 *
 * @param filePath
 * @returns {(boolean|string)}
 */
const fileAvailable = (filePath) => {
  if (
    isInvalidPath(filePath) ||
    filePath.endsWith('/') ||
    filePath.endsWith('\\')
  ) {
    return `'${filePath}' is not a valid file path`;
  }

  if (filePath.startsWith('/') || filePath.startsWith('\\')) {
    return 'Specify a relative file path';
  }

  const jsPath = jsExtensionPath(filePath);

  if (fs.existsSync(jsPath)) {
    const stats = fs.statSync(jsPath);
    return stats.isDirectory()
      ? `'${jsPath}' is a directory`
      : `File '${jsPath}' already exists`;
  }

  return true;
};

/**
 * Given a destination path create the parent directories if they do
 * not exist.
 *
 * @param destination
 */
const sanitizeTemplateDestination = (destination) => {
  const parts = destination.split('/');

  parts.pop();

  if (parts.length) {
    const directory = parts.join('/');

    shell.mkdir('-p', directory);
  }
};

/**
 * Copy the correct supertest wrapper template based on the options specified
 * by the user.
 *
 * @param options
 */
const copyTemplate = (options) => {
  const { authOpt, esVersion, filePath } = options;

  const source = `${__dirname}/../assets/${authOpt}/${esVersion}.js`;

  const destination = jsExtensionPath(filePath);

  sanitizeTemplateDestination(destination);

  fs.copyFileSync(source, destination);
};

export { copyTemplate, fileAvailable };
