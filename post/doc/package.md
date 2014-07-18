# Package.json

- pubdate: 2013-08-15
- category: 规范标准
- index: 22

---

[English Version](http://docs.spmjs.org/en/package)

spm 遵循 [Common Module Definition](https://github.com/spmjs/specification) 的 [packaging draft](https://github.com/spmjs/specification/blob/master/draft/package.md) 规范，每个模块必须有一个 package.json 文件来描述模块自身。

以下为 package.json 的示例

```js
{
    "family": "arale",
    "name": "base",
    "version": "1.0.0",
    "description": "base is ....",
    "keywords": ["class"],
    "author": "Hsiaoming Yang <me@lepture.com>",
    "maintainer": [
      "Hsiaoming Yang <me@lepture.com>",
      "Haoliang Gao <a@chuo.me>"
    ],
    "homepage": "http://aralejs.org/base/",
    "repository": {
        "type": "git",
        "url": "https://github.com/aralejs/base.git"
    },
    "bugs": {
        "url": "https://github.com/arale/overlay/issues"
    },

    "spm": {
        "source": "src",
        "output": ["base.js", "i18n/*"],
        "alias": {
            "class": "arale/class/1.0.0/class",
            "events": "arale/events/1.0.0/events"
        }
    }
}
```

对于 spm 来说 family、name 和 version 三个字段是必须的，标准的模块生成的路径应该是 `family/name/version/file`，比如 jquery 的路径为 `jquery/jquery/1.7.2/jquery`，虽然看起来有冗余，但非常清晰。

package.json 中的 spm 字段是扩展字段，供 spm build 使用。


## family (required)

这个字段为源 (http://spmjs.org) 上的账户名，可指定一类模块，我们称之为「家族」。这个字段存在的原因是为了解决命名冲突的问题，灵感来源于 github。

世界这么大，不同的人开发同名组件是很常有的事情，像 arale/events 和 popomore/events 可以并存。

此外还能将一种类型的模块都放在一个 family 下，如 jquery 以及他的 ui 组件都可以放在 jquery 的 family 下。

命名规范支持小写字母，数字和 -，正则匹配 `[a-z0-9-]`。

## name (required)

模块的名字，命名规范同 family。

## version (required)

版本使用 `MAJOR.MINOR.PATCH` 版本好，正则匹配 `\d+\.\d+\.\d+`。

PATCH 变更为 bugfix，MINOR 为非兼容的修改和功能新增，MAJOR 为定位调整或大范围的重写。

## description

模块的简介，对模块的描述应该能让其他人了解模块的功能，可通过 spm search 搜索。

## keywords

模块的关键字，为一个数组，可通过 spm search 搜索。

## author

模块的作者，也就是最初开发这个模块的人。

支持两种写法

```js
"author": "Hsiaoming Yang <me@lepture.com>"

"author": {
  "name": "Hsiaoming Yang",
  "email": "me@lepture.com"
}
```

## maintainer

后期模块的维护者或贡献者，为一个数组。

## homepage

模块的文档页面。

## repository

模块的仓库。

## bugs

模块问题和讨论的链接。

## private

If you set `"private": true` in your package.json, then spm will refuse to publish it to https://spmjs.org.

This is a way to prevent accidental publication of private repositories. But you can publish to other source center.

## spm

这个字段是供 spm build 使用，请看[构建章节](/doc/spm-build)。

### alias

用来配置模块的依赖，以及依赖的别名，打包时将会从此字段读取相关的依赖链信息。

### devAlias

配置开发中需要用到的模块的别名。

### include

打包策略，可选 `all`、`relative`、`self`，分别表示`打包所有依赖`、`打包相对依赖`、`自打包自身`，
默认为 `relative`。

### output

标识模块的输出文件，可以有多个。

---

例如：

```js
"spm": {
  "include": "all",
  "alias": {
    "jquery": "jquery/jquery/1.7.2/jquery",
    "base": "arale/base/1.0.0/base"
  },
  "devaAlias": {
    "expect": "gallery/expect/0.2.1/expect"
  },
  "output": [
    "index.js",
    "example.js"
  ]
}
```

---


# Old Time

1. root is deprecated, use family instead.
2. dependencies is deprecated, use spm.alias instead.
3. output changed
