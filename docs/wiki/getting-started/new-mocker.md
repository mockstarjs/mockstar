---
sidebarDepth: 2
---

# 02. 添加桩数据

本节我们将实现：在 mockstar 中添加新的桩数据。 

## 1. 新增模块

> 我们推荐为 mocker 设置一个容易识别的名字，一般建议与 CGI 相关，例如取 CGI 的名字为 mocker 名字，这样容易查找。

在 `mockstar-app` 目录下，执行如下命令来快速新建一个 mocker:

```bash
$ mockstar init mocker
```

新建完成之后，我们唯一必须要修改的是目录下的 `config.js` 文件，设置其中的 `route` 值（请求的 path 值，不要加域名和 query 等）。该值用于匹配我们的 CGI，可参考 [Express router](http://expressjs.com/en/4x/api.html#router) 的说明。

我们会在命令行中通过一系列交互，帮助大家初始化一部分配置，如下：

<img src="./newMocker.assets/image-20200706162804409.png" alt="image-20200706162804409" style="zoom:50%;" />

## 2. 查看结果

<img src="./newMocker.assets/image-20200706162657593.png" alt="image-20200706162657593" style="zoom:50%;" />

可以看到我们已经生成了主要的数据文件与配置文件，接下来我们在管理后台中查看：

<img src="./newMocker.assets/image-20200706162930204.png" alt="image-20200706162930204" style="zoom:30%;" />

接下来，可以参照我们上一节中的描述进行 mock 数据的自定义了。