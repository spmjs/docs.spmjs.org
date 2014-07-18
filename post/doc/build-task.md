# 构建过程详解

- pubdate: 2013-08-15
- category: 构建
- index: 32

---

build 的整个任务被分解成一个个 task 执行，会针对各种文件(`.js`、`.css`、`.tpl`、`.handlebars`等)进行处理，下面是所有的任务，接下来针对每个文件进行说明。

```
'clean:build', // delete build direcotry first

'spm-install', // install dependencies

// build stylus
'stylus', // src/*.styl -> .build/stylus/*.css
'transport:stylus', // .build/stylus/*.css -> .build/src/*.css

// build css
'transport:src',  // src/* -> .build/src/*
'concat:css',   // .build/src/*.css -> .build/tmp/*.css

// build js (must be invoke after css build)
'transport:css',  // .build/tmp/*.css -> .build/src/*.css.js
'concat:js',  // .build/src/* -> .build/dist/*.js

// to ./build/dist
'copy:build',
'cssmin:css',   // .build/tmp/*.css -> .build/dist/*.css
'uglify:js',  // .build/tmp/*.js -> .build/dist/*.js

'check-debug',
'check-online:alipay',
'peaches',

'clean:dist',
'copy:dist',  // .build/dist -> dist
'clean:build',

'spm-newline'
```

其中最重要就是 [transport](https://github.com/spmjs/grunt-cmd-transport) 和 [concat](https://github.com/spmjs/grunt-cmd-concat)。

## js 文件

一个模块可以依赖相对模块和绝对模块，如 a.js 依赖 base 模块和 b.js，b.js 没有依赖

```js
// a.js
define(function(require, exports, module){
  require('base');
  require('./b');
  module.exports = 'a';
});

// b.js
define(function(require, exports, module){
  module.exports = 'b';
});
```

`transport:src` 会标准化这两个 js，define 的时候添加 id 和 deps。假设这个模块的 idLeading 是 `arale/widget/1.1.0`（idLeading 是从 package.json 获取的，即 `family/name/version`），会生成如下文件，注意外部模块的依赖是从 package.json 的 alias 中读取的。

```js
// a.js
define('arale/widget/1.1.0/a', ['arale/base/1.1.1/base', 'arale/class/1.1.0/class', 'arale/events/1.1.0/events', './b'], function(require, exports, module){
  require('arale/base/1.1.1/base');
  require('./b');
  module.exports = 'a';
});

// b.js
define('arale/widget/1.1.0/b', [], function(require, exports, module){
  module.exports = 'b';
});
```

`transport:src` 把文件生成到 .build/src, 还会生成 -debug 文件，与源文件唯一的不同是 id 和 deps 都为 -debug。而且最后生成的依赖是打平的，包括所有的依赖。

`concat:js` 将 transport 后的文件进行合并，默认的合并模式为 relative，也就是只合并相对路径的模块。

```
// a.js
define('arale/widget/1.1.0/a', ['arale/base/1.1.1/base', 'arale/class/1.1.0/class', 'arale/events/1.1.0/events', './b'], function(require, exports, module){
  require('arale/base/1.1.1/base');
  require('./b');
  module.exports = 'a';
});
define('arale/widget/1.1.0/b', [], function(require, exports, module){
  module.exports = 'b';
});

// b.js
define('arale/widget/1.1.0/b', [], function(require, exports, module){
  module.exports = 'b';
});
```

最终 -debug 文件输出到 .build/dist 中，而源文件输出到 .build/tmp 下，这是为了压缩做准备。

`uglify:js` 压缩 .build/tmp 下的 js 输出到 .build/dist 下。

## css 文件

css 文件和 js 一样，也有相对模块和绝对模块，通过 `@import` 引用依赖。

```css
// a.css
@import "base"
@import "./b.css"

// b.css
body {background: red;}
```

`transport:src` 会对源文件进行转换，主要给文件加上 define 和转换 import，输出到 .build/src 中。

```css
// a.css
/*! define arale/widget/1.2.1/a.css */
/*! import alice/base/1.0.0/base.css */
/*! import ./b.css */
@import "base"
@import "./b.css"

// b.css
/*! define arale/widget/1.2.1/b.css */
body {background: red;}
```

`concat:css` 将依赖的 css 合并到一个 css 中，输出到 .build/tmp 中，合并过程中会将每个 import 转换成 block。


```css
// a.css
/*! define arale/widget/1.0.0/a.css */
/*! block alice/base/1.0.0/base-debug.css */
...
/*! endblock alice/base/1.0.0/base-debug.css */
/*! block arale/widget/1.0.0/b-debug.css */
body {
  background: red;
}
/*! endblock arale/widget/1.0.0/b-debug.css */

// b.css
/*! define arale/widget/1.0.0/b.css */
body {background: red;}
```

`cssmin:css` 压缩 .build/tmp 下的 css 输出到 .build/dist 下。

## js 依赖的 css 文件

这里是指在 js 文件中所 require 的 css 文件，这种情况与直接 output 的 css 有所不同。

```js
// a.js
define(function(require, exports, module){
  require('./b.css');
  module.exports = 'a';
});

// b.css
body {background: red;}
```

前几个步骤与上面是相同的，js 做 `transport:src` 处理，css 做 `transport:src` `concat:css` 处理

```js
// a.js
define('arale/widget/1.1.0/a', ['./b.css'], function(require, exports, module){
  require('./b.css');
  module.exports = 'a';
});

// b.css
/*! define arale/widget/1.0.0/b.css */
body {background: red;}
```

接下来会做 `transport:css` 处理，也就是将 ./b.css 转换成 ./b.css.js。

```js
// a.js
define('arale/widget/1.1.0/a', ['./b.css'], function(require, exports, module){
  require('./b.css');
  module.exports = 'a';
});

// b.css.js
define('arale/widget/1.0.0/b.css', [], function() {
    seajs.importStyle('body {background: red;}');
});
```

接下来做 `concat:js` `uglify:js` 都与一般 js 相同。

```js
// a.js
define('arale/widget/1.1.0/a', ['./b.css'], function(require, exports, module){
  require('./b.css');
  module.exports = 'a';
});
define('arale/widget/1.0.0/b.css', [], function() {
    seajs.importStyle('body {background: red;}');
});
```

## stylus 文件

暂时还没支持 less 和 sass，但原理是一样的，有需求可以支持。

`stylus` 将 src 下的 styl 文件转换成 css 输出到 .build/stylus，然后再 `transport:stylus` 到 .build/src 下。

之后的操作就跟 css 一样了。

## handlebars 模板文件

在编译的时候会将 handlebars 模板进行预编译，可提高运行时的性能。

```js
// a.js
define(function(require, exports, module){
  require('./b.handlebars');
  module.exports = 'a';
});

// b.handlebars
  <ul>
    {{#each list}}
     <li>{{content}}<li>
    {{/each}}
  </ul>
```

`transport:src` 进行预编译生成 b.handlebars.js

```js
// a.js
define('arale/widget/1.1.0/a', ['./b.handlebars'], function(require, exports, module){
  require('./b.handlebars');
  module.exports = 'a';
});

// b.handlebars.js
define("arale/widget/1.1.0/b.handlebars", ["gallery/handlebars/1.0.2/runtime" ], function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.2/runtime");
    ...
});
```

接下来做 concat:js uglify:js 都与一般 js 相同。
