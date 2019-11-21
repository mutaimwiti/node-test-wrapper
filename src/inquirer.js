import inquirer from 'inquirer';
import { toWarning } from './utils/message';
import { fileAvailable } from './utils/file';

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
    choices: ['none', 'basic', 'token', 'session'],
  },
  {
    name: 'filePath',
    type: 'input',
    default: 'test/utils/app.js',
    message: 'Specify file path for the generated supertest wrapper?',
    filter: (input) => input.trim(),
    validate: (input) => {
      if (!input) {
        return false;
      }

      const available = fileAvailable(input);

      return available === true ? available : toWarning(available);
    },
  },
];

/**
 * @returns {Promise}
 */
const inquire = () => inquirer.prompt(questions);

export default inquire;
