'use strict';

const Promise = require('bluebird');
const colors = require('colors/safe');

const getStartArgs = require('./get-start-args');
const util = require('./util');

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);

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
        util.start(configOpts, function (err, config) {
            // 启动成功
            if (!err || err === true) {
                util.info('[i] MockStar start success!');

                util.info(util.getIpList().map(function (ip) {
                    return '       http://' + colors.bold(ip) + (configOpts.port ? ':' + configOpts.port : '');
                }).join('\n'));

                return resolve();
            }

            if (/listen EADDRINUSE/.test(err)) {
                util.error('[!] Failed to bind proxy port ' + (configOpts.port) + ': The port is already in use');
                util.info('[i] Please check if ' + configOpts.rootPath + ' is already running');
                util.info('    or if another application is using the port, you can change the port with mockstar start -p newPort\n');
            } else if (err.code == 'EACCES' || err.code == 'EPERM') {
                util.error('[!] Cannot start ' + configOpts.rootPath + ' owned by root');
                util.info('[i] Try to run command with `sudo`\n');
            }

            util.error(err.stack ? 'Date: ' + new Date().toLocaleString() + '\n' + err.stack : err);

            reject();
        });
    });
};
