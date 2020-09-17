---
sidebarDepth: 1
---

# 安装和升级

在使用 MockStar 来搭建项目之前，需要先安装 Node 。

## 1. 安装 Node.js 并验证版本

### 1.1 Node.js 安装

MockStar 是基于 Node.js 来实现的，因此需要在本机安装 [Node.js](https://nodejs.org/)，可以选择：

- 进入 [https://nodejs.org/](https://nodejs.org/) 官网，选择 LTS 版本的 Node 安装
- 采用 [NVM](https://github.com/nvm-sh/nvm) 进行多版本管理

### 1.2 版本验证

完成安装后，执行下面命令，查看当前 Node 版本：

```bash
$ node -v
```

- 如果能正常输出 Node 的版本号，表示 Node 已安装成功（ Windows 系统可能需要重新打开 cmd）
- 建议将 Node.js 版本升级到 `7.6.0` 或以上


## 2. 配置 npm

由于我们将要使用 `npx` 命令来 [初始化项目](./getting-started)，而它会默认走 `npm`，因此，如果遇到无法安装或者安装缓慢的情况，可以切换到淘宝 npm 镜像源。

> [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 是 npm 5.2+ 才支持的特性。

```bash
$ npm config set registry https://registry.npm.taobao.org
```

## 3. 安装 mockstar-cli

[mockstar-cli](https://www.npmjs.com/package/mockstar-cli) 提供了一些命令等，但我们不再建议安装到全局，建议大家配置到 `package.json` 中，本地依赖即可。
