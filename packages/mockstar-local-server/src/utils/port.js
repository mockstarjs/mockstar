const net = require('net');

/**
 * 检查某个端口是否被占用
 * @param {Number} port 端口号，取值为 >= 0 and < 65536
 * @param {Function} [callback] 回调，接受两个参数，isSuccess 和 err
 */
function portIsOccupied(port, callback) {
    // 创建服务并监听该端口
    const server = net.createServer().listen(port);

    server.on('listening', function () { // 执行这块代码说明端口未被占用
        server.close(); // 关闭服务
        // console.log('The port【' + port + '】 is available.'); // 控制台输出信息

        if (typeof callback === 'function') {
            callback(true);
        }
    });

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            // console.log('The port【' + port + '】 is occupied, please change other port.');
        }

        if (typeof callback === 'function') {
            callback(false, err);
        }
    });
}

function findAvailablePort(port = 9528) {
    return new Promise((resolve, reject) => {
        const check = () => {
            portIsOccupied(port, (isFound) => {
                if (isFound) {
                    resolve(port);
                } else {
                    port++;

                    if (port > 65535) {
                        reject();
                    } else {
                        check();
                    }
                }
            });
        };

        check();
    });
}

module.exports = {
    findAvailablePort: findAvailablePort
};