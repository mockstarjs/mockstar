import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import marked from 'marked';
import low from 'lowdb';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fsHandler from 'fs-handler';
import Mocker from './Mocker';
import MockModule from './MockModule';
import {FSHandlerItem} from '../types';
import {getDB} from '../store';
import {LOCAL_STORE_FILE, MOCK_MODULES, MS_TARGET} from '../config';

import {requireModule} from '../file';

interface ParserOpts {
  basePath: string;
  definedMockers?: Mocker[];
  watch?: boolean;
  buildPath?: string;
}

export default class Parser {
  basePath: string;
  definedMockers: Mocker[];
  // 当前是否支持 watch
  watch: boolean;
  buildPath = '';
  db: low.LowdbAsync<any> | undefined;

  /**
   * 构造函数
   *
   * @param {Object} opts 参数
   * @param {String} opts.basePath mocker的根目录，绝对路径
   * @param {String} [opts.buildPath] 构建之后的目录，也是数据存储的根目录，绝对路径
   * @param {Boolean} [opts.watch] 当前是否支持 watch
   * @param {Array} [opts.definedMockers] 预定义的 Mocker 列表
   */
  constructor(opts: ParserOpts) {
    this.basePath = opts.basePath;
    this.definedMockers = Array.isArray(opts.definedMockers) ? [...opts.definedMockers] : [];

    this.watch = !!opts.watch;

    // 只有传递了 opts.buildPath，才处理 db
    if (opts.buildPath) {
      // 设置默认值和绝对路径
      this.buildPath = opts.buildPath;

      // 注意此处一定要保证存储数据的地址是可存在的，否则会保存失败。
      fs.ensureDirSync(this.buildPath);

      this.db = getDB(path.join(this.buildPath, LOCAL_STORE_FILE));
    }
  }

  /**
   * 获取所有的 mocker 信息
   *
   * @param {Boolean} [isReset] 是否为重置，如果为 true，则将忽略缓存数据
   * @return {Array}
   */
  getAllMocker(): Mocker[] {
    const mockerList: Mocker[] = [];

    // 每次获取数据的时候，重新加载db文件，
    // 否则加载出来的信息就是原来cache的数据
    if (this.db) {
      this.db = getDB(path.join(this.buildPath, LOCAL_STORE_FILE));
    }

    // 1. 获取所有的 mocker，约定：this.basePath 的每个子目录都是一个独立的 mocker
    fsHandler.search.getAll(this.basePath, {globs: ['*']}).forEach((item: FSHandlerItem) => {
      // 限制只处理文件夹类型的，不允许在 basePath 目录下有非文件夹的存在
      if (!item.isDirectory()) {
        console.error(`${path.join(item.basePath, item.relativePath)} SHOULD BE Directory!`);
        return;
      }

      // 模块名字，默认取文件名，
      // 在根目录下，每个子文件夹就是一个 mocker 单位，其名字即为文件夹名字
      // let name = path.basename(item.relativePath);
      // console.log('\n找到 mocker ：', name, item);

      // 获得 require 这个模块的相对路径
      // let requirePath = getRequirePath(path.join(this.basePath, item.relativePath));
      // console.log('requirePath ：', requirePath);

      // 引入这个模块
      const mockerItem = requireModule(path.join(this.basePath, item.relativePath));

      // 记得初始化
      mockerItem.init({
        watch: this.watch,
      });

      // 更新用户操作历史记录
      if (this.db) {
        // 更新数据
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cacheMockerItem = this.db.get('data').find({name: mockerItem.name}).value();

        // 如果存在记录，则更新两个字段即可
        if (cacheMockerItem) {
          mockerItem.updateConfig({
            disable: cacheMockerItem.config.disable,
            activeModule: cacheMockerItem.config.activeModule,
          });
        }
      }

      mockerList.push(mockerItem);
    });

    if (this.db) {
      // 存储到本地缓存数据文件内，以便下次启动时能够记录上一次的操作
      this.db
        .setState({
          mockServerPath: this.basePath,
          buildPath: this.buildPath,
          data: mockerList,
        })
        .write();
    }

    return mockerList;
  }

