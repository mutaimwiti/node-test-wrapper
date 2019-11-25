const shell = jest.genMockFromModule('shelljs');

shell.mkdir = jest.fn();

module.exports = shell;
