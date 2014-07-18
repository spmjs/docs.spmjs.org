# 新手入门

- pubdate: 2013-08-15
- category: 开始
- index: 1

---

[English Version](http://docs.spmjs.org/en/)

spm 是 CMD 的包管理工具，需要和 Sea.js 配合使用。使用前请先阅读一下 [Sea.js 的官方文档](http://seajs.org/)，确保已经了解 Sea.js 及其使用方式。

> spm3 已正式发布，欢迎访问 http://spmjs.io

## 安装和配置

安装 spm，在此之前请先[配置 Node 环境](./environment.html)

```
$ npm install spm@2.x -g
```

spm 核心只有包管理功能，除此之外还提供了很多[插件](../cli/help.html)。

配置[源服务](https://spmjs.org/)，在源服务上可以找到所有人分享的模块。

```
$ spm config source:default https://spmjs.org
```

## 安装模块

使用 spm 可以安装源上的任意模块到你的项目中，默认将安装到当前目录下的 sea-modules 目录中。

```
$ spm install seajs
$ spm install jquery
$ spm install arale/position@1.0.0
```

具体操作可参考 `spm help install`。

当然你可以像 npm 一样，将你的依赖写到 [package.json](http://docs.spmjs.org/doc/package) 中去，然后使用 `spm install` 一键安装。

## 初始化项目

使用 [spm-init](http://docs.spmjs.org/cli/init) 命令可以初始化一个标准的 CMD 模块。

```
$ npm install spm-init -g
$ spm init
```

## 模块构建

spm 并没有限制模块的目录结构和组织方式，但是会有推荐的方式，可以先看下[标准模块](https://github.com/spmjs/spm-build/tree/master/examples/simple)和[自定义模块](https://github.com/spmjs/spm-build/tree/master/examples/simple-grunt)的示例。

虽然模块的组织方式不同，但上线前都需要做 [transport](./transport.html) 处理，所以 spm 还提供了构建工具，也分为[标准构建](./spm-build.html)和[自定义构建](./grunt-build.html)两种。

## 发布模块

写好一个模块后，可以用以下命令发布你的模块到源上。

```
$ spm publish
```

在 spmjs.org 上，你需要先[注册](https://spmjs.org/account/signup)一个用户，然后在命令行中进行登录来获得发布的权限。
你可以发布模块到自己注册的用户名（family）下。

```
$ spm login
```

## 插件

spm 还提供一些插件，也欢迎更多插件开发者，[如何开发?](../api/develop-plugin.html)。

- [spm-build](../cli/build.html) 构建工具
- [spm-init](../cli/init.html) 初始化模块
- [spm-status](../cli/status.html) 检查线上 http 状态

## 基本命令的使用视频

<iframe style="margin-bottom:30px;" src="http://ascii.io/a/2533/raw" frameborder="0" width="566" height="646"></iframe>


## 贡献

我们非常欢迎加入我们的大家庭，一起来维护 spm，[如何贡献?](./contribute.html)