  /**
   * 通过名字获取指定的 mocker
   *
   * @param {String} mockerName 名字
   * @param {Boolean} [isReset] 是否为重置，如果为 true，则将忽略缓存数据
   * @return {Object} Mocker 对象
   */
  getMockerByName(mockerName: string): Mocker {
    const mockerList = this.getAllMocker();

    return mockerList.filter(item => {
      return item.name === mockerName;
    })[0];
  }

  /**
   * 通过路由及请求参数获取 mocker 的信息
   *
   * @param {String} route 路由规则
   * @param {Object} [params] 请求的参数
   * @return {Object}
   */
  getMockerByRoute(route: string, params: Record<string, unknown> = {}): Mocker | null {
    // 为避免 params=null，此处要特别设置一下
    if (!params) {
      params = {};
    }

    const allMockerList = this.getAllMocker();

    const paramsKeyLength = Object.keys(params).length;

    const matchedArr: {match: number; data: Mocker}[] = [];

    allMockerList.forEach(item => {
      const mockerConfig = item.config;

      // 如果没有配置则不需要执行
      if (!mockerConfig) {
        return;
      }

      // 如果连 route 都没匹配，则无需后续处理
      if (route !== mockerConfig.route) {
        return;
      }

      const obj = {
        match: 1,
        data: item,
      };

      const routeExtra = mockerConfig.routeExtra || {},
        routeExtraKeys = Object.keys(routeExtra),
        routeExtraKeyLength = routeExtraKeys.length;

      // 如果 routeExtra 为空，则放入数组中之后，无须再后续处理
      if (!routeExtraKeyLength) {
        matchedArr.push(obj);
        return;
      }

      // 如果 routeExtra 不为空，但请求参数为空，则肯定是匹配失败了的，无须放入数组
      if (routeExtraKeyLength && !paramsKeyLength) {
        return;
      }

      let isExistNotMatchedField = false;

      // 如果 routeExtra 不为空，且请求参数也为空，则为其计算匹配度
      routeExtraKeys.forEach(routeExtraKey => {
        // 注意，这里都转化为字符串来比较
        if (routeExtra[routeExtraKey] + '' === params[routeExtraKey] + '') {
          obj.match++;
        } else {
          // 如果定义了 routeExtra，就要全匹配，有一个不匹配都不行
          isExistNotMatchedField = true;
        }
      });

      if (!isExistNotMatchedField) {
        matchedArr.push(obj);
      }
    });

    return matchedArr.length
      ? matchedArr.sort((a, b) => {
          return b.match - a.match;
        })[0].data
      : null;
  }

  /**
   * 通过名字获取指定的 mock module
   *
   * @param {String} mockerName mocker 名字
   * @param {String} mockModuleName mock module 名字
   * @param {Boolean} [isReset] 是否为重置，如果为 true，则将忽略缓存数据
   * @return {Object} MockModule 对象
   */
  getMockModuleByName(mockerName: string, mockModuleName: string): MockModule | null {
    const mocker = this.getMockerByName(mockerName);

    // 有可能找不到 mocker
    if (!mocker) {
      console.error('Can not find mock module!', mockerName, mockModuleName);
      return null;
    }

    return mocker.mockModuleList.filter(item => {
      return item.name === mockModuleName;
    })[0];
  }

