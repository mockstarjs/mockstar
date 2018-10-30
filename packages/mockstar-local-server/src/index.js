const run = require('./run');
const utilsPort = require('./utils/port');
const utilsMockstar = require('./utils/mockstar');
const runConfig = require('./config');

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
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式
 * @param {Function} callback 回调函数
 */
function startServer(configOpts = {}, callback) {
    // 获取标准的参数
    configOpts = runConfig.getConfigOpts(configOpts);

    if (!configOpts) {
        throw new Error('CAN NOT get configOpts!');
    }

    // 启动服务
    return run(configOpts, callback);
}

module.exports = {
    startServer: startServer,
    findAvailablePort: utilsPort.findAvailablePort,
    getConfigOpts: runConfig.getConfigOpts,
    getMockServerPath: utilsMockstar.getMockServerPath,
    getBuildPath: utilsMockstar.getBuildPath
};