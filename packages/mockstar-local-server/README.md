# mockstar-local-server

MockStar 的本地 server 服务。

## 1. 安装

```
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
  - `configOpts.name`，`String`， pm2 应用的名字
  - `configOpts.isDev`，`Boolean`， 前是否为开发模式
- `callback`，`Function`， 回调函数，接受两个参数 `isSuccess` 和 `localServerConfig`
