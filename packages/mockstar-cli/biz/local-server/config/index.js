const fs = require('fs');
const path = require('path');

/**
 * 获取最终的配置数据
 *
 * @param {Object | String} opts 用户传递过来的参数
 * @param {String} [opts.rootPath] 项目根目录
 * @param {String} [opts.buildPath] 构建之后的目录
 * @param {String} [opts.logPath] 日志目录
 * @param {String} [opts.mockServerPath]  mock server 根目录
 *
 * @returns {Object}
 */
function getConfigOpts(opts) {
    let configOpts;

    try {
        // opts 如果是字符串则认为是文件路径，可将配置项放在独立的配置文件中
        if (typeof opts === 'string' && fs.existsSync(opts)) {
            configOpts = require(opts);
        } else if (opts && (typeof opts === 'object')) {
            configOpts = opts;
        } else {
            configOpts = null;
        }
    } catch (e) {
        console.error('getConfigOpts catch e:', e);
    }

    // 必须要存在配置
    if (!configOpts) {
        console.error('Could not get configOpts!', opts);
        return null;
    }

    // 如果没有 rootPath，则将无法启动成功
    if (!configOpts.rootPath) {
        console.error('Should define rootPath!', opts, configOpts);
        return null;
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
    configOpts.port = configOpts.port || 9527;

    return configOpts;
}

module.exports = {
    getConfigOpts: getConfigOpts
};