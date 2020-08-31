const path = require('path');
const mockstarLocalServer = require('../../lib');

// 服务启动参数
const configOpts = {
  rootPath: __dirname,
  mockServerPath: path.resolve(
    __dirname,
    '../../../mockstar/test/data/fixtures/mock_server/mockers',
  ),
};

// 启动本地服务
const runServer = mockstarLocalServer.startServer(configOpts, (isSuccess, data) => {
  console.log('startServer callback', isSuccess, data);
});

// 3s 之后停止服务
// setTimeout(() => {
//     runServer.stop(() => {
//         console.log('stop server success!');
//     });
// }, 3000);
