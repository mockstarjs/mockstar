import path from 'path';
import fs from 'fs';
import { getLocalServerConfig } from 'mockstar-local-server';

interface GetArgsOpts {
  dev?: boolean;
  port?: number;
  p?: number;
  name?: string;
  watch?: boolean;
  config?: string;
}

/**
 *
 * @param {Object} args 参数
 * @param {Boolean} [args.dev] 是否为开发者模式，使用方式: --dev
 * @param {String} [args.config] 自定义配置文件，使用方式: --config=mockstar.config.js
 * @param {Number} [args.port] 自定义服务启动端口，使用方式: --port=9527
 * @param {Number} [args.p] 自定义服务启动端口，使用方式: -p 9527
 * @param {String} [args.name] 自定义的服务名称，使用方式: --name=mockstar_9527
 * @param {Boolean} [args.watch] 是否监听文件变化，使用方式: --watch
 */
export default function (args: GetArgsOpts = {}) {
  // console.log(args);
  // console.log(process.cwd());
  const cwd = process.cwd();

  // 是否为开发模式
  // mockstar start --dev
  const isDev = !!args.dev;

  // 自定义服务启动端口，
  // mockstar start --port=9527
  // mockstar start -p 9527
  const port = args.port || args.p;

  // 自定义的服务名称
  // mockstar start --name=mockstar_9527
  const name = args.name;

  // 是否监听文件变化
  const watch = args.watch;

  // 传递进来的文件，或者默认的 mockstar.config.js 文件
  // mockstar start --config=mockstar.config.js
  const config = args.config || 'mockstar.config.js';

  // 绝对路径
  const configAbsolutePath = path.resolve(cwd, config);

  // 一定要检查config文件是否存在
  if (fs.existsSync(configAbsolutePath)) {
    console.log('Load config file:', configAbsolutePath);
  } else {
    console.error('Unkown config file: ', configAbsolutePath);
    return null;
  }

  // 获取 mockstar.config.js 配置文件中的内容
  const mockstarConfig = require(configAbsolutePath);

  // 获取一些默认值
  return getLocalServerConfig(mockstarConfig, {
    port: port,
    name: name,
    cwd: cwd,
    isDev: isDev,
    watch: watch,
  });
}
