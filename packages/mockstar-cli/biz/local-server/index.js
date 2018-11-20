const mockstarLocalServer = require('mockstar-local-server');
const runByPm2 = require('./run-by-pm2');

/**
 * 启动服务
 *
 * @param {Object} configOpts 请求参数
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 本地服务的端口号
 * @param {String} [configOpts.name] pm2 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式
 * @param {Boolean} [configOpts.watch] 是否启用监听
 * @param {Function} callback 回调函数，接受两个参数 isSuccess 和 localServerConfig
 */
function startServer(configOpts = {}, callback) {
    return mockstarLocalServer.startServer(configOpts, callback);

    // if (configOpts.isDev) {
    //     return mockstarLocalServer.startServer(configOpts, callback);
    // } else {
    //     runByPm2.start(configOpts, callback);
    // }
}

/**
 * 停止服务
 *
 * @param {String} [name] 自定义的pm2服务名称
 * @param {Function} callback 回调函数
 */
function stopServer(name, callback) {
    runByPm2.stop(name, callback);
}

module.exports = {
    startServer: startServer,
    stopServer: stopServer,
    buildPm2: runByPm2.build
};