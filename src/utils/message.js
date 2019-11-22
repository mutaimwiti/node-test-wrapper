import chalk from 'chalk';

const log = (color, message) => {
  // eslint-disable-next-line no-console
  console.log(chalk[color](message));
};

/**
 * Log info message.
 *
 * @param message
 */
const logInfo = (message) => {
  log('blueBright', message);
};

/**
 * Log warning message.
 *
 * @param message
 */
const logWarning = (message) => {
  log('red', message);
};

/**
 * Log success message.
 *
 * @param message
 */
const logSuccess = (message) => {
  log('green', message);
};

/**
 * Convert message to warning - red.
 *
 * @param message
 * @returns {*}
 */
const toWarning = (message) => chalk.red(message);

export { logInfo, toWarning, logWarning, logSuccess };
