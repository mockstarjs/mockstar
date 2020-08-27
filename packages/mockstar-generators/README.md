# mockstar-generators

用于生产 MockStar 的脚手架代码的工具。

## 特性

- 支持生成项目 project
- 支持生成桩对象 mocker

## 安装

```
$ npm install mockstar-generators --save
```

## API

### initProject(opts)

初始化一个项目。

- `opts`，参数
  - `opts.parentPath`，`string`，父级目录，即项目初始化之后放置的目录
  - `opts.name`，`string`，默认值为 `mockstar-app` ，项目文件夹名字
  - `opts.port`，`number`，默认值为 `9527` ，项目启动的端口号
  - `opts.autoInstall`，`boolean`，默认值为 `false` ，初始化完成之后是否立即执行 install
  - `opts.cmder`，`string`，默认值为 `npm` 
  - `opts.isDev`，`boolean`，默认值为 `false` ，开始调试打印日志
  - `opts.pkgVersion`，`object`，依赖的包的版本
    - `opts.mockstar`，`string`，[mockstar](https://www.npmjs.com/package/mockstar) 的版本号，例如 `1.2.2`
    - `opts['mockstar-cli']`，`string`，[mockstar-cli](https://www.npmjs.com/package/mockstar-cli) 的版本号，例如 `1.2.2`

```js
const path = require('path');
const { initProject } = require('mockstar-generators');

(async () => {
  await initProject({
    isDev: false,
    parentPath: path.join(__dirname, './tmp'),
    name: 'mockstar-app',
    port: 9527,
  });
})();
```

### initMocker(opts)

初始化一个桩对象。

- `opts`，参数
  - `opts.parentPath`，`string`，父级目录，即项目初始化之后放置的目录
  - `opts.config`，`object`
    - `opts.config.name`，`string`，桩对象文件夹名字
    - `opts.config.route`，`string`，桩对象路由，例如 `/a/b/c/cgi-name`
    - `opts.config.method`，`string`，桩对象请求的类型，例如 `GET`、`POST` 等
  - `opts.port`，`number`，默认值为 `9527` ，项目启动的端口号
  - `opts.isInitReadme`，`boolean`，默认值为 `false` ，是否初始化 README.md
  - `opts.isDev`，`boolean`，默认值为 `false` ，开始调试打印日志
  - `opts.debugMockModuleJsonData`，`object`，debug 模块的数据，生成在 `mock_modules/debug/index.js` 中

```js
const path = require('path');
const { initMocker } = require('mockstar-generators');

(async () => {
    await initMocker({
      isDev: false,
      parentPath: path.join(__dirname, './tmp'),
      isInitReadme: true,
      config: {
        name: 'i-am-xhr-request-get',
        method: 'get',
        route: '/cgi-bin/i-am-xhr-request-get',
      },
      debugMockModuleJsonData: {
        retcode: 0,
        result: {
          uid: 99999,
          type: 9,
          description: '我是 debug',
          other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
        },
      },
    });
})();
```

### getProjectGeneratorTemplatesRoot()

获得 project 模板文件的目录地址。


### getMockerGeneratorTemplatesRoot()

获得 mocker 模板文件的目录地址。
