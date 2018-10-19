'use strict';
const meow = require('meow');

module.exports = function (args) {
    const cli = meow(`
    Usage: mockstar [options] [command]

    Commands:
        start                                    Start local server.

    Options:
        --version, -[v]           Print version and exit successfully.
        --help, -[h]              Print this help and exit successfully.

    Report bugs to https://github.com/mockstarjs/mockstar/issues.
  `);

    return cli.showHelp(0);
};
