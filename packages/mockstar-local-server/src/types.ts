import express from 'express';
import {Parser} from 'mockstar';

/**
 * 配置项
 * @param [rootPath] 项目根目录
 * @param [buildPath] 构建之后的目录
 * @param [logPath] 日志目录
 * @param [mockServerPath]  mock server 根目录
 * @param [port] 端口号
 * @param [name] 应用的名字，用于标识一个服务，停止服务或者 pm2 启动的时候来命名
 * @param [isDev] 当前是否为开发模式
 * @param [watch] 是否监听文件变化，推荐本地开发模式下使用
 * @param [namespace] 命名空间
 * @param [staticBasePath] 静态资源的基础路径，默认为 /
 */
export interface LocalServerConfigOpt {
  rootPath: string;
  buildPath?: string;
  logPath?: string;
  mockServerPath?: string;
  port?: number;
  name?: string;
  isDev?: boolean;
  watch?: boolean;
  namespace?: string;
  staticBasePath?: string;
}

export interface Router extends express.Router {
  _mockerParser: Parser;
}
