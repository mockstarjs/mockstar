'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const Promise = require('bluebird');

/**
 *
 * @param {Object} args 参数
 */
module.exports = function (args) {
    // console.log(args);
    // console.log(process.argv);
    // console.log(process.argv.slice(3));

    const runPm2 = spawn('node', [
        path.join(__dirname, '../../../node_modules/.bin/pm2')
    ].concat(process.argv.slice(3)));

    // 打印输出
    let output = '';

    // 成功信息
    runPm2.stdout.on('data', (data) => {
        output += data;
    }).pipe(process.stdout);

    // 异常信息
    runPm2.stderr.on('data', (data) => {
        output += data;
    }).pipe(process.stderr);

    // 运行结束
    runPm2.on('close', (code) => {
        // console.log({ code: code, data: output });
    });

    return Promise.resolve();
};
