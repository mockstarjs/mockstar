const path = require('path');

/**
 * mockstar 的配置，https://mockstarjs.github.io/mockstar/api/mockstar-config.html
 */
module.exports = {
  rootPath: __dirname,
  mockServerPath: path.resolve(__dirname, './mock_server'),
  port: 9420
};
