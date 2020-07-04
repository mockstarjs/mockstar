import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import util from 'util';
import cp from 'child_process';
import osenv from 'osenv';
import _ from 'lodash';
import * as yaml from './yaml';
import * as colorsLog from './colorsLog';

// 数据缓存的根目录
const DATA_DIR = path.join(osenv.home(), './.mockstar', '.startingAppData');
fs.ensureDirSync(DATA_DIR);

// 启动数据缓存文件路径
const START_CACHE_PATH = path.join(DATA_DIR, '.start.yml');
fs.ensureFileSync(START_CACHE_PATH);

/**
 * 获得启动命令执行的缓存数据
 * @return {{}}
 */
function getStartCache() {
  return yaml.parseYaml(START_CACHE_PATH) || {};
}

/**
 * 保存信息
 *
 * @param {Object} data
 */
function saveStartCache(data: Record<string, unknown>) {
  yaml.safeDump(data, START_CACHE_PATH);
}

/**
 * 获得错误文件路径
 *
 * @param {String} main 主入口文件路径，此处指 mockstar.config.js 全路径
 */
function getErrorCachePath(main: string): string {
  return path.join(DATA_DIR, 'error.' + encodeURIComponent(main));
}

/**
 * 查询指定的pid的node应用是否存在
 *
 * @param {Number} pid 进程ID
 * @param {Function} callback 回调
 */
function isRunning(pid: number, callback: (e: string | boolean) => void): void {
  if (!pid) {
    return callback(false);
  }

  cp.exec(
    util.format(
      process.platform === 'win32'
        ? 'tasklist /fi "PID eq %s" | findstr /i "node.exe"'
        : 'ps -f -p %s | grep "node"',
      pid,
    ),
    function (err, stdout, stderr) {
      callback(!err && !!stdout.toString().trim());
    },
  );
}

function execCmd(
  argsOpts: string[],
  configOpts: Record<string, unknown>,
  options: cp.SpawnOptionsWithoutStdio,
): cp.ChildProcessWithoutNullStreams {
  let args = argsOpts || [];

  if (configOpts) {
    args.push('--data');
    args.push(encodeURIComponent(JSON.stringify(configOpts)));
  }

  return cp.spawn('node', args, options);
}

export function start(
  configOpts: any,
  argsOpts: string[],
  callback: (e: string | boolean | null, config: any) => void,
) {
  // 这里需要复制一份新的，因为 configOpts 此时为 LocalServerConfig 的对象，在调用_.isEqual对比时会有问题，需要复制为常规
  configOpts = Object.assign({}, configOpts);

  // 检查缓存的进程是否在启动中
  getStatus(function (isPidRunning, config) {
    // 如果 MockStar 服务正在启动中
    if (isPidRunning) {
      if (_.isEqual(configOpts, config.options)) {
        // 如果启动的 mockstar 配置参数没有变化，则无需额外处理，直接返回运行中
        return callback(true, config);
      } else {
        // 否则就需要杀掉原来的进程
        try {
          config.pid && process.kill(config.pid);
          saveStartCache({});
        } catch (err) {}
      }
    }

    // 否则先移除错误文件，因为后续使用 child_process 执行了命令之后会将错误记录在这个错误文件内
    let errorFile = getErrorCachePath(configOpts.rootPath);
    try {
      // 移除文件
      if (fs.existsSync(errorFile)) {
        fs.unlinkSync(errorFile);
      }
    } catch (e) {
      return callback(e, config);
    }

    // 执行启动命令
    let child = execCmd(argsOpts, configOpts, {
      detached: true,
      // @ts-ignore
      stdio: [null, null, fs.openSync(errorFile, 'a+')],
    });

    config._pid = child.pid;

    // 将mockstar启动数据缓存起来
    config.options = configOpts;

    // 记录数据到缓存中
    try {
      saveStartCache(config);
    } catch (e) {
      return callback(e, config);
    }

    // 接下来的3秒内，每隔600ms检查是否有错误文件，如果没有错误文件，则可以认为是成功启动了
    let startTime = Date.now();
    (function execCallback() {
      let error;
      try {
        error = fs.readFileSync(errorFile, {encoding: 'utf8'});
      } catch (e) {}

      // 如果遇到错误，则不再进行处理，直接
      if (error) {
        callback(null, config);
        console.error(error);
        return;
      }

      // 2s 内会一直轮询
      if (Date.now() - startTime < 2000) {
        return setTimeout(execCallback, 600);
      }

      // 记录缓存
      delete config._pid;
      config.pid = child.pid;
      saveStartCache(config);
      child.unref();

      callback(null, config);
      return;
    })();
  });
}

export function getIpList(): string[] {
  let ipList: string[] = [];
  let ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname]?.forEach(function (iface) {
      if (iface.family == 'IPv4') {
        ipList.push(iface.address);
      }
    });
  });
  let index = ipList.indexOf('127.0.0.1');
  if (index !== -1) {
    ipList.splice(index, 1);
  }
  ipList.unshift('127.0.0.1');
  return ipList;
}

export function getStatus(callback: (e: string | boolean, config: any) => void) {
  // 获得启动的缓存数据
  let config = getStartCache() || {};

  // 检查缓存的进程是否在启动中
  isRunning(config.pid, function (isPidRunning) {
    // 如果正在启动中，则附带下 IP 信息
    if (isPidRunning) {
      config.ipList = getIpList();
    }

    callback(isPidRunning, config);
  });
}

export function stop(callback: (e: string | boolean, config: any) => void) {
  // 检查缓存的进程是否在启动中
  getStatus(function (isPidRunning, config) {
    try {
      config.pid && process.kill(config.pid);
      isPidRunning = false;

      saveStartCache({});
    } catch (err) {
      isPidRunning = isPidRunning && err;
    }

    callback(isPidRunning, config);
  });
}

/**
 * 展示 MockStar 当前运行时状态
 *
 * @param {String} version MockStar 当前的版本号
 * @param {Object} config 缓存的数据
 * @param {Boolean} isShowDevInfo 是否展示一些开发调试信息
 */
export function showRunningStatus(version: string, config: any, isShowDevInfo: boolean) {
  colorsLog.info(`[i] MockStar@${version} is running for ${config.options.rootPath}`);

  colorsLog.info(
    getIpList()
      .map(function (ip) {
        return (
          '       http://' +
          colorsLog.colors.bold(ip) +
          (config.options.port ? ':' + config.options.port : '')
        );
      })
      .join('\n'),
  );

  if (isShowDevInfo) {
    colorsLog.info('[i] pid=' + config.pid);
    colorsLog.info('\n' + JSON.stringify(config, null, 2));
  }
}
