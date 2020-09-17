---
sidebarDepth: 0
---

# 常见问题

如果您遇到的问题在这里未找到解决办法，可以给我们 [提 Issue](https://github.com/mockstarjs/mockstar/issues) ，我们会尽快回复您。

## listen EADDRINUSE: address already in use

如果遇到这种错误，原因是该端口已经被使用了，例如下面的提示就是说 `9527` 端口已被占用。

```
Error: listen EADDRINUSE: address already in use :::9527
```

您可以换一个端口，假设要更换为 `9999`，有两种方式：

- 方式一：修改 `mockstar.config.js` 文件中的 `port` 字段为 `9999`
- 方式二：启动时追加 `--port`，例如 `mockstar start --port=9999`

如果您依然用这个端口，则可以手动杀掉该端口占用的进程。

对于 `macOS` 和 `Linux` 用户，可以运行：

```bash
$ lsof -i:9527
```

则可以看到类似如下的结果：

```
COMMAND   PID       USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
node    72372 helinjiang   27u  IPv6 0x7bb190cf8ac66e3      0t0  TCP *:9527 (LISTEN)
```

其中 `PID` 即为进程 ID，如上值为 `72372`，可以再运行下面命令，就可以杀掉该进程了。

```bash
$ kill -9 72372
```

对于 `windows` 用户，可以运行：
               
```bash
$ netstat -aon|findstr "9527"
```

则可以看到类似如下的结果：

```
  TCP    0.0.0.0:8899           0.0.0.0:0              LISTENING       20840
  TCP    [::]:8899              [::]:0                 LISTENING       20840
```

其中最后一个值即为进程 ID，如上值为 `20840`，可以再运行下面命令，就可以杀掉该进程了。

```bash
$ taskkill /f /pid  20840
```
