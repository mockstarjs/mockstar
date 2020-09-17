---
sidebarDepth: 0
---

# 快速入门

## 新建项目

按照 [安装和升级](../install.md) 一文配置好环境之后，我们将开启学习 **mockstar 数据 mock**之旅。接下来，我们将以生成的模板项目为例，为大家讲解。

在开始之前，请再次确认下环境是否准备好：

```bash
# node 版本需 >= 10.18.1
$ node -v

# 使用脚手架初始化项目
$ npx mockstar-cli init project
```

## 目录结构

```bash
.
├── README.md
├── mockstar.config.js
├── package.json
└── src
    ├── lib
    │   └── base-cgi.js
    └── mockers
        └── demo_cgi
            ├── README.md
            ├── base.js
            ├── config.json
            ├── index.js
            ├── mock_modules
            │   ├── error_100000
            │   │   ├── config.json
            │   │   └── index.js
            │   ├── success_type_1
            │   │   ├── config.json
            │   │   └── index.js
            │   └── success_type_2.json
            └── static
                ├── logo.jpg
                └── sub
                    └── workflow.png
```

使用脚手架新建的目录结构如上面所示，这也是我们推荐的目录结构。

- `src` 文件夹，存放最主要的代码逻辑

  - `lib` 文件夹，存放一些 mocker 桩对象用到的公共方法及数据
  - `mockers` 文件夹，存放生成的 mocker 桩对象
  - `mockers/*/mock_modules` 文件夹，存放同一个接口的不同返回数据

- `mockstar.config.js` 配置文件，配置对应 mocker 桩对象存放的地址
