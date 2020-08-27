const path = require('path');
const { initProject } = require('../lib');
const fse = require('fs-extra');
fse.removeSync(path.join(__dirname, '../test/tmp'));

initProject({
  isDev: false,
  parentPath: path.join(__dirname, '../test/tmp'),
  name: 'mockstar-app',
  port: 9527,
});
