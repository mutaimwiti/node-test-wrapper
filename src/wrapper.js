const inquire = require('./inquirer');
const {copyTemplate} = require('./utils/file');
const {logInfo, logSuccess, logWarning} = require('./utils/message');

const run = () => {
  logInfo('Supertest wrapper interactive CLI');

  inquire()
    .then(response => {
      copyTemplate(response);
      logSuccess('Supertest wrapper was created generated');
    })
    .catch(() => {
      logWarning('Something went wrong - the wrapper was not generated. Please try again...');
    });
};

module.exports = run;
