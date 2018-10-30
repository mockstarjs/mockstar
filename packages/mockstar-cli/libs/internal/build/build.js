'use strict';

const Promise = require('bluebird');

const localServer = require('../../../biz/local-server');
const getStartArgs = require('../start/get-start-args');

/**
 *
 * 这里的 build 操作主要是为了：
 *
 * 1. 生成 pm2.json 文件
 * 2. 对 mockers 中的文件进行 babel 处理
 *
 * @param {Object} args 详见 start 命令中需要的参数，保持一致
 */
module.exports = function (args) {
    // console.log(args);

    // 获取参数
    let configOpts = getStartArgs(args);

    if (!configOpts) {
        return Promise.reject();
    }

    // 构建本地服务
    console.log('Ready to build local server!', configOpts);
    return localServer.buildPm2(configOpts);
};
