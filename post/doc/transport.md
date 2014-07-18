# Transport

- pubdate: 2013-08-15
- category: 规范标准
- index: 23

----------

## transport 是什么？

根据 [CMD 的模块定义规范](https://github.com/seajs/seajs/issues/242) 可以定义如下模块

```js
define(function(require, exports, module) {
  var Base = require('base');
  var Widget = Base.extend({
    ...
  });
  module.exports = Widget;
})
```

但这样写在线上运行会存在一些问题

1. 无法在一个文件中定义多个模块

    这个问题在 combo 中尤为明显，多个 js 文件被动态合并成一个文件下载下来。

    ```js
    // a.js
    define(function(){});
    // b.js
    define(function(){});
    // c.js
    define(function(){});

    // a.js,b.js,c.js
    define(function(){});
    define(function(){});
    define(function(){});
    ```

    因为模块是跟 url 一一对应的，所以合并后无法匹配相应的模块了。这个问题可以用添加 id 的方式解决。

2. 需要分析代码解析依赖

    seajs 是通过分析 factory 的源码获取依赖的，提取所有的 require 即所有的依赖。但是在线上进行依赖提取是比较耗性能的，可以在构建的时候提前提取依赖。

    构建时提取的依赖是扁平化的，会提取该模块所有的依赖，这样可以先将依赖的所有模块提前下载下来。

    ```js
    // a.js
    define(function(require){
      require('./b');
    });
    // b.js
    define(function(require){
      require('./c');
    });
    // c.js
    define(function(){});

    // 生成的 a.js 会包含 b.js 和 c.js 的依赖
    define('a', ['./b', './c'], function(require){
      require('./b');
    });
    ```

这些问题在 [seajs 官网](https://github.com/seajs/seajs/issues/426)也有说明，所以最后上线的模块应该是 define(id, deps, factory) 这种形式的，对原始的模块进行的转换我们称之为 transport。

## id 规范

Transport 后每个模块都有自己的标识，即为 id。id 是由 idleading（标准格式为 `family/name/version`） 和文件名组成的。以下示例的 id 为 `arale/base/1.0.0/base`。

```js
// base.js
define(function(){});

// transport 后的 base.js
define('arale/base/1.0.0/base', ['arale/class/1.0.0/class','arale/events/1.0.0/events','./aspect','./attribute'], function(){});
```

这个 id 规范会在多处使用

1. 物理存放路径/URL

    base.js 的访问路径为 http://assets.spmjs.org/arale/base/1.0.1/base.js ，路径中包含 `family/name/version`。

2. 模块的 id

   define 的 id 需要跟 url 匹配，具体如何匹配是根据 seajs 而定的，一般 seajs 会放在根目录(`/sea.js`，`/seajs/sea.js`，`/seajs/seajs/2.1.1/sea.js` 都可以)，所以 base 就为 http://assets.spmjs.org 。

   "请求的 url" = "seajs 的 base" + "define 的 id"，如

   "http://assets.spmjs.org/arale/base/1.0.1/base.js" = "http://assets.spmjs.org" + "/arale/base/1.0.1/base.js"

3. 包的 id

    通过 spm 管理模块包，也需要定义 family，name 和 version。如 https://spmjs.org/arale/base/

更多内容可查看[ID 和路径匹配原则](https://github.com/seajs/seajs/issues/930)。
