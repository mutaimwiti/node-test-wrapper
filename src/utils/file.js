const fs = require('fs');
const shell = require('shelljs');

/**
 * Append a '.js' extension to the supplied file path if it does not have one.
 * If it has a '.js' extension it is returned unaltered. If it ends with '.',
 * 'js' is appended. Otherwise, '.js' is appended.
 *
 * @param filePath
 * @returns {string}
 */
const jsExtensionPath = (filePath) => {
  return filePath.endsWith('.js') ?
    filePath : filePath + (filePath.endsWith('.') ? 'js' : '.js');
};

/**
 * Check if the supplied file path is available i.e. does not exist.
 * Returns true or a string describing why it is not compatible.
 *
 * @param filePath
 * @returns {(boolean|string)}
 */
const fileAvailable = filePath => {
  if (filePath.startsWith('/')) {
    return `Specify a relative file path`;
  }

  if (filePath.endsWith('/')) {
    return `'${filePath}' is not a valid file path`;
  }

  const jsPath = jsExtensionPath(filePath);

  if (fs.existsSync(jsPath)) {
    const stats = fs.statSync(jsPath);
    return stats.isDirectory() ? `'${jsPath}' is a directory` : `File '${jsPath}' already exists`;
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
 *
 * @param authType
 * @param es6Version
 * @param destination
 */
const copyTemplate = (authType, es6Version, destination) => {
  const source = __dirname + `/../assets/${authType}/${es6Version}.js`;

  destination = jsExtensionPath(destination);

  sanitizeTemplateDestination(destination);

  fs.copyFileSync(source, destination);
};

module.exports = {
  copyTemplate,
  fileAvailable,
};
