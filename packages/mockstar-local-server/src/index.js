const run = require('./run');
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
 */
function startServer(configOpts = {}) {
    // 获取标准的参数
    configOpts = runConfig.getConfigOpts(configOpts);

    // 启动服务
    run(configOpts);
}

module.exports = {
    startServer: startServer
};