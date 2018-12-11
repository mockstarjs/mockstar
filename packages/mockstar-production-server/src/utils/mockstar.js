const path = require('path');

/**
 * 获得 mock server 的根目录绝对路径
 *
 * @param {String} rootPath 项目根目录
 * @param {String} mockServerPath
 * @returns {String}
 */
function getMockServerPath(rootPath, mockServerPath) {
    let result = mockServerPath || './mock_server';

    if (!path.isAbsolute(result)) {
        result = path.resolve(rootPath, result);
    }

    return result;
}

/**
 * 获得 mock server 的构建之后的根目录绝对路径
 * @param {String} rootPath 项目根目录
 * @param {String} buildPath
 * @returns {String}
 */
function getBuildPath(rootPath, buildPath) {
    let result = buildPath || './build';

    if (!path.isAbsolute(result)) {
        result = path.resolve(rootPath, result);
    }

    return result;
}

/**
 * 获得 mock server 的日志路径
 * @param {String} rootPath 项目根目录
 * @param {String} buildPath 构建目录
 * @param {String} logPath
 * @returns {String}
 */
function getLogPath(rootPath, buildPath, logPath) {
    let result = logPath || path.join(buildPath, 'logs');

    if (!path.isAbsolute(result)) {
        result = path.resolve(rootPath, result);
    }

    return result;
}

module.exports = {
    getMockServerPath: getMockServerPath,
    getBuildPath: getBuildPath,
    getLogPath: getLogPath
};