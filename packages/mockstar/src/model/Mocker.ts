import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fsHandler from 'fs-handler';

import MockerConfig, {MockerConfigOpt} from './MockerConfig';
import MockModule from './MockModule';
import {FSHandlerItem} from '../types';
import {MOCK_MODULES} from '../config';
import {requireModule} from '../file';

/**
 * config 定义
 * 主要拓展 name 属性
 */
interface Config extends MockerConfigOpt {
  name?: string;
}

/**
 * 初始化参数
 * @member watch 是否启动监控
 */
interface InitOpts {
  watch?: boolean;
}

export default class Mocker {
  basePath: string;
  watch: boolean;
  name: string;
  config: MockerConfig | undefined;
  mockModuleList: MockModule[];

  /**
   * 构造函数
   *
   * @param {String} basePath mocker 的绝对路径
   */
  constructor(basePath: string) {
    this.basePath = basePath;
    this.watch = false;
    this.name = '';
    this.mockModuleList = [];
  }

  /**
   * 初始化
   * @param {Object} [opts] 参数
   * @param {Boolean} [opts.watch] 是否启用 watch
   */
  init(opts: InitOpts = {}): void {
    this.watch = !!opts.watch;

    // config.json 的内容
    const config = requireModule(path.join(this.basePath, './config'), this.watch) as Config;

    // 优先使用 config.name，其次是模块的文件夹名
    this.name = config.name || path.basename(this.basePath);

    // mock module 配置列表
    this.mockModuleList = this.getMockModuleList();

    // mocker config 配置参数
    this.config = new MockerConfig(this.name, config, this.mockModuleList);
  }

  /**
   * 更新配置
   * @param {Object} opts
   */
  updateConfig(opts: MockerConfigOpt): void {
    this.config = _.merge({}, this.config, opts);
  }

  private getMockModuleList() {
    const mockModuleList: MockModule[] = [];

    // 1. 获取所有的 mock module，约定：this.basePath/MOCK_MODULES 的每个直接子文件或者直接子目录，都是一个 mock module
    fsHandler.search
      .getAll(this.basePath, {globs: [MOCK_MODULES + '/*']})
      .forEach((item: FSHandlerItem) => {
        // 模块名字，默认取文件夹或文件名
        let name = path.basename(item.relativePath, '.js');

        // 注意也可能是 json 文件
        name = path.basename(name, '.json');

        // console.log('\n找到 mock module ：', name, item);

        const requireModulePath = path.join(this.basePath, MOCK_MODULES, name);

        // TODO 直接引入这个模块可能会有安全风险，需要考虑是否放入沙箱中引入
        const module = requireModule(requireModulePath, this.watch);

        // 是否存在配置文件
        let config;
        if (
          item.isDirectory() &&
          (fs.existsSync(path.join(requireModulePath, 'config.json')) ||
            fs.existsSync(path.join(requireModulePath, 'config.js')))
        ) {
          config = requireModule(path.join(requireModulePath, 'config'), this.watch);
        }

        mockModuleList.push(new MockModule(name, module, config));
      });

    return mockModuleList;
  }
}
