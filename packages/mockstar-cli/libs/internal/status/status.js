'use strict';

const Promise = require('bluebird');

const colorsLog = require('../../utils/colorsLog');
const stating = require('../../utils/stating');

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);
    const self = this;

    return new Promise((resolve, reject) => {
        stating.getStatus(function (isPidRunning, config) {
            // 启动成功
            if (isPidRunning) {
                colorsLog.info(`[i] MockStar@${self.version} is running for ${config.options.rootPath}`);

                colorsLog.info(stating.getIpList().map(function (ip) {
                    return '       http://' + colorsLog.colors.bold(ip) + (config.options.port ? ':' + config.options.port : '');
                }).join('\n'));

                colorsLog.info('\n' + JSON.stringify(config, null, 2));
            } else {
                colorsLog.info(`[i] MockStar@${self.version} is not running!`);
            }

            resolve();
        });
    });
};
