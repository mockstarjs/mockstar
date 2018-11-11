'use strict';

const path = require('path');
const fs = require('fs');

const mockstarLocalServer = require('mockstar-local-server');

/**
 *
 * @param {Object} args 参数
 * @param {Boolean} [args.dev] 是否为开发者模式，使用方式: --dev
 * @param {String} [args.config] 自定义配置文件，使用方式: --config=mockstar.config.js
 * @param {Number} [args.port] 自定义服务启动端口，使用方式: --port=9527
 * @param {Number} [args.p] 自定义服务启动端口，使用方式: -p 9527
 * @param {String} [args.name] 自定义的pm2服务名称，使用方式: --name=mockstar_9527
 * @param {Boolean} [args.watch] 是否监听文件变化，只有在 pm2 场景下才有效，使用方式: --watch
 */
module.exports = function (args) {
    // console.log(args);
    // console.log(process.cwd());
    const cwd = process.cwd();

    // 是否为开发模式，此时使用 node 启动服务，否则使用 pm2 启动
    // mockstar start --dev
    const isDev = !!args.dev;

    // 自定义服务启动端口，
    // mockstar start --port=9527
    // mockstar start -p 9527
    const port = args.port || args.p;

    // 自定义的pm2服务名称
    // mockstar start --name=mockstar_9527
    const name = args.name;

    // 是否监听文件变化，只有在 pm2 场景下才有效
    const watch = args.watch;

    // 传递进来的文件，或者默认的 mockstar.config.js 文件
    // mockstar start --config=mockstar.config.js
    let config = args.config || 'mockstar.config.js';

    // 绝对路径
    let configAbsolutePath = path.resolve(cwd, config);

    // 一定要检查config文件是否存在
    if (fs.existsSync(configAbsolutePath)) {
        console.log('Load config file:', configAbsolutePath);
    } else {
        console.error('Unkown config file: ', configAbsolutePath);
        return null;
    }

    // 获取 mockstar.config.js 配置文件中的内容
    let mockstarConfig = require(configAbsolutePath);

    // 获取一些默认值
    return mockstarLocalServer.getLocalServerConfig(mockstarConfig, {
        port: port,
        name: name,
        cwd: cwd,
        isDev: isDev,
        watch: watch
    });
};
