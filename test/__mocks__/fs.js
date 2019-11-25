const fs = jest.genMockFromModule('fs');

fs.copyFileSync = jest.fn();

module.exports = fs;
