const fs = require('fs');
const shell = require('shelljs');

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

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    return stats.isDirectory() ? `'${filePath}' is a directory` : `File '${filePath}' already exists`;
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

  sanitizeTemplateDestination(destination);

  fs.copyFileSync(source, destination);
};

module.exports = {
  fileAvailable,
  copyTemplate,
};
