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

module.exports = {
    getMockServerPath: getMockServerPath,
    getBuildPath: getBuildPath
};