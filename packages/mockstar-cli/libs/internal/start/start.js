'use strict';

const path = require('path');
const Promise = require('bluebird');
const colorsLog = require('../../utils/colorsLog');
const stating = require('../../utils/stating');

const getStartArgs = require('./get-start-args');

// 启动脚本路径
const BOOTSTRAP_PATH = path.join(__dirname, 'start-by-cp.js');

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);
    const self = this;

    // 获取参数
    let configOpts = getStartArgs(args);

    if (!configOpts) {
        return Promise.reject('configOpts is null');
    }

    // 启动本地服务
    if (configOpts.isDev) {
        console.log('Ready to start local server!', configOpts);
    }

    return new Promise((resolve, reject) => {
        stating.start(configOpts, [BOOTSTRAP_PATH], function (err, config) {
            // 启动成功
            if (!err || err === true) {
                colorsLog.info(`[i] MockStar@${self.version} is running for ${configOpts.rootPath}`);

                colorsLog.info(stating.getIpList().map(function (ip) {
                    return '       http://' + colorsLog.colors.bold(ip) + (configOpts.port ? ':' + configOpts.port : '');
                }).join('\n'));

                if (configOpts.isDev) {
                    colorsLog.info('[i] pid=' + config.pid);
                }

                return resolve();
            }

            if (/listen EADDRINUSE/.test(err)) {
                colorsLog.error('[!] Failed to bind proxy port ' + (configOpts.port) + ': The port is already in use');
                colorsLog.info('[i] Please check if ' + configOpts.rootPath + ' is already running');
                colorsLog.info('    or if another application is using the port, you can change the port with mockstar start -p newPort\n');
            } else if (err.code == 'EACCES' || err.code == 'EPERM') {
                colorsLog.error('[!] Cannot start ' + configOpts.rootPath + ' owned by root');
                colorsLog.info('[i] Try to run command with `sudo`\n');
            }

            colorsLog.error(err.stack ? 'Date: ' + new Date().toLocaleString() + '\n' + err.stack : err);

            reject();
        });
    });
};
