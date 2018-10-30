const path = require('path');
const fse = require('fs-extra');
const pm2 = require('pm2');
const mockstarLocalServer = require('mockstar-local-server');

/**
 * 启动服务
 *
 * @param {Object} configOpts mockstar.config.js中的配置项
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 端口号
 * @param {String} [configOpts.name] pm2 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式，即不启用pm2
 * @param {Function} callback 回调函数
 */
function startPm2(configOpts, callback) {
    // console.log('run-by-pm2', configOpts);
    if (typeof callback !== 'function') {
        callback = (isSuccess, data) => {
        };
    }

    // 本地构建一份配置到 buildPath 下
    buildPm2(configOpts)
        .then((data) => {
            _startTask(configOpts.name, data.filePath, callback);
        })
        .catch((err) => {
            console.error('fse.outputJson catch err', err);
            callback(false, err);
        });
}

/**
 * 停止 pm2
 *
 * @param {String} name pm2 的应用名字
 * @param {Function} callback 回调函数
 */
function stopPm2(name, callback) {
    if (!name) {
        throw new Error('stop pm2 but no app_name or app_id!');
    }

    if (typeof callback !== 'function') {
        callback = (isSuccess, data) => {
        };
    }

    _deleteTask(name, callback);
}

/**
 * 构建服务
 *
 * @param {Object} configOpts mockstar.config.js中的配置项
 * @param {String} [configOpts.rootPath] 项目根目录
 * @param {String} [configOpts.buildPath] 构建之后的目录
 * @param {String} [configOpts.logPath] 日志目录
 * @param {String} [configOpts.mockServerPath]  mock server 根目录
 * @param {Number} [configOpts.port] 端口号
 * @param {String} [configOpts.name] pm2 应用的名字
 * @param {Boolean} [configOpts.isDev] 当前是否为开发模式，即不启用pm2
 */
function buildPm2(configOpts) {
    // pm2 的方式下，则需要先生成 pm2.json 文件，然后再使用 pm2 启动
    const buildPath = mockstarLocalServer.getBuildPath(configOpts.rootPath, configOpts.buildPath);
    const pm2ConfigFilePath = path.join(buildPath, 'pm2.json');

    // 获取配置信息
    let pm2Config = _getPm2Config(configOpts);

    // 本地构建一份配置到 buildPath 下
    return fse.outputJson(pm2ConfigFilePath, pm2Config)
        .then(() => {
            console.log('Generate pm2.json success!', pm2ConfigFilePath);

            return {
                filePath: pm2ConfigFilePath,
                content: pm2Config
            };
        });
}

/**
 * 启动 pm2
 *
 * @param {String} name pm2 的应用名字
 * @param {String} pm2ConfigFilePath pm2.json 配置文件绝对路径
 * @param {Function} callback 回调函数
 */
function _startTask(name, pm2ConfigFilePath, callback) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            callback(false, err);
            process.exit(2);
        }

        // 注意这里一定要先删除之后再启动，否则可能造成 watch 失效
        pm2.describe(name, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                callback(false, err);
                throw err;
            }

            // 如果已存在，则先删除再启动
            if (apps.length && apps[0].name === name) {
                // 删除
                pm2.delete(name, function (err, apps) {
                    if (err) {
                        pm2.disconnect();   // Disconnects from PM2
                        callback(false, err);
                        throw err;
                    }

                    // 启动
                    pm2.start(pm2ConfigFilePath, function (err, apps) {
                        console.log('Start local server success!');
                        pm2.disconnect();   // Disconnects from PM2

                        if (err) {
                            callback(false, err);
                            throw err;
                        } else {
                            callback(true, apps);
                        }
                    });
                });
            } else {
                // 启动
                pm2.start(pm2ConfigFilePath, function (err, apps) {
                    console.log('Start local server success!');
                    pm2.disconnect();   // Disconnects from PM2

                    if (err) {
                        callback(false, err);
                        throw err;
                    } else {
                        callback(true, apps);
                    }
                });
            }
        });
    });
}

/**
 * 停止 pm2
 *
 * @param {String} name pm2 的应用名字
 * @param {Function} callback 回调函数
 */
function _deleteTask(name, callback) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            callback(false, err);
            process.exit(2);
        }

        pm2.describe(name, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                callback(false, err);
                throw err;
            }

            // 已存在的场景才需要删除
            if (apps.length && apps[0].name === name) {
                pm2.delete(name, function (err, apps) {
                    console.log('Stop local server success!');
                    pm2.disconnect();   // Disconnects from PM2

                    if (err) {
                        callback(false, err);
                        throw err;
                    } else {
                        callback(true, apps);
                    }
                });
            } else {
                console.log('Stop local server success!');
                pm2.disconnect();   // Disconnects from PM2
                callback(true, apps);
            }
        });
    });
}

/**
 * 获得最终的 pm2.json 中内容
 *
 * @param configOpts
 * @returns {{apps: *[]}}
 */
function _getPm2Config(configOpts) {
    const mockServerPath = mockstarLocalServer.getMockServerPath(configOpts.rootPath, configOpts.mockServerPath);
    const buildPath = mockstarLocalServer.getBuildPath(configOpts.rootPath, configOpts.buildPath);

    let config = {
        name: configOpts.name,
        script: path.join(__dirname, './start-app.js'),
        args: [JSON.stringify(configOpts)],
        env: {
            COMMON_VARIABLE: 'true'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    };

    if (configOpts.watch) {
        config = Object.assign({}, config, {
            watch: [mockServerPath],
            ignore_watch: ['node_modules', buildPath]
        });
    }

    // http://pm2.keymetrics.io/docs/usage/application-declaration/
    let result = {
        apps: [
            config
        ]
    };

    return result;
}

module.exports = {
    start: startPm2,
    stop: stopPm2,
    build: buildPm2
};