const fs = require('fs');

/**
 * 获取最终的配置数据
 *
 * @param {Object} configOpts mockstar.config.js中的配置项
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 端口号
 * @param {String} [configOpts.name] pm2 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式
 * @param {Boolean} [configOpts.watch] 是否监听文件变化，只有在 pm2 场景下才有效
 * @param {Object} opts 额外的一些参数
 * @param {String} [opts.cwd] 当前执行node的路径
 * @param {Number} [opts.port] 端口号
 * @param {String} [opts.name] pm2 应用的名字
 * @param {Boolean} [opts.isDev] 当前是否为开发模式
 * @param {Boolean} [opts.watch] 是否监听文件变化，只有在 pm2 场景下才有效
 * @returns {Object}
 */
function getConfigOpts(configOpts = {}, opts = {}) {
    // 如果没有 rootPath，则将无法启动成功
    configOpts.rootPath = configOpts.rootPath || opts.cwd;

    if (!configOpts.rootPath || !fs.existsSync(configOpts.rootPath)) {
        console.error('UNKNOWN rootPath=' + configOpts.rootPath, configOpts, opts);
        throw new Error('UNKNOWN rootPath=' + configOpts.rootPath);
    }

    // mocker 的配置项，设置一些默认值
    // TODO 支持 definedMockers
    // if (configOpts.mocker) {
    //     configOpts.mocker = Object.assign({
    //         // 外部 mocker 列表，比如引入npm包或者其他目录下的 mocker
    //         definedMockers: []
    //     }, configOpts.mocker);
    // }

    // mockstar 启动之后的服务端口号，默认为 9527
    configOpts.port = configOpts.port || opts.port || 9527;

    // pm2 应用的名字
    configOpts.name = configOpts.name || opts.name || `mockstar_${configOpts.port}`;

    // 当前是否为开发模式
    configOpts.isDev = configOpts.isDev || opts.isDev || false;

    // 是否监听文件变化，只有在 pm2 场景下才有效
    configOpts.watch = configOpts.watch || opts.watch || false;

    return configOpts;
}

module.exports = {
    getConfigOpts: getConfigOpts
};