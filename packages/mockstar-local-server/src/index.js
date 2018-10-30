const run = require('./run');
const runByPm2 = require('./run-by-pm2');

/**
 * 启动服务
 *
 * @param {Object} configOpts mockstar.config.js中的配置项
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 端口号
 * @param {String} [configOpts.name] pm2 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式，即不启用pm2
 */
function startServer(configOpts = {}) {
    // console.log('--startServer--', configOpts);

    if (configOpts.isDev) {
        run(configOpts);
    } else {
        runByPm2.start(configOpts);
    }
}

/**
 * 停止服务
 * @param {String} [name] 自定义的pm2服务名称
 */
function stopServer(name) {
    runByPm2.stop(name);
}

module.exports = {
    startServer: startServer,
    stopServer: stopServer
};