# mockstar-cli

MockStar 的 CLI 工具。

> 更多使用文档请访问 https://mockstarjs.gitbook.io/cookbook/ 。

## 安装

```
$ npm install -g mockstar-cli
```

## 使用

### 命令行

```bash
# 初始化一个项目
$ mockstar init project

# 初始化一个 mocker
$ mockstar init mocker

# 启动 mockstar 服务
$ mockstar start --watch

# 停止 mockstar 服务
$ mockstar stop

```

可以通过运行 `mockstar -h` 查看完成的命令帮助：

```bash
Usage: mockstar <command> [options]

Commands:
  start    Start a background service.
  run      Start a front service.
  status   Show the running status of MockStar.
  stop     Stop current background service.
  init     Initialize project.

Options:
  -v, --version          Print mockstar version.
  -h, --help             Print help information.
  -w, --watch            Enter watch mode, which rebuilds or restart server on file change.
  --dev                  Debug for development.

Report bugs to https://github.com/mockstarjs/mockstar/issues.
```

### 管理后台

启动 MockServer 服务之后，会自动生成一个管理后台页面，默认地址为 http://127.0.0.1:9527 。在管理后台，可以非常方便的切换不同的桩数据返回。