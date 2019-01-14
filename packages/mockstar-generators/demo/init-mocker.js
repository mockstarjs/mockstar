const path = require('path');
const { initMocker } = require('../src');

initMocker({
    isDev: false,
    parentPath: path.join(__dirname, '../test/tmp'),
    config: {
        description: '我是一句话描述',
        disable: false,
        method: 'get',
        name: 'getName',
        plugin: 'xhr',
        priority: 1,
        route: '/cgi-bin/getName',
        routeExtra: '',
        tags: []
    }
});