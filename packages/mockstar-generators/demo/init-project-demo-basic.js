const path = require('path');
const { initProject } = require('../lib');
const fse = require('fs-extra');
fse.removeSync(path.join(__dirname, 'basic'));

(async () => {
  await initProject({
    isDev: false,
    // force: true,
    parentPath: path.join(__dirname),
    name: 'basic',
    port: 9527,
    // autoInstall: true,
  });
})();
