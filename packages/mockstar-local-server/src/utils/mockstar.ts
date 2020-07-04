import path from 'path';

/**
 * 获得 mock server 的根目录绝对路径
 *
 * @param {String} rootPath 项目根目录
 * @param {String} mockServerPath
 * @returns {String}
 */
export function getMockServerPath(rootPath: string, mockServerPath?: string) {
  let result = mockServerPath || './src';

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
export function getBuildPath(rootPath: string, buildPath?: string) {
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
export function getLogPath(rootPath: string, buildPath: string, logPath?: string) {
  let result = logPath || path.join(buildPath, 'logs');

  if (!path.isAbsolute(result)) {
    result = path.resolve(rootPath, result);
  }

  return result;
}
