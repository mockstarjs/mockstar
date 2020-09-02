const path = require('path');
const { initProject } = require('../lib');
const fse = require('fs-extra');
fse.removeSync(path.join(__dirname, '../test/tmp'));

(async () => {
  await initProject({
    isDev: false,
    // force: true,
    parentPath: path.join(__dirname, '../test/tmp'),
    name: 'mockstar-app',
    port: 9527,
    // autoInstall: true,
    readmeDesc: `
本项目是由 [create-mockstar-app](https://www.npmjs.com/package/create-mockstar-app) 的基础模板初始化生成，相应的初始化命令如下：

\`\`\`
$ npx create-mockstar-app mockstar-app 
\`\`\`
`,
  });
})();
