const path = require('path');
const osenv = require('osenv');
const fs = require('fs');
const os = require('os');
const util = require('util');
const fse = require('fs-extra');
const cp = require('child_process');
const yaml = require('./yaml');

// 数据缓存的根目录
const DATA_DIR = path.join(osenv.home(), './.mockstar', '.startingAppData');
fse.ensureDirSync(DATA_DIR);

// 启动数据缓存文件路径
const START_CACHE_PATH = path.join(DATA_DIR, '.start.yml');
fse.ensureFileSync(START_CACHE_PATH);

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
function saveStartCache(data) {
    yaml.safeDump(data, START_CACHE_PATH);
}

/**
 * 获得错误文件路径
 *
 * @param {String} main 主入口文件路径，此处指 mockstar.config.js 全路径
 */
function getErrorCachePath(main) {
    return path.join(DATA_DIR, 'error.' + encodeURIComponent(main));
}

/**
 * 查询指定的pid的node应用是否存在
 *
 * @param {Number} pid 进程ID
 * @param {Function} callback 回调
 */
function isRunning(pid, callback) {
    if (!pid) {
        return callback(false);
    }

    cp.exec(util.format(process.platform === 'win32' ?
        'tasklist /fi "PID eq %s" | findstr /i "node.exe"'
        : 'ps -f -p %s | grep "node"', pid),
        function (err, stdout, stderr) {
            callback(!err && !!stdout.toString().trim());
        });
}

function execCmd(argsOpts, configOpts, options) {
    let args = argsOpts || [];

    if (configOpts) {
        args.push('--data');
        args.push(encodeURIComponent(JSON.stringify(configOpts)));
    }

    return cp.spawn('node', args, options);
}

function start(configOpts, argsOpts, callback) {
    // 获得启动的缓存数据
    let config = getStartCache() || {};

    // 将mockstar启动数据缓存起来
    config.options = configOpts;

    // 检查缓存的进程是否在启动中
    isRunning(config.pid, function (isPidRunning) {
        // 如果在启动中，则直接返回成功
        if (isPidRunning) {
            return callback(true, config);
        }

        // 如果没在启动中，则检查内存中的 _pid 是否在启动中
        isRunning(config._pid, function (isPidRunning) {
            // 如果也在启动中，则直接返回成功
            if (isPidRunning) {
                return callback(true, config);
            }

            // 否则先检查是否有一些启动错误
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
                stdio: ['ignore', 'ignore', fs.openSync(errorFile, 'a+')]
            });

            config._pid = child.pid;

            // 记录到缓存中
            try {
                saveStartCache(config);
            } catch (e) {
                return callback(e, config);
            }

            // 接下来的3秒内，每隔600ms检查进程是否已真正成功启动
            let startTime = Date.now();
            (function execCallback() {
                let error;
                try {
                    error = fs.readFileSync(errorFile, { encoding: 'utf8' });
                } catch (e) {
                }

                // 如果遇到错误，则不再进行处理，直接
                if (error) {
                    callback(null, config);
                    console.error(error);
                    return;
                }

                // 3s 内会一直轮询
                if (Date.now() - startTime < 3000) {
                    return setTimeout(execCallback, 600);
                }

                // 记录缓存
                delete config._pid;
                config.pid = child.pid;
                saveStartCache(config);
                child.unref();

                callback(null, config);
            })();
        });
    });
}

function getIpList() {
    let ipList = [];
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
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

function getStatus(callback) {
    // 获得启动的缓存数据
    let config = getStartCache() || {};

    // 检查缓存的进程是否在启动中
    isRunning(config.pid, function (isPidRunning) {
        callback(isPidRunning, config);
    });
}

function stop(callback) {
    // 获得启动的缓存数据
    let config = getStartCache() || {};

    // 检查缓存的进程是否在启动中
    isRunning(config.pid, function (isPidRunning) {
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

module.exports = {
    start,
    getIpList,
    getStatus,
    stop
};