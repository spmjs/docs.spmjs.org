# 标准构建

- pubdate: 2013-08-15
- category: 构建
- index: 31

---

SPM 本身并不是一个构建工具，但在整个模块管理的生命周期中构建是至关重要的一步。因为 Seajs 最终使用的 CMD 模块是需要 [transport](./transport.html) 的，这也是构建必须做的一步，除此之外还可以加入合并，压缩，校验，预编译等功能。

标准构建使用了 [spm build](../cli/build.html) 这个插件，这个插件是基于 grunt task 开发的。整个构建流程被拆分成多个 task 并按顺序执行，上一个 task 的输出为下一个 task 的输入，task 之间的输入输出是基于文件的。这样的结构是可扩展的，可以在构建流程中添加自定义的 task。


## 如何构建

使用 spm build 需要指定目录结构，看看[演示](https://github.com/spmjs/spm-build/tree/master/examples/simple)

```
| - src
  | - a.js
  ` - b.js
` - package.json
```

静态文件

```js
// a.js
define(function() {
  require('class');
  console.log('a');
});

// b.js
define(function(require) {
  require('./a');
  console.log('b');
});
```

Package.json 除了[标准字段]()外还要添加 spm 字段用于构建的配置。

```js
{
  "family": "arale",
  "name": "test",
  "version": "1.0.0",
  "spm": {
    "alias": {
      "class": "arale/class/1.0.0/class"
    },
    "output": ["a.js", "b.js"]
  }
}
```

运行 `spm build` 后会在 dist 目录生成4个文件（output 指定的两个文件以及对应的 -debug 文件）

```js
// a-debug.js
define("arale/test/1.0.0/a-debug", [ "arale/class/1.0.0/class-debug" ], function() {
    require("arale/class/1.0.0/class-debug");
    console.log("a");
});


// b-debug.js
define("arale/test/1.0.0/b-debug", [ "./a-debug", "arale/class/1.0.0/class-debug" ], function(require) {
    require("./a-debug");
    console.log("b");
});
define("arale/test/1.0.0/a-debug", [ "arale/class/1.0.0/class-debug" ], function() {
    require("arale/class/1.0.0/class-debug");
    console.log("a");
});
```

spm build 到底做了什么？

首先会对每个 CMD 模块进行 transport 转换

1. 生成 id，package.json 要配置 family、name、version 这三个字段
2. 将 require 的模块替换成 alias 配置的
3. 生成依赖，提取 require 的模块及合并依赖的模块

其次通过配置对模块进行合并(concat)操作，具体查看 [include](#include) 配置。

以上就是 CMD 构建的核心，所以封装了 [transport](https://github.com/spmjs/grunt-cmd-transport) 和 [concat](https://github.com/spmjs/grunt-cmd-concat)，如需要深入了解构建过程，可继续阅读[构建详解](./build-task)。

## 构建的配置

### alias

这个和 seajs.config 的 alias 一样，配置如下

```js
"spm": {
  "alias": {
    "base": "arale/base/1.0.0/base"
  }
}
```

在构建过程中会将 require 的值替换成 alias 中的值

```js
require('base')
=>
require('arale/base/1.0.0/base')
```

如果在 alias 中找不到则不会处理，但会有 warn 提示。如不希望替换也无提示可如下配置

```js
"spm": {
  "alias": {
    "base": "base"
  }
}

require('base') //不会替换
```

### output

通过 output 指定输出的文件，只有指定的文件才会输出到 dist 目录下

```js
// a.js
define(function(require) {
    require('./b')
});

// b.js
define(function(require) {
    require('./c')
});

// c.js
define(function(require) {
});
```

package.json

```js
"output": ["a.js", "c.js"]
```

最终会生成 `dist/a.js` 和 `dist/c.js`，`dist/a.js` 会包括 `a.js` `b.js` `c.js`，`dist/c.js` 只包括 `c.js`。

### include

构建的时候会打包相对的模块，这是由 include 属性决定的，默认为 `"include": "relative"`

```js
require('./b'); <= 相对依赖，会打包进来
require('base'); <= 外部依赖，不会打包进来
```

如果想打包所有的依赖可以如下配置 package.json，会把外部依赖（包括依赖的依赖）也打包进文件。

```js
"spm": {
  "include": "all"
}
```

### styleBox

样式隔离方案，具体功能见 [aliceui/aliceui.org#9](https://github.com/aliceui/aliceui.org/issues/9)

在 package.json 中添加如下属性就可以启动样式隔离。spm build 时会帮你把 JS 中 require 的样式进行封装。

```js
"spm": {
  "styleBox": true
}
```

> 注：需要配合 [arale/widget@1.1.0+](http://aralejs.org/widget) 进行使用。
