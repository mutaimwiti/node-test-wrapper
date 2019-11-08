const inquire = require('./inquirer');
const {copyTemplate} = require('./utils/file');

const run = async () => {
  const response = await inquire();

  copyTemplate(response);

  console.info(`Supertest wrapper was created successfully`);
};

module.exports = run;
