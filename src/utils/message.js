const chalk = require('chalk');

const log = (color, message) => {
  console.log(chalk[color](message));
};

/**
 * Log info message.
 *
 * @param message
 */
const logInfo = message => {
  log('blue', message);
};

/**
 * Log success message.
 *
 * @param message
 */
const logSuccess = message => {
  log('green', message);
};

/**
 * Convert message to warning - red.
 *
 * @param message
 * @returns {*}
 */
const toWarning = message => {
  return chalk.red(message)
};

module.exports = {
  logInfo,
  toWarning,
  logSuccess,
};
