const inquire = require('./inquirer');
const {copyTemplate} = require('./utils/file');
const {logInfo, logSuccess} = require('./utils/message');

const run = async () => {
  logInfo('Supertest wrapper interactive CLI');

  const response = await inquire();

  copyTemplate(response);

  logSuccess('Supertest wrapper was created generated');
};

module.exports = run;
