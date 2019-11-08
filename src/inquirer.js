const inquirer = require('inquirer');
const {toWarning} = require('./utils/message');
const {fileAvailable} = require('./utils/file');

const questions = [
  {
    name: 'esVersion',
    type: 'list',
    message: 'Which version of javascript do you want to generate?',
    choices: ['es5', 'es6'],
  },
  {
    name: 'authOpt',
    type: 'list',
    message: 'Which type of authentication does your app use?',
    choices: ['no-auth', 'basic-auth', 'token-auth', 'session-auth'],
  },
  {
    name: 'filePath',
    type: 'input',
    default: 'test/app.js',
    message: 'Specify file path for the generated supertest wrapper?',
    filter: (input) => {
      return input.trim();
    },
    validate: (input) => {
      const available = fileAvailable(input);

      return !input ? false : (available === true ? true : toWarning(available));
    }
  },
];

const inquire = () => {
  return inquirer.prompt(questions);
};

module.exports = inquire;
