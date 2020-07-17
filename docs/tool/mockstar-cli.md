# mockstar-cli

## 安装

以 NPM 包的形式进行提供，只要运行下面的命令即可安装：

```bash
$ npm install -g mockstar-cli

# 打印帮助信息
$ mockstar help
```

运行结果如下：

<img src="./mockstar-cli.assets/image-20200707091645569.png" alt="image-20200707091645569" style="zoom:50%;" />

## 子命令解析

> 本 CLI 中子命令没有选项。

|  子命令  |                             解释                             |
| :------: | :----------------------------------------------------------: |
| `start`  |               将本项目启动为 mockstar 后台服务               |
|  `run`   |               将本项目启动为 mockstar 前台服务               |
| `status` |                    查看 mockstar 运行状态                    |
|  `stop`  |             停止当前正在运行的后台 mockstar 服务             |
|  `init`  | 初始化项目，分为两个子命令：`project` 初始化项目，如 `mockstar init project`；`mocker` 新建一个新的 mock 数据，如 `mockstar init mocker` |

## 选项解析

|      选项       |                    解释                     |
| :-------------: | :-----------------------------------------: |
| `-v, --version` |                打印版本信息                 |
|  `-h, --help`   |                打印帮助信息                 |
|  `-w, --watch`  | 以监控模式运行，mock 做出更改时自动重启服务 |
|     `--dev`     |      以开发模式运行，将会打印 log 信息      |

