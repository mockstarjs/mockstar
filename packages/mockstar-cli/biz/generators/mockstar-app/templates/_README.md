# <%= projectName %>


本项目用于处理数据打桩。


## 启动

> 需要全局安装 `mockstar-cli` 组件

在 mockstar-app 中执行以下命令即可。

```
npm start
```

## 管理

服务启动之后，可以打开 `http://localhost:9527` 进行管理端操作。


## 查看运行情况

使用了 [pm2](https://www.npmjs.com/package/pm2) 来启动，默认命名为 `mockstar_9527`，启动之后服务会常驻内存。

如果你全局安装了 `pm2` ，则可以按照文档进行操作即可；如果你不希望全局安装，则使用 `mockstar pm2 xxx` ，将把后续的命令传递到 `mockstar` 本地依赖的 `pm2` 上。

关于 pm2 常用的操作包括：

- `pm2 list` ： 查看所有服务
- `pm2 logs` ： 查看日志


## 其他

如果发现启动服务失败，则使用 `mockstar pm2 logs` 来查看运行情况。