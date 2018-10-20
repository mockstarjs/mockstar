'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const fse = require('fs-extra');

// const localServer = require('../../../business/local-server');

/**
 *
 * @param {Object} args 参数
 * @param {Boolean} [args.dev] 是否为开发者模式，使用方式: --dev
 * @param {String} [args.config] 自定义配置文件，使用方式: --config=mockstar.config.js
 */
module.exports = function (args) {
    // console.log(args);
    // console.log(process.cwd());
    const cwd = process.cwd();

    // 是否为开发模式，此时使用 node 启动服务，否则使用 pm2 启动
    // mockstar start --dev
    const isDev = !!args.dev;

    // 传递进来的文件，或者默认的 mockstar.config.js 文件
    let config = args.config || 'mockstar.config.js';

    // 绝对路径
    let configAbsolutePath = path.resolve(cwd, config);

    // 一定要检查config文件是否存在
    if (fs.existsSync(configAbsolutePath)) {
        console.log('Load config file:', configAbsolutePath);
    } else {
        console.error('Unkown config file: ', configAbsolutePath);
        return Promise.reject();
    }

    // 启动本地服务
    // localServer.startServer(isDev, configAbsolutePath, cwd);
    console.log('Ready to start local server!');

    return Promise.resolve();
};
