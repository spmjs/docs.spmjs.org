# 使用 grunt 构建

- pubdate: 2013-04-11
- author: lepture

-----

## 构建的过程

构建一般分为以下三部分：

### transport

Transport 是将信息不完备的模块转换为信息完备的模块的过程，比如：

```js
// foo.js
define(function(require, exports, module) {
  require('./bar')
})
```

经过 transport 后，变为：

```js
// foo.js
define('foo', ['./bar'], function(require, exports, module) {
  require('./bar')
})
```

我们可使用 [grunt-cmd-transport](https://github.com/spmjs/grunt-cmd-transport) 来做 transport。


### concat

Concat 是合并文件的过程，将一系列文件打包在一起。

我们可使用 [grunt-cmd-concat](https://github.com/spmjs/grunt-cmd-concat) 来做 concat。


### minify

minify 是压缩代码的过程。

我们可使用 [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) 来做 minify。

## 如何构建

我们使用 grunt 做为构建工具，加上相应的 Task 就能构建出我们想要的模块。