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
            if (isPidRunning) {
                stating.showRunningStatus(self.version, config, true);
            } else {
                colorsLog.info(`[i] MockStar@${self.version} is not running!`);
            }

            resolve();
        });
    });
};
