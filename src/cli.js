const {fileAvailable} = require('./utils/file');

const cli = [
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
    default: 'tests/app.js',
    message: 'Specify file path for the generated supertest wrapper?',
    validate: (input) => {
      const available = fileAvailable(input);

      return !(input.trim()) ? false : (available === true ? true : available);
    }
  },
];

module.exports = cli;
