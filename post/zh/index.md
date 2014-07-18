# spm

- pubdate: 2013-03-20
- index: 0

spm 是一个包管理器，它不是 **构建工具**。

------


使用 npm 安装：

    $ npm install spm@2.x -g

记得一定要加上 `-g`，这样才能全局可访问。

如果你想尝试最新的开发版，可安装：

    $ npm install spm@ninja -g

你还可以从 [github](http://github.com/spmjs/spm2) 上获取源码安装。

现在来尝试一下 `spm`：

    $ spm

如果你没有设置过 `NODE_PATH`，spm 将会提醒你设置 `NODE_PATH`：


```
Please set environment variable NODE_PATH in ~/.zshrc:

    export NODE_PATH=/usr/local/share/npm/lib/node_modules
```

Windows 用户请设置环境变量 `NODE_PATH`。


## 帮助

下面介绍一下 spm 自带的命令，除了自身的命令外，你还可以安装扩展来增加命令。我们先看一下帮助信息：

    $ spm -h

或者：

    $ spm help

获取子命令的帮助信息：

    $ spm install -h

或者：

    $ spm help install


## 构建

spm 使用 [grunt-spm-build][] 作为构建工具，spm 只做标准的可发布的包的打包工作，任何有关构建的问题请在 [grunt-spm-build][] 里提 issue。

[grunt-spm-build]: http://github.com/spmjs/grunt-spm-build

**请不要在 spm 里提构建相关的 issue，spm 不是构建工具**

下面介绍一下标准包的打包，例如我们有一个 **hello** 的包：

```
package.json
src/
    hello.js
```

其中 `hello.js` 的源码假设为：

```js
define(function(require, exports, module) {
    exports.name = 'hello'
    exports.Class = require('class')
})
```

`package.json` 的内容为：

```js
{
    "family": "lepture",
    "name": "hello",
    "version": "1.0.0",
    "description": "hello spm",
    "spm": {
        "alias": {
            "class": "arale/class/1.0.0/class"
        },
        "output": ["hello.js"]
    }
}
```

现在我们来安装依赖，和构建 `hello` 这个包：

    $ spm install
    $ spm build

经过 build 后，我们的 `hello.js` 将会包含 id 和依赖关系：

```js
define('lepture/hello/1.0.0/hello', ['arale/class/1.0.0/class'], function(require, exports, module) {
    exports.name = 'hello'
    exports.Class = require('arale/class/1.0.0/class')
})
```

目录结构将会变成：

```
package.json
src/
    hello.js
dist/
    hello.js
    hello-debug.js
```

## 安装

你已经在构建这一环节里使用过 `spm install` 了，更多关于 `install` 的信息可查看帮助：

    $ spm help install


## 注册与登录

你可以在 [spmjs.org](https://spmjs.org) 上注册一个账户，也可以使用 `spm login` 来注册：

    $ spm login
    
    do you have an account? (Y/n)

如果你回答 `n` 的话，你就可以注册了：

    do you have an account? (Y/n) n
    
    username:
    email:
    password:

如果你回答 `y`，`spm` 将会引导你去登录。

## 发布你的模块

我们需要你的贡献，将自己引以为傲的模块发布到 spmjs.org 上吧。

你已经在 spmjs.org 上注册了自己的账号，并且已使用 `spm login` 登录了。将 `pakcage.json` 中的 `family` 换成你的账户名，例如我的是 `lepture`。

然后我们重新构建一次：

    $ spm build

现在把这个模块发布到出去：

    $ spm publish

更多帮助信息请查看：

    $ spm help publish

如果你不小心发布了一个错误的版本，你可以重新发布一个新的模块来代替它：

    $ spm publish -f

你还可以删掉这个版本：

    $ spm unpublish family/name@version

你甚至可以将整个项目都删掉（**请注意，这是一个不可恢复的操作**）：

    $ spm unpublish family/name

## 搜索

你可以使用 `info` 和 `search` 来获取模块的信息：

```
$ spm help info
$ spm help search
```
