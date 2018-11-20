'use strict';
const meow = require('meow');

module.exports = function (args) {
    let arr = [];

    // 如果不是 -h 或者 --help 命令过来的，则需要提示命令不存在
    if (!args.h && !args.help) {
        arr.push('    WARNING: Command is NOT exist!');
        arr.push('\n');
    }

    arr.push('    Usage: mockstar <command> [options] ');
    arr.push('\n');
    arr.push('    Commands:');
    arr.push('        start    Start local server.');
    arr.push('        init     Initialize project.');
    // arr.push('        stop     Stop local server.');
    // arr.push('        pm2      Commands pass to pm2.');
    arr.push('\n');
    arr.push('    Options:');
    arr.push('        -v, --version          Print mockstar version.');
    arr.push('        -h, --help             Print help information.');
    arr.push('        -w, --watch            Enter watch mode, which rebuilds or restart server on file change.');
    arr.push('        --dev                  Debug for development.');
    arr.push('\n');
    arr.push('    Report bugs to https://github.com/mockstarjs/mockstar/issues.');
    arr.push('\n');

    // https://www.npmjs.com/package/meow
    return meow({
        description: false,
        help: arr.join('\n')
    }).showHelp(0);
};
