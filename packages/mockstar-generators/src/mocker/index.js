'use strict';

const path = require('path');
const yeoman = require('yeoman-environment');
const yeomanEnv = yeoman.createEnv();
const Promise = require('bluebird');

/**
 * 初始化一个 mocker
 */
function initMocker(opts = {}) {
    // generator 的名字
    const name = 'mocker';

    // generator 的目录
    const generatorPath = path.join(__dirname, './generator');

    // 注册 yeoman 插件
    yeomanEnv.register(require.resolve(generatorPath), name);

    // 运行脚手架
    return new Promise((resolve, reject) => {
        // 可以通过透传额外参数到 generator 中，然后通过 this.options 就能够取到传递过去的值
        let yeoResult = yeomanEnv.run(name, {
            'force-install': true,
            mockerOpts: opts
        }, err => {
            // console.log('=====end===', err);
            // 这里的 yeoResult 即 generator 的 this 对象，例如可以通过 result.destinationPath() 获得生成的地址
            if (err) {
                console.error('yeoman generator err', generatorPath, err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

initMocker({
    isDev: false,
    parentPath: '/Users/helinjiang/gitprojects-fis/mockstar/packages/mockstar-generators/test/tmp',
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
