'use strict';

const Promise = require('bluebird');

const localServer = require('../../../biz/local-server');

/**
 *
 * @param {Object} args 参数
 * @param {Boolean} [args.name] 应用名字，使用方式: --name=mockstar-app
 */
module.exports = function (args) {
    // console.log(args);

    // 停止本地服务
    console.log('Ready to stop local server!');
    localServer.stopServer();

    return Promise.resolve();
};
