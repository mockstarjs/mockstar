const colors = require('colors/safe');

function error(msg) {
    console.log(colors.red(msg));
}

function warn(msg) {
    console.log(colors.yellow(msg));
}

function info(msg) {
    console.log(colors.green(msg));
}

module.exports = {
    error,
    warn,
    info,
    colors
};
