# 文件目录结构

使用 `create-mockstar-app` [创建完项目](../getting-started) 之后，文件目录大概是这样的：

```
.
├── README.md
├── helpers
│   └── base-cgi.js
├── mock_server
│   └── demo_cgi
│       ├── README.md
│       ├── base.js
│       ├── config.json
│       ├── index.js
│       ├── mock_modules
│       │   ├── debug
│       │   │   ├── config.json
│       │   │   └── index.js
│       │   ├── error_100000
│       │   │   ├── config.json
│       │   │   └── index.js
│       │   ├── success_js_module
│       │   │   ├── config.json
│       │   │   └── index.js
│       │   └── success_json_file.json
│       └── static
│           ├── some-describ.png
│           └── sub
│               └── some-workflow.png
├── mockstar.config.js
└── package.json
```

对于这个目录结构，稍微解释一下。

- `mockstar.config.js` 配置文件
- `helpers` 工具库文件夹，建议放置公共函数
  - `base-cgi.js` 格式化输出接口的一个函数库，可以根据实际情况使用或更高
- `mock_server` Mock 数据文件夹，存放我们的 Mocker（桩对象）和 Mock Modules（桩数据）
  - `demo_cgi` 文件夹，一个 Mocker（例如一个接口） 存放一个目录，这里的 `demo_cgi` 是我们示例的接口，建议按照接口名字来区分。有多少接口就应该有多少个对于的 Mocker 文件夹。
    - `README.md` 不是必须的，但是如果有，则会渲染出来，用于描述接口的情况
    - `config.json` 用于定义路由等配置
    - `index.js` 注册为 Mocker ，以便自动被识别出来
    - `mock_modules/xxx` 为桩数据，一种数据对于一个，支持符合 `CommonJS` 规范的 Node 模板或者 `json` 格式的文件


