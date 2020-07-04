import minimist from 'minimist';
import semver from 'semver';
import {MockStar} from './core';

import {Help} from './internal/help';
import {Info} from './internal/info';
import {Version} from './internal/version';
import {Status} from './internal/status';
import {Stop} from './internal/stop';
import {Init} from './internal/init';

function check(mockstar: MockStar) {
  const log = mockstar.log;

  log.debug('process.version', process.version);

  // 校验当前 Node 的版本，必须符合要求的最低版本
  if (!semver.satisfies(process.version, '>=10.18.1')) {
    log.error(
      `运行 mockstar 所需Node.js版本为>=10.18.1，当前版本为${process.version}，请升级到最新版本Node.js(https://nodejs.org/en/).`,
    );
    return false;
  }

  return true;
}

/**
 * Entrance file, parse user input and call a command.
 *
 * @param args
 * @returns {Promise.<T>}
 */
export async function Main() {
  // 序列化请求参数，使之成为一个对象
  // https://www.npmjs.com/package/minimist
  const args = minimist(process.argv.slice(2));

  // 初始化 MockStar
  const mockstar = new MockStar(args);
  const log = mockstar.log;

  // 校验
  if (!check(mockstar)) {
    process.exit(2);
  }

  // 初始化
  await mockstar.init([
    new Help(),
    new Info(),
    new Version(),
    new Status(),
    new Stop(),
    new Init(),
  ]);

  let cmd = args._.shift();

  // 根据参数替换命令
  if (args.v || args.version) {
    cmd = 'version';
  } else if (args.h || args.help) {
    cmd = 'help';
  } else if (args.i || args.info) {
    cmd = 'info';
  } else if (!cmd) {
    cmd = 'info';
  } else if (!mockstar.cmd.get(cmd)) {
    cmd = 'help';
  }

  try {
    return mockstar
      .call(cmd, args, () => {})
      .then(function () {})
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    if (err) {
      log.fatal(err);
    }

    process.exit(2);
  }
}
