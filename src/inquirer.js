const inquirer = require('inquirer');
const {fileAvailable} = require('./utils/file');

const questions = [
  {
    name: 'version',
    type: 'list',
    message: 'Which version of javascript do you want generated?',
    choices: ['es5', 'es6'],
  },
  {
    name: 'auth',
    type: 'list',
    message: 'Which type of authentication does your app use?',
    choices: ['no-auth', 'basic-auth', 'token-auth', 'session-auth'],
  },
  {
    name: 'filePath',
    type: 'input',
    default: 'test/app.js',
    message: 'Specify file path for the generated supertest wrapper?',
    validate: (input) => {
      const available = fileAvailable(input);

      return !(input.trim()) ? false : (available === true ? true : available);
    }
  },
];

const inquire = () => {
  return inquirer.prompt(questions);
};

module.exports = inquire;
