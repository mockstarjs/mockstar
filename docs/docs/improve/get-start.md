# 02. 整体架构

MockStar 是一个专注数据模拟（数据打桩）的工具，可以更容易编写、管理和使用模拟数据。

## 1. 基于 Express 实现 mock server 服务

mock server 服务是基于 [Express](http://expressjs.com/) `4.x` 版本实现的。

使用 `mockstar start` 命令之后，即会启动一个 Express 服务，端口默认为 `9527`，启动端口可以通过下列方式来修改：

```bash
$ mockstar start --port=9527
# or
$ mockstar start -p 9527
```

## 2. 基于文件系统来构造桩对象和桩数据（模拟数据）

无需依赖数据库，MockStar 是基于文件系统来构造 mock server 的。只需要按照约定的规则编写桩对象和桩数据，MockStar 会自动识别分析，最后结合 Express，生成一个 mock server 和对应的后台管理页面。

