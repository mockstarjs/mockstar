import {startServer as Server} from 'mockstar-local-server';

/**
 * 启动服务
 *
 * @param {Object} configOpts 请求参数
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 本地服务的端口号
 * @param {String} [configOpts.name] 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式
 * @param {Boolean} [configOpts.watch] 是否启用监听
 * @param {Function} callback 回调函数，接受两个参数 isSuccess 和 localServerConfig
 */
export function startServer(
  configOpts = {rootPath: ''},
  callback?: (status: boolean, opt: any) => void,
) {
  return Server(configOpts, callback);
}
