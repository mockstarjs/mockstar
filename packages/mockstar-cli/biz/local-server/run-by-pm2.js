const path = require('path');
const fse = require('fs-extra');
const pm2 = require('pm2');

const utilMockstar = require('../utils/mockstar');

const PM2_NAME = 'mockstar_app';

function startPm2(configOpts) {
    // console.log('run-by-pm2', configOpts);

    // pm2 的方式下，则需要先生成 pm2.json 文件，然后再使用 pm2 启动
    const buildPath = utilMockstar.getBuildPath(configOpts.rootPath, configOpts.buildPath);
    const pm2ConfigFilePath = path.join(buildPath, 'pm2.json');

    // 获取配置信息
    let pm2Config = getPm2Config(configOpts);

    // 本地构建一份配置到 buildPath 下
    fse.outputJson(pm2ConfigFilePath, pm2Config)
        .then(() => {
            console.log('Generate pm2.json success!', pm2ConfigFilePath);

            startTask(pm2ConfigFilePath);
        })
        .catch((err) => {
            throw err;
        });
}

function stopPm2() {
    deleteTask();
}

/**
 * 启动 pm2
 * @param {String} pm2ConfigFilePath pm2.json 配置文件绝对路径
 */
function startTask(pm2ConfigFilePath) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        // 注意这里一定要先删除之后再启动，否则可能造成 watch 失效
        pm2.describe(PM2_NAME, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                throw err;
            }

            // 如果已存在，则先删除再启动
            if (apps.length && apps[0].name === PM2_NAME) {
                // 删除
                pm2.delete(PM2_NAME, function (err, apps) {
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
function deleteTask() {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.describe(PM2_NAME, function (err, apps) {
            if (err) {
                pm2.disconnect();   // Disconnects from PM2
                throw err;
            }

            // 已存在的场景才需要删除
            if (apps.length && apps[0].name === PM2_NAME) {
                pm2.delete(PM2_NAME, function (err, apps) {
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
    const mockServerPath = utilMockstar.getMockServerPath(configOpts.rootPath, configOpts.mockServerPath);
    const buildPath = utilMockstar.getBuildPath(configOpts.rootPath, configOpts.buildPath);

    // http://pm2.keymetrics.io/docs/usage/application-declaration/
    let result = {
        apps: [
            {
                name: PM2_NAME,
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