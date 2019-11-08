import inquirer from "inquirer";
import {toWarning} from "./utils/message";
import {fileAvailable} from "./utils/file";


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

/**
 * @returns {Promise}
 */
const inquire = () => {
  return inquirer.prompt(questions);
};

export default inquire;
