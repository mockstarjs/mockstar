const _ = require('lodash');
const MockStarConfig = require('./MockStarConfig');

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
 * @param {String} [configOpts.namespace] 命名空间
 * @param {Object} opts 额外的一些参数
 * @param {String} [opts.cwd] 当前执行node的路径
 * @param {Number} [opts.port] 端口号
 * @param {String} [opts.name] pm2 应用的名字
 * @param {Boolean} [opts.isDev] 当前是否为开发模式
 * @param {Boolean} [opts.watch] 是否监听文件变化，只有在 pm2 场景下才有效
 * @returns {MockStarConfig}
 */
function getMockStarConfig(configOpts = {}, opts = {}) {
    // 注意要用 _.merge，因为 Object.assign 会将 undefined 属性值也拷贝过去
    let mockStarConfig = new MockStarConfig(_.merge({}, configOpts, opts));

    if (!mockStarConfig.isValid()) {
        return null;
    }

    return mockStarConfig;
}

module.exports = {
    getMockStarConfig: getMockStarConfig
};