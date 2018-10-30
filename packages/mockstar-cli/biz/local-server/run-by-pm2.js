const path = require('path');
const fse = require('fs-extra');
const pm2 = require('pm2');
const mockstarLocalServer = require('mockstar-local-server');

function startPm2(configOpts, callback) {
    // console.log('run-by-pm2', configOpts);

    // pm2 的方式下，则需要先生成 pm2.json 文件，然后再使用 pm2 启动
    const buildPath = mockstarLocalServer.getBuildPath(configOpts.rootPath, configOpts.buildPath);
    const pm2ConfigFilePath = path.join(buildPath, 'pm2.json');

    // 获取配置信息
    let pm2Config = getPm2Config(configOpts);

    // 本地构建一份配置到 buildPath 下
    fse.outputJson(pm2ConfigFilePath, pm2Config)
        .then(() => {
            console.log('Generate pm2.json success!', pm2ConfigFilePath);

            startTask(configOpts.name, pm2ConfigFilePath, callback);
        })
        .catch((err) => {
            console.error('fse.outputJson catch err', err);
            if (typeof callback === 'function') {
                callback(false, err);
            }
        });
}

/**
 * 停止 pm2
 *
 * @param {String} name pm2 的应用名字
 */
function stopPm2(name) {
    if (!name) {
        throw new Error('stop pm2 but no app_name or app_id!');
    }

    deleteTask(name);
}

/**
 * 启动 pm2
 *
 * @param {String} name pm2 的应用名字
 * @param {String} pm2ConfigFilePath pm2.json 配置文件绝对路径
 */
function startTask(name, pm2ConfigFilePath) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        // 注意这里一定要先删除之后再启动，否则可能造成 watch 失效
        pm2.describe(name, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                throw err;
            }

            // 如果已存在，则先删除再启动
            if (apps.length && apps[0].name === name) {
                // 删除
                pm2.delete(name, function (err, apps) {
                    if (err) {
                        pm2.disconnect();   // Disconnects from PM2
                        throw err;
                    }

                    // 启动
                    pm2.start(pm2ConfigFilePath, function (err, apps) {
                        console.log('Start local server success!');
                        pm2.disconnect();   // Disconnects from PM2

                        if (err) {
                            throw err;
                        }
                    });
                });
            } else {
                // 启动
                pm2.start(pm2ConfigFilePath, function (err, apps) {
                    console.log('Start local server success!');
                    pm2.disconnect();   // Disconnects from PM2

                    if (err) {
                        throw err;
                    }
                });
            }
        });
    });
}

/**
 * 停止 pm2
 */
function deleteTask(name) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.describe(name, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                throw err;
            }

            // 已存在的场景才需要删除
            if (apps.length && apps[0].name === name) {
                pm2.delete(name, function (err, apps) {
                    console.log('Stop local server success!');
                    pm2.disconnect();   // Disconnects from PM2

                    if (err) {
                        throw err;
                    }
                });
            } else {
                console.log('Stop local server success!');
                pm2.disconnect();   // Disconnects from PM2
            }
        });
    });
}

/**
 * 获得最终的 pm2.json 中内容
 *
 * TODO 这里的配置项应该可以通过 configOpts 传递下来
 *
 * @param configOpts
 * @returns {{apps: *[]}}
 */
function getPm2Config(configOpts) {
    const mockServerPath = mockstarLocalServer.getMockServerPath(configOpts.rootPath, configOpts.mockServerPath);
    const buildPath = mockstarLocalServer.getBuildPath(configOpts.rootPath, configOpts.buildPath);

    // http://pm2.keymetrics.io/docs/usage/application-declaration/
    let result = {
        apps: [
            {
                name: configOpts.name,
                script: path.join(__dirname, './start-app.js'),
                watch: [mockServerPath],
                ignore_watch: ['node_modules', buildPath],
                args: [JSON.stringify(configOpts)],
                env: {
                    COMMON_VARIABLE: 'true'
                },
                env_production: {
                    NODE_ENV: 'production'
                }
            }
        ]
    };

    return result;
}

module.exports = {
    start: startPm2,
    stop: stopPm2
};