'use strict';

const MockStar = require('./core');
const pkg = require('../package.json');
const minimist = require('minimist');
const semver = require('semver');

const internalPluginConsole = require('./internal/console');
const internalPluginStart = require('./internal/start');
const internalPluginStop = require('./internal/stop');

/**
 * Entrance file, parse user input and call a command.
 *
 * @param args
 * @returns {Promise.<T>}
 */
function entry(args) {
    // 序列化请求参数，使之成为一个对象
    // https://www.npmjs.com/package/minimist
    args = minimist(process.argv.slice(2));

    // 初始化 MockStar
    const mockstar = new MockStar(args);
    const log = mockstar.log;

    // 校验
    if (!check(mockstar)) {
        process.exit(2);
    }

    // 初始化
    return mockstar.init([
        internalPluginConsole,
        internalPluginStart,
        internalPluginStop
    ])
        .then(function () {
            let cmd = args._.shift();

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

            return mockstar.call(cmd, args)
                .then(function () {
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch((err) => {
            if (err) {
                log.fatal(err);
            }

            process.exit(2);
        });
}

function check(mockstar) {
    const log = mockstar.log;

    log.debug('process.version', process.version);
    log.debug('pkg.engines.node', pkg.engines.node);

    // 校验当前 Node 的版本，必须符合要求的最低版本
    if (!semver.satisfies(process.version, pkg.engines.node)) {
        log.error(`运行 mockstar 所需Node.js版本为${pkg.engines.node}，当前版本为${process.version}，请升级到最新版本Node.js(https://nodejs.org/en/).`);
        return false;
    }

    return true;
}

module.exports = entry;