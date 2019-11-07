const inquire = require('./inquirer');
const {copyTemplate} = require('./utils/file');

const run = async () => {
  const {version, auth, filePath} = await inquire();

  copyTemplate(auth, version, filePath);

  console.log(`Supertest wrapper was created successfully`);
};

module.exports = run;
