const spawn = require('cross-spawn');

const { findAvailablePort } = require('../../biz/port');

function start(cmder, nodeArgs) {
    return new Promise((resolve, reject) => {
        findAvailablePort(9528)
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