import _ from 'lodash';
import { LocalServerConfig } from './LocalServerConfig';
import { LocalServerConfigOpt } from '../types';

/**
 * @param {Object} opts 额外的一些参数
 * @param {String} [opts.cwd] 当前执行node的路径
 * @param {Number} [opts.port] 端口号
 * @param {String} [opts.name] 应用的名字
 * @param {Boolean} [opts.isDev] 当前是否为开发模式
 * @param {Boolean} [opts.watch] 是否监听文件变化
 */
interface GetConfigOpt {
  cwd?: string;
  port?: number;
  name?: string;
  isDev?: boolean;
  watch?: boolean;
}

/**
 * 获取最终的配置数据
 *
 * @param configOpts 对象
 * @param opts 额外的选项
 * @returns {LocalServerConfig}
 */
export function getLocalServerConfig(
  configOpts: LocalServerConfigOpt = { rootPath: '' },
  opts: GetConfigOpt = {},
) {
  // 注意要用 _.merge，因为 Object.assign 会将 undefined 属性值也拷贝过去
  const localServerConfig = new LocalServerConfig(_.merge({}, configOpts, opts));

  if (!localServerConfig.isValid()) {
    return null;
  }

  return localServerConfig;
}
