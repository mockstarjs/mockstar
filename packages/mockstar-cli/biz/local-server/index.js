const run = require('./run');
const runByPm2 = require('./run-by-pm2');

const runConfig = require('./config');

/**
 * 启动服务
 *
 * @param {Boolean} isDev 是否为开发者模式
 * @param {String} configAbsolutePath mockstar.config.js 文件的绝对路径
 * @param {String} [cwd] 项目启动的目录，默认为 process.cwd()
 * @param {Object} [opts] 额外的高优先级的参数，用于覆盖 mockstarConfig 的值
 */
function startServer(isDev, configAbsolutePath, cwd, opts) {
    // 开发模式下，直接调用执行
    let mockstarConfig = require(configAbsolutePath);

    // 如果不定义 rootPath，则默认取 process.cwd()
    if (!mockstarConfig.rootPath) {
        mockstarConfig.rootPath = cwd || process.cwd();
    }

    // 获取一些默认值
    let configOpts = runConfig.getConfigOpts(mockstarConfig);

    // 如果没法获取配置项，则将无法启动成功
    if (!configOpts) {
        throw new Error('Invalid param!');
    }

    // 从该处传入的参数优先级最高，一般用于命令行传入
    if (opts) {
        configOpts = Object.assign({}, configOpts, opts);
    }

    if (isDev) {
        run(configOpts);
    } else {
        runByPm2(configOpts);
    }
}

module.exports = {
    startServer: startServer
};