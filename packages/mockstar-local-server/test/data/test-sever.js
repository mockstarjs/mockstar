const mockstarLocalServer = require('../../lib');

function start(opts = {}) {
    return new Promise((resolve, reject) => {
        mockstarLocalServer.findAvailablePort(9528)
            .then((port) => {
                mockstarLocalServer.startServer(Object.assign({}, opts, { port: port }), (data) => {
                    resolve(data);
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function stop(pid) {
    // process.kill(pid, 'SIGKILL');
}

module.exports = {
    start: start,
    stop: stop
};