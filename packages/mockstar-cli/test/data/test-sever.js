const spawn = require('cross-spawn');

const mockstarLocalServer = require('mockstar-local-server');

function start(cmder, nodeArgs) {
    return new Promise((resolve, reject) => {
        mockstarLocalServer.findAvailablePort(9528)
            .then((port) => {
                const run = spawn('node', [
                    cmder,
                    'start',
                    '--dev',
                    `--port=${port}`
                ].concat(nodeArgs || []));

                let t;

                // 成功信息
                run.stdout.on('data', (data) => {
                    if (t) {
                        clearTimeout(t);
                    }

                    t = setTimeout(() => {
                        resolve({
                            port: port,
                            pid: run.pid
                        });
                    }, 500);
                });
                // .pipe(process.stdout);

                // 异常信息
                run.stderr.on('data', (data) => {
                    reject();
                }).pipe(process.stderr);

            })
            .catch((err) => {
                reject(err);
            });
    });
}

function stop(pid) {
    process.kill(pid, 'SIGKILL');
}

module.exports = {
    start: start,
    stop: stop
};