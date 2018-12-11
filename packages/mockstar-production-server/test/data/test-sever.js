const mockstarLocalServer = require('../../lib');

let runServer;

function start(opts = {}) {
    return new Promise((resolve, reject) => {
        mockstarLocalServer.findAvailablePort(9528)
            .then((port) => {
                runServer = mockstarLocalServer.startServer(Object.assign({}, opts, { port: port }), (isSuccess, data) => {
                    isSuccess ? resolve(data) : reject(data);
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function stop() {
    if (!runServer || typeof runServer.stop !== 'function') {
        return;
    }

    // let t1 = Date.now();
    runServer.stop(() => {
        // console.log('-close success-', Date.now() - t1);
    });
}

module.exports = {
    start: start,
    stop: stop
};