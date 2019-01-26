'use strict';

const Promise = require('bluebird');

const localServer = require('../../../biz/local-server');
const getRunArgs = require('./get-run-args');

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);

    // 获取参数
    let configOpts = getRunArgs(args);

    if (!configOpts) {
        return Promise.reject();
    }

    // 启动本地服务
    if (configOpts.isDev) {
        console.log('Ready to start local server!', configOpts);
    }

    return new Promise((resolve, reject) => {
        localServer.startServer(configOpts, () => {
            resolve();
        });
    });
};
