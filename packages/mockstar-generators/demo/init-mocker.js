const path = require('path');
const { initMocker } = require('../lib');

const fse = require('fs-extra');
fse.removeSync(path.join(__dirname, '../test/tmp'));

(async () => {
  await initMocker({
    isDev: false,
    parentPath: path.join(__dirname, '../test/tmp'),
    isInitReadme: true,
    config: {
      name: 'i-am-xhr-request-get',
      method: 'get',
      route: '/cgi-bin/i-am-xhr-request-get',
    },
    debugMockModuleJsonData: {
      retcode: 0,
      result: {
        uid: 99999,
        type: 9,
        description: '我是 debug',
        other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
      },
    },
  });
})();
