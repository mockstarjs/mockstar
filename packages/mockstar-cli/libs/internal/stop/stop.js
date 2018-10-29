'use strict';

const Promise = require('bluebird');

const localServer = require('../../../biz/local-server');

/**
 *
 * @param {Object} args 参数
 * @param {Array} [args._] 参数数组，取第一个值为 pm2 服务的名称
 */
module.exports = function (args) {
    // console.log(args._[0]);

    // 自定义的pm2服务名称
    // mockstar stop mockstar_9527
    const name = args._[0] || 'mockstar_9527';

    // 停止本地服务
    console.log('Ready to stop local server which app_name = ' + name);
    localServer.stopServer(name);

    return Promise.resolve();
};
