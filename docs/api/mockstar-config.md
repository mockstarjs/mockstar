---
sidebarDepth: 1
---

# mockstar.config.js 配置

## 1. 类型定义

```typescript
/**
 * 配置项
 * @param [rootPath] 项目根目录
 * @param [buildPath] 构建之后的目录
 * @param [logPath] 日志目录
 * @param [mockServerPath]  mock server 根目录
 * @param [port] 端口号
 * @param [name] 应用的名字，用于标识一个服务，停止服务或者 pm2 启动的时候来命名
 * @param [isDev] 当前是否为开发模式
 * @param [watch] 是否监听文件变化，推荐本地开发模式下使用
 * @param [namespace] 命名空间
 * @param [staticBasePath] 静态资源的基础路径，默认为 /
 */
export interface LocalServerConfigOpt {
  rootPath: string;
  buildPath?: string;
  logPath?: string;
  mockServerPath?: string;
  port?: number;
  name?: string;
  isDev?: boolean;
  watch?: boolean;
  namespace?: string;
  staticBasePath?: string;
}
```

## 2. 含义介绍

| 字段名 |  类型 | 默认值 | 含义描述 |
| :-: | :-: | :-: | :-: |
| `rootPath` |  `String` | `__dirname` | 项目根目录 |
| `buildPath` |  `String` | `path.resolve(rootPath, './build')` | 构建之后的目录 |
| `logPath` |  `String` | `path.resolve(rootPath, './logs')` | 日志目录 |
| `mockServerPath` | `String` | `path.resolve(rootPath, './src')` | mock server 根目录 |
| `port` | `Number` | `9527` | mockstar 启动之后的服务端口号 |
| `name` | `String` | `mockstar_${this.port}` | 应用的名字，用于标识一个服务，停止服务或者 pm2 启动的时候来命名 |
| `isDev` | `Boolean` | `false` | 当前是否为开发模式 |
| `watch` | `Boolean` | `false` | 是否监听文件变化，推荐本地开发模式下使用 |
| `namespace` | `String` | `''` | 命名空间 |
| `staticBasePath` | `String` | `/` | 静态资源的基础路径，例如 `/s/` ，或者 `/s/t/` |

## 3. 文件示例

> - 目前仅支持 JS 配置文件
> - 在项目根目录下新建 `mockstar.config.js`

```js
const path = require('path');

module.exports = {
    rootPath: __dirname,
    mockServerPath: path.resolve(__dirname, './src/mockers'),
    port: 9527
};
```

