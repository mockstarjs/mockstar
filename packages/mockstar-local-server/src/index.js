const run = require('./run');
const utilsPort = require('./utils/port');
const utilsMockstar = require('./utils/mockstar');
const runConfig = require('./config');

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
    // 获取标准的参数
    const mockStarConfig = runConfig.getLocalServerConfig(configOpts);

    if (!mockStarConfig) {
        throw new Error('CAN NOT get mockStarConfig!');
    }

    // 启动服务
    return run(mockStarConfig, callback);
}

module.exports = {
    startServer: startServer,
    findAvailablePort: utilsPort.findAvailablePort,
    getLocalServerConfig: runConfig.getLocalServerConfig,
    getMockServerPath: utilsMockstar.getMockServerPath,
    getBuildPath: utilsMockstar.getBuildPath,
    getLogPath: utilsMockstar.getLogPath
};