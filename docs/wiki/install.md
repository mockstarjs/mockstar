---
sidebarDepth: 1
---

# 安装和升级

在使用 matman 来构建项目之前，需要先安装 Node 和 [mockstar-cli](https://www.npmjs.com/package/mockstar-cli) 。

## 01. 安装 Node.js 并验证版本

### 1.1 Node.js 安装

mockstar 是基于 Node.js 来实现的，因此需要在本机安装 [Node.js](https://nodejs.org/)，可以选择：

- 进入 [https://nodejs.org/](https://nodejs.org/) 官网，选择 LTS 版本的 Node 安装
- 采用 [NVM](https://github.com/nvm-sh/nvm) 进行多版本管理

### 1.2 版本验证

完成安装后，执行下面命令，查看当前 Node 版本：

```bash
$ node -v
```

- 如果能正常输出 Node 的版本号，表示 Node 已安装成功（ Windows 系统可能需要重新打开 cmd）
- 值得注意的是，一定要确保 Node.js 版本在 `10.18.1` 及以上，否则将无法运行

## 02. 安装 matman-cli

### 2.1 初始化项目

[mockstar-cli](https://www.npmjs.com/package/mockstar-cli) 提供了一些命令行，用于初始化项目和构建等。Ï

执行下面的命令初始化你的 mockstar 项目：

```bash
# 如果安装缓慢请大家配置镜像
$ npm config set registry https://registry.npm.taobao.org

# 推荐大家使用 npx 进行初始化，保证运行 cli 的最新版本
$ npx matman-cli init project

# 或者使用
$ npm install -g mockstar-cli
$ mockstar init project
```

### 2.2 命令参考

这里我们只演示了 CLI 工具**初始化项目**的功能，我们提供更为详细的 [API 参考](/tool/mockstar-cli.html)。

