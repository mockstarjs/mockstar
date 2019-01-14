module.exports = class MockerConfig {
    constructor(opts = {}) {
        this.isDev = opts.isDev || false;
        this.parentPath = opts.parentPath || '';

        this.config = opts.config || {};
    }
};

let a = {
    isDev: true,
    mockerParentPath: '/Users/helinjiang/gitprojects-fis/mockstar/packages/mockstar-generators/test/tmp',
    mockerConfig: {
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
};