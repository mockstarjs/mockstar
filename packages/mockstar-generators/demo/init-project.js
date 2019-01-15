const path = require('path');
const { initProject } = require('../src');

initProject({
    isDev: false,
    parentPath: path.join(__dirname, '../test/tmp'),
    name: 'mockstar-app',
    port: 9527,
});
