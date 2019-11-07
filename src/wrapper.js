const inquirer = require('inquirer');

const questions = require('./cli');
const {copyTemplate} = require('./utils/file');

const run = async () => {
  const response = await inquirer.prompt(questions);

  const {version, auth, filePath} = response;

  copyTemplate(auth, version, filePath);

  console.log(`Supertest wrapper was created successfully`);
};

module.exports = run;
