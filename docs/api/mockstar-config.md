---
sidebarDepth: 1
---

# mockstar.config.js 配置

MockStar 需要依赖一个 `mockstar.config.js` 配置文件，且应该放置在 MockStar 项目的根目录内。

## 1. 文件示例

> 目前仅支持 JS 配置文件

```js
const path = require('path');

// 更多配置说明，请参考 https://mockstarjs.github.io/mockstar/api/mockstar-config.html
module.exports = {
  // mockstar-app 项目根目录
  rootPath: __dirname,

  // mock server 桩数据模块目录
  mockServerPath: path.resolve(__dirname, './mock_server'),

  // mockstar 启动之后的服务端口号
  port: 9527,

  // 构建之后的目录，也是运行产物临时目录
  // buildPath: path.resolve(__dirname, './build'),

  // 日志输出目录
  // logPath: path.resolve(__dirname, './build/logs'),

  // 应用的名字，用于标识一个服务，格式为 mockstar_${this.port}
  // name: mockstar_9527,

  // 命名空间
  // namespace: '',

  // 静态资源的基础路径，例如 /s/ ，或者 /s/t/
  // staticBasePath: '/',

  // 是否监听文件变化，推荐本地开发模式下使用
  // watch: false,

  // 是否为开发模式
  // isDev: false,
};
```

## 2. 字段说明

| 字段名 |  类型 | 默认值 | 含义描述 |
| --- | --- | --- | --- |
| `rootPath` |  `String` | `__dirname` | MockStar 项目根目录 |
| `buildPath` |  `String` | `path.resolve(rootPath, './build')` | 构建之后的目录，也是运行产物临时目录 |
| `logPath` |  `String` | `path.resolve(buildPath, './logs')` | 日志输出目录 |
| `mockServerPath` | `String` | `path.resolve(rootPath, './src')` | mock server 桩数据模块目录 |
| `port` | `Number` | `9527` | mockstar 启动之后的服务端口号 |
| `name` | `String` | `mockstar_${this.port}` | 应用的名字，用于标识一个服务 |
| `isDev` | `Boolean` | `false` | 当前是否为开发模式 |
| `watch` | `Boolean` | `false` | 是否监听文件变化，推荐本地开发模式下使用 |
| `namespace` | `String` | `''` | 命名空间 |
| `staticBasePath` | `String` | `/` | 静态资源的基础路径，例如 `/s/` ，或者 `/s/t/` |

