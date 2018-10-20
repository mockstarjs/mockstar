const path = require('path');

module.exports = {
  rootPath: __dirname,
  buildPath: path.resolve(__dirname, './build'),
  logPath: path.resolve(__dirname, './build/logs'),
  mockServerPath: path.resolve(__dirname, '../../../../mockstar/test/data/fixtures/mock_server/mockers')
};
