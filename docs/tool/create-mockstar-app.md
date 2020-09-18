# create-mockstar-app

[create-mockstar-app](https://www.npmjs.com/package/create-mockstar-app) 主要用来初始化 MockStar 项目。

## 1. 如何使用

脚手架初始化项目，具体示例可以阅参考 [快速入门](../docs/getting-started) 。

```bash
$ npx create-mockstar-app mockstar-app
```

初始化之后的项目内容也可以参考 [demo/mockstar-app](https://github.com/mockstarjs/create-mockstar-app/tree/master/demo/mockstar-app) ，该项目是可以独立运行使用的。


## 2. 内置命令

在 `package.json` 中已经配置了几个命令。

```
# 启动 MockStar ，后台运行，关掉控制台也没关系
$ npm start

# 启动 MockStar ，前台运行，关掉控制台服务也关掉了，该模式下有日志打印
$ npm run dev

# 停止 MockStar
$ npm run stop
```

## 3. 反馈

本项目的代码仓库地址： [https://github.com/mockstarjs/create-mockstar-app](https://github.com/mockstarjs/create-mockstar-app) ，欢迎给我们 [提 Issue](https://github.com/mockstarjs/create-mockstar-app/issues/new) 。