  /**
   * 通过路由匹配及请求参数获得响应数据
   *
   * @param {String} route 路由规则
   * @param {Object} [params] 请求的参数
   * @return {Object}
   */
  getResInfoByRoute(
    route: string,
    params: Record<string, unknown> = {},
  ): {
    mockerItem: Mocker;
    mockModuleItem: MockModule;
    moduleFullPath: string;
    params: Record<string, unknown>;
  } | null {
    // 为避免 params=null，此处要特别设置一下
    if (!params) {
      params = {};
    }

    // 1. 获得当前的 mocker 信息
    const mockerItem = this.getMockerByRoute(route, params);

    if (!mockerItem) {
      return null;
    }

    // 2. 获得当前最适合的 mock module
    // 优先获取 param 中请求的指定 mock_module，其次是 mocker.config.activeModule
    const mockModuleName = (params[MS_TARGET] || mockerItem.config?.activeModule) as string;

    const mockModuleItem: any = this.getMockModuleByName(mockerItem.name, mockModuleName);

    if (!mockModuleItem) {
      return null;
    }

    // 3. 获得 mock module 的绝对路径
    // 目标模块的路径，需要注意下 no module 的场景
    const moduleRelativePath =
      mockModuleItem.type && mockModuleItem.type === 'noModule'
        ? mockModuleItem.fileName
        : path.join(MOCK_MODULES, mockModuleName);

    const moduleFullPath = path.join(this.basePath, mockerItem.name, moduleRelativePath as string);

    // 4. 获得所有的请求参数
    // 还有部分参数在 mock_module 的 query 字段中，需要合并请求
    const reqParams = _.merge({}, mockModuleItem.query, params);

    return {
      mockerItem: mockerItem,
      mockModuleItem: mockModuleItem,
      moduleFullPath: moduleFullPath,
      params: reqParams,
    };
  }

  /**
   * 是否支持异步数据模拟方式
   * @return {Boolean}
   */
  isSupportAsync(): boolean {
    const mockerList = this.getAllMocker();
    let supportAsync = false;

    for (let i = 0; i < mockerList.length; i++) {
      // 只要找到一个 plugin=async 的，则设置该值为 true
      if (mockerList[i].config?.plugin === 'async') {
        supportAsync = true;
        break;
      }
    }
    return supportAsync;
  }

  /**
   * 更新 mocker 的 信息
   *
   * @param {String} mockerName handler 名字
   * @param {Object} [updateData] 要更新的数据
   */
  updateMocker(
    mockerName: string,
    updateData: Record<string, unknown>,
  ): Mocker & Record<string, unknown> {
    const oldMockerItem = this.getMockerByName(mockerName);

    const newMockerItem = _.merge({}, oldMockerItem, updateData);

    // 更新数据
    if (this.db) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.db.get('data').find({name: mockerName}).assign(newMockerItem).write();
    }

    // 返回新的结果
    return newMockerItem;
  }

  /**
   * 获取指定 mocker 的 README 信息
   *
   * @param {String} mockerName
   */
  getReadMeContent(mockerName: string): string {
    const mockerItem = this.getMockerByName(mockerName);
    if (!mockerItem) {
      return '异常错误，找不到对应信息！handlerName=' + mockerName;
    }

    // README.md 的绝对路径
    const mockerReadMeFile = path.join(mockerItem.basePath, 'README.md');
    if (!fs.existsSync(mockerReadMeFile)) {
      return '';
    }

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });

    try {
      let content = fs.readFileSync(mockerReadMeFile, 'utf8');

      content = content.replace(/__STATIC_PATH__/g, mockerName + '/static');

      return marked(content);
    } catch (e) {
      return e.stack;
    }
  }
}

// /**
//  * 获得传递给 require 的模块路径，相对于当前文件
//  *
//  * @param {String} absolutePath 绝对路径
//  * @returns {String}
//  */
// function getRequirePath(absolutePath) {
//   // 获得 require 这个模块的相对路径
//   let relativePath = path.relative(__dirname, absolutePath);

//   if (path.isAbsolute(relativePath)) {
//     // 如果 __dirname 和 absolutePath 不在同一个磁盘中，则 path.relative(__dirname, absolutePath) 会返回后者
//     // 因此此处就无需处理相对路径 #128
//   }

//   // 注意，path.relative 方法返回的结果中，如果是相对当前目录的，则其会把 './' 去掉，
//   // 例如， './path/a/b' 会被返回 'path/a/b'
//   // 此时如果 require('path/a/b') ，node 会先去 node_modules 模块寻找，
//   // 而不是当前目录去寻找，修改为 require('./path/a/b') 就不会有这样问题，
//   // 因此，这种情况下一定要补上一个 './'，
//   else if (relativePath.indexOf('..') < 0) {
//     relativePath = './' + relativePath;
//   }

//   // 需要将“\”替换为“/”，因为 require 语法中模块的路径是以 "/" 来分目录层级的
//   return relativePath.replace(/\\/gi, '/');
// }
