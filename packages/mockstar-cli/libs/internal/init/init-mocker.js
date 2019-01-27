const initMocker = require('../../../biz/generators/mocker');

/**
 * 初始化一个 mocker
 */
module.exports = function (args) {
    // initMocker({
    //     isDev: false,
    //     parentPath: path.join(__dirname, '../test/tmp'),
    //     isInitReadme: true,
    //     config: {
    //         description: '我是一句话描述',
    //         disable: false,
    //         method: 'get',
    //         name: 'getName',
    //         plugin: 'xhr',
    //         priority: 1,
    //         route: '/cgi-bin/getName',
    //         routeExtra: '',
    //         tags: []
    //     }
    // });

    let options = {
        isDev: !!args.dev,
        cwd: process.cwd()
    };

    return new Promise((resolve, reject) => {
        initMocker(options, (isSuccess, data) => {
            isSuccess ? resolve() : reject();
        });
    });
};
