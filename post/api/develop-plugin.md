# 如何开发一个 SPM 插件

- pubdate: 2013-09-10
- category: 开发教程
- index: 41

-----------

## 插件目录结构

SPM 插件就是一个基本的 nodejs 模块, 目录结构形如:

```
| -- package.json
| -- index.js
| -- lib/
| -- bin/
| -- scripts/
| -- tests/
```

你可以自己创建上面的目录结构, 但我们更推荐你使用 `spm-init` 来初始化插件模板.

## 插件初始化

第一步, 克隆插件模板到 `.spm/init/` 中.

```
$ git clone git://github.com/spmjs/template-spmplugin.git ~/.spm/init/spmplugin
```

第二步, 按照 spmplugin 初始化插件目录.

```
$ mkdir test-plugin
$ cd test-plugin/
$ spm init spmplugin
// 之后会有命令行提示你输入插件的基本信息.
```

## 安装插件

我们使用了 npm 提供的 `postinstall/uninstall` 机制, 来管理各个 SPM 插件.

第一步, 在 `package.json` 添加 `postinstall` 设置.

```js
{
    "scripts": {
        "postinstall": "scripts/postinstall.js"
    }
}
```

第二步, 创建 `scripts/postinstall.js`.

```js
#!/usr/bin/env node

var spm = require('spm')
spm.plugin.install({
    name: 'init',
    binary: 'spm-init',
    description: 'Generate project scaffolding from a template.'
});
```

主要是需要将当前插件信息注册到 SPM 中, 是通过 SPM 提供的 plugin 接口, 具体 API 请看 [spm.plugin](/api/plugin).

第三步, 设置 `scripts/postinstall.js` 可执行.

```
$ chmod +x scripts/postinstall.js
```

这样, 当你在安装此插件之前, 会先注册到 SPM 中. 这样使用 `spm help` 之后, 就会列出此插件的用法信息.


## 卸载插件

和安装插件类似的过程.

第一步, 在 `package.json` 添加 `uninstall` 设置.

```js
{
    "scripts": {
        "uninstall": "scripts/uninstall.js"
    }
}
```

第二步, 创建 `scripts/uninstall.js`.

```js
#!/usr/bin/env node

var spm = require('spm')
spm.plugin.uninstall('init')
```

主要是需要将当前插件卸载.

第三步, 设置 `scripts/uninstall.js` 可执行.

```
$ chmod +x scripts/uninstall.js
```
这样, 当你在卸载此插件时, 也会同步在 SPM 的插件信息中删除.


