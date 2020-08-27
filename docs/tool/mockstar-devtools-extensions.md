# mockstar-devtools-extensions

## 简介
mockstar-devtools-extensions（以下简称插件）是一个使mockstar的使用变得简单的浏览器插件。

项目中如果使用mockstar框架做mock层，那么该插件可以为你提升开发速度，减少页面切换频率。

如果还不熟悉mockstar框架，请参考： [mockstar指南](https://mockstarjs.github.io/mockstar/wiki/ )

## 安装

### chrome应用商店安装

插件已提交，审核中。

### 源码安装

github仓库：https://github.com/mockstarjs/mockstar-devtools-extensions

克隆仓库代码
```bash
$ git clone https://github.com/mockstarjs/mockstar-devtools-extensions
```

安装项目依赖
```bash
$ cd mockstar-devtools-extensions
$ npm install
```

构建插件

```bash
$ npm run build:chrome；
```
此时，您将得到构建产物：chrome-extensions

加载构建好的插件到浏览器

- 打开浏览器扩展程序，开启右上角开发者模式，加载已解压的扩展程序，选中刚刚生成的chrome-extensions目录

<img src="./mockstar-devtools-extensions-images/添加插件.png" alt="image-添加插件" style="zoom:100%;" />
<center>图一</center>

检查插件安装情况
- 确保图一中的插件已经存在插件列表；
- 查看开发者工具中（F12）是否存在mockstar。

<img src="./mockstar-devtools-extensions-images/检查安装.png" alt="image-检查安装" style="zoom:100%;" />
<center>图二</center>

如图二所示，能够看到mockstar，表示已成功安装。

## 快速使用

### Mockstar请求列表

<img src="./mockstar-devtools-extensions-images/请求列表.png" alt="image-请求列表" style="zoom:100%;" />
插件会对请求进行过滤，经过的xhr和fetch都会被展示在请求列表中，静态资源等请求则会被过滤掉。插件的这个模块提供给我们的便利，即不需要开发者再去做额外的`请求过滤`操作。

### 接口详情

点击列表中的具体接口，我们可以进入接口详情，这里展示请求的所有内容，包括请求头、请求参数、请求体以及返回的数据结果等。

<img src="./mockstar-devtools-extensions-images/接口详情.png" alt="image-接口详情" style="zoom:100%;" />

该模块使得到的请求结果可以直接被拷贝，不需要我们再去做数据打印、转换等操作，减少了浏览器和IDE之间的来回切换次数。

### mockstar样例代码

在接口详情页我们还可以看到mockstar样例代码tab。

<img src="./mockstar-devtools-extensions-images/mockstar样例代码.png" alt="image-mockstar样例代码" style="zoom:100%;" />

插件中生成的文件，我们可以直接下载下来，放到对应的文件夹下，完成数据的构造，相对而言是省力的。

### mockstar简易操作
<img src="./mockstar-devtools-extensions-images/mockstar简易操作.png" alt="image-mockstar简易操作" style="zoom:100%;" />

传统开发模式，mockstar的管理后台是一个独立的服务，我们需要再打开一个tab页去管理mock层的接口激活、预览结果以及代理配置等操作。使用插件，我们可以在不切换tab的前提下，直接进行开发和调试，解决了我们开发过程中启动服务过多，页面切换过于频繁的弊端。
