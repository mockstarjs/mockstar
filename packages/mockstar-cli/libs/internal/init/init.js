'use strict';

const path = require('path');
const yeoman = require('yeoman-environment');
const yeomanEnv = yeoman.createEnv();
const Promise = require('bluebird');

const mockstarPkg = require('mockstar/package');

/**
 *
 * @param {Object} args
 * @param {String} args.mockstar mockstar 的版本号 输入 --mockstar=1.5.0
 */
module.exports = function (args) {
    // node ./bin/mockstar init --mockstar=1.2.3
    // console.log(args);

    const name = 'mockstar-app';
    const pkgVersion = {
        'mockstar': mockstarPkg.version
    };

    // generator 的目录
    const generatorPath = path.join(__dirname, '../../../biz/generators', name);

    yeomanEnv.register(require.resolve(generatorPath), name);

    // 可以通过透传额外参数到 generator 中，然后通过 this.options 就能够取到传递过去的值
    let yeoResult = yeomanEnv.run(name, {
        'pkgVersion': pkgVersion
    }, err => {
        // console.log('=====end===', err);
        // 这里的 yeoResult 即 generator 的 this 对象，例如可以通过 result.destinationPath() 获得生成的地址
    });

    return Promise.resolve();
};
