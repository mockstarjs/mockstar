'use strict';

const Promise = require('bluebird');

const localServer = require('../../../biz/local-server');
const getStartArgs = require('./get-start-args');

/**
 *
 * @param {Object} args 参数
 * @param {Boolean} [args.dev] 是否为开发者模式，使用方式: --dev
 * @param {String} [args.config] 自定义配置文件，使用方式: --config=mockstar.config.js
 * @param {Number} [args.port] 自定义服务启动端口，使用方式: --port=9527
 * @param {Number} [args.p] 自定义服务启动端口，使用方式: -p 9527
 * @param {String} [args.name] 自定义的pm2服务名称，使用方式: --name=mockstar_9527
 */
module.exports = function (args) {
    // console.log(args);

    // 获取参数
    let configOpts = getStartArgs(args);

    if (!configOpts) {
        return Promise.reject();
    }

    // 启动本地服务
    console.log('Ready to start local server!', configOpts);
    return new Promise((resolve, reject) => {
        localServer.startServer(configOpts, () => {
            resolve();
        });
    });
};
