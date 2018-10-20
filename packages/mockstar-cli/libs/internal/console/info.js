'use strict';

const Promise = require('bluebird');
const figlet = require('figlet');
const chalk = require('chalk');

module.exports = function (args) {
    // 此处的 this 即 MockStar 对象
    const self = this;

    //  Font preview：http://patorjk.com/software/taag/#p=display&f=3D-ASCII&t=mockstar%0A
    figlet.text('mockstar', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            self.log.info('Something went wrong...');
            self.log.error(err);
            return;
        }

        console.log(chalk.cyan(data));
        console.log(chalk.cyan(` MockStar，当前版本v${self.version}, 让数据打桩更简单，主页: https://github.com/mockstarjs/mockstar `));
        console.log(chalk.cyan(' (c) powered by IVWEB Team'));
        console.log(chalk.cyan(' Run mockstar --help to see usage. '));
    });

    return Promise.resolve();
};