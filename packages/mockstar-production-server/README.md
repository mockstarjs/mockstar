# mockstar-local-server

MockStar 的本地 server 服务。

## 1. 安装

```bash
$ npm install mockstar-local-server --save
```

## 2. API

### 2.1 startServer(configOpts, callback)

启动本地服务

- `configOpts`，`Object`， 请求参数
  - `configOpts.rootPath`，`String`， 项目根目录
  - `configOpts.buildPath`，`String`， 构建之后的目录
  - `configOpts.logPath`，`String`， 日志目录
  - `configOpts.mockServerPath`，`String`， mock server 根目录
  - `configOpts.port`，`Number`， 本地服务的端口号
  - `configOpts.name`，`String`， 应用的名字
  - `configOpts.isDev`，`Boolean`， 是否为开发模式
  - `configOpts.watch`，`Boolean`， 是否支持watch
- `callback`，`Function`， 回调函数，接受两个参数 `isSuccess` 和 `localServerConfig`

该方法会返回一个 http server 对象，可以调用 `runServer.stop()` 方法来停止服务。

```javascript
const path = require('path');
const mockstarLocalServer = require('mockstar-local-server');

// 服务启动参数
const configOpts = {
    rootPath: __dirname,
    mockServerPath: path.resolve(__dirname, '../../../mockstar/test/data/fixtures/mock_server/mockers')
};

// 启动本地服务
const runServer = mockstarLocalServer.startServer(configOpts, (isSuccess, data) => {
    console.log('startServer callback', isSuccess, data);
});

// 3s 之后停止服务
setTimeout(() => {
    runServer.stop(() => {
        console.log('stop server success!');
    });
}, 3000);
```


### 2.2 findAvailablePort(port)

从指定的 `port` 端口号开始，找到当前未被占用的端口号，返回一个 `Promise`。

```javascript
const mockstarLocalServer = require('mockstar-local-server');

mockstarLocalServer.findAvailablePort(9528)
    .then((port) => {
        console.log('Found it port=' + port);
    })
    .catch((err) => {
        console.error(err);
    });
```

### 2.3 getLocalServerConfig(configOpts, opts)

获取最终的配置数据。

### 2.4 getMockServerPath(rootPath, mockServerPath)

获得 mock server 的根目录绝对路径。

- `rootPath`，`String`， 项目根目录
- `mockServerPath`，`String`，mock server 目录

### 2.5 getBuildPath(rootPath, buildPath)

获得 mock server 的构建之后的根目录绝对路径。

- `rootPath`，`String`， 项目根目录
- `buildPath`，`String`， 构建目录

### 2.6 getLogPath(rootPath, buildPath, logPath)

获得 mock server 的日志绝对路径。

- `rootPath`，`String`， 项目根目录
- `buildPath`，`String`，构建目录
- `logPath`，`String`， 日志目录