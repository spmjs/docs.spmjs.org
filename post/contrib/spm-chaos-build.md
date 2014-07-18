# 使用 Spm2 构建业务模块的个人经验

- pubdate: 2013-04-26
- author: edokeh

-----

昨天终于搞定了使用 Spm2 构建业务模块，通过自己编写的 Spm2 插件来实现
写了篇文章在这里 [如何使用 Spm2 压缩合并业务模块](http://chaoskeh.com/blog/how-to-build-seajs-business-module-by-spm2.html)
这里把文章全文贴过来，希望能帮到有相同需求的同学
插件源码在此https://github.com/edokeh/spm-chaos-build ，欢迎交流 @lepture @twinstony

## 引子

为了便于理解，先下个定义

* 标准模块是指 jQuey/underscore 这种不含具体业务逻辑的库
* 业务模块则相反，包含了网站的前端业务逻辑，比如处理表单校验、发送特定的 ajax 请求等等

Spm2 提供了对标准模块打包合并的支持，但是如果你想用它来打包业务模块的话，可能不太适合，为什么呢？

* 标准模块必须有版本号，但业务模块变动频繁，稍微改一下代码就要手工去改版本号，多痛苦啊
* 业务模块的“模块性”往往表现得没有那么强（业务模块常常是没有 exports 的），如果简单页面对应的少量 JS 也当做标准模块来处理，会觉得很别扭
* 标准模块要遵循 src/dist 这样的目录结构，让业务模块也遵循这个约定也很别扭

基于这些原因，我定义了一个针对业务模块的打包策略，并写了相应的 Spm2 插件来实现这个策略
下面我先讲解一下这个策略

## 打包策略

### 目录结构

请看这个例子的代码 https://github.com/edokeh/spm-chaos-build-example
这是一个简单的 web 项目，包含两个页面以及若干 JS 代码
文件结构如下

```
├─html    <--- 这个目录存放 HTML 
│  ├─blogs
│  └─users
└─js    <--- 这个目录存放 JS
    ├─example    <--- 这个目录存放业务模块代码
    │  ├─base
    │  ├─blogs
    │  └─users
    │  └─package.json
    ├─sea-modules    <--- 这个是 SeaJS 标准模块的目录
    │  ├─gallery
    │  └─seajs
    └─seajs-config.js    <-- 整个项目的 seajs 配置文件
```

不管是否用 SeaJS ，这种结构还是很有代表性的，即 HTML 文件（或者 JSP/ Velocity）放在一个目录，而 JS 文件放在另外一个目录
对于 JS 目录内部，我做了这样的约定

* 标准模块和 SeaJS 本身都放在一个目录下（也就是SeaJS 里 base 目录的概念）
* 为所有的业务模块单独建一个目录（目录名可以参考项目名称），不需要遵循 src/dist 的标准目录约定，但是需要一份 package.json 用于配置如何打包
* SeaJS 的配置文件单独存放，不属于这两个目录

页面上要 use 业务模块时，通常是使用 **普通绝对路径**，比如 `seajs.use('/js/example/blogs/index')` 

### 策略

请看：

1. 在 sea-modules 目录下新建业务模块的同名目录 example
2. 通过 package.json 获知哪些 JS 要打包（后面细讲），将这些文件合并压缩后放置到 sea-modules/example 目录下，并且保持相对路径不变
比如 `/js/example/blogs/index.js` --> `/js/sea-modules/example/blogs/index.js`
3. 取得这批新文件内容的 MD5 摘要，然后重命名原文件
比如 `/js/sea-modules/example/blogs/index.js` --> `/js/sea-modules/example/blogs/index-6ae687466e603b80dea58976e6e93548.js`
4. 修改 SeaJS 的配置文件，将上一步的这种映射关系配置进去，参考如下

```javascript
seajs.config({
    map : [
        ["users/index.js",  "users/index-7719c30fc807868c70e9d78ac51e9baa.js"]
    ]
});
```

OK，至此打包完成，这时候要使用打包后的业务模块时，得换用 **顶级标识**，比如  `seajs.use('example/blogs/index')` 
可以看到，其实跟打包前的普通绝对路径有很强的关联，如果能有个开关自动切换就方便多了

所以我在打包的第4步中，还向 SeaJS 配置文件加了这么一句 `seajs.production = true` （对不起@lifesinger，借你的对象存个临时属性）
那么我们页面上引用模块时，可以换成这样

```
seajs.use((seajs.production ? '' : '/js/') + 'example/users/index')
```

恩，这样打包后也不用手工再去改代码了，而且可以适用于任何的后端框架（Rails / PHP / Spring 等等）

### 策略的优点

稍微总结一下这个策略：

* 开发时，目录结构比较自然，或者说比较接近传统的方式，更容易被接受
* 不需要再为版本号烦恼，实际上这里使用了 MD5 来作为版本号
* JS 文件的缓存配置非常简单，只需要为 /js/sea-modules 目录下所有的文件设置超长（比如100年）的 Expires 头即可，不用担心文件更新的问题，因为如果业务模块发生了改动，打包后的文件名字会不一样（内容 MD5 摘要）
* 只需要做一点修改（use 那段），整个打包的过程就可以全自动化了，打包完了之后不必再修改，而且对后端没有依赖


其实熟悉 Rails 的同学应该看出来了，这种策略跟 Assets Pipeline 类似，包括 MD5 文件名、开发/生产模式切换等等
那么这套策略该怎么实现呢？

## 使用 spm-chaos-build 插件打包

我写了一个 Spm2 的插件能够自动完成上面的这个过程，首先需要安装好最新版的 NodeJS
然后安装 Spm2 和这个插件

```
npm install spm -g
npm install spm-chaos-build -g
```

接着配置一下 package.json ，这里与 Spm2 的配置规则基本一致，不过只需要 output 和 alias 两个项即可，参考如下

```js
{
    "spm" : {
        "output" : [
            "blogs/new.js",
            "users/index.js"
        ],
        "alias" : {
            "$" : "gallery/jquery/1.9.1/jquery",
        }
    }
}
```

Spm2 的 output 配置目前只能支持合并 **相对标识** 的模块，对于业务模块来说，有时候还是希望将 **顶级标识** 的模块也合并进来（Spm 1.x 里的 . 和 *）
所以我做了一点扩展，还可以这样配置

```js
"output" : {
    "relative" : [   // 只合并相对标识模块
        "blogs/new.js",
        "users/index.js"
    ],
    "all" : [   // 合并相对标识和顶级标识的模块
        "base/handlebars.js"
    ]
},
```

配置完之后，到 /js 目录下执行命令

```
cd js
spm chaos-build example -C seajs-config.js
```

解释一下，example 是业务模块的目录名，-C 参数用于指定 SeaJS 的配置文件以便打包完之后修改此文件（上面第4步）
如果你的标准模块目录不叫 sea-modules ，那么可以用 -O 参数自定义

```
spm chaos-build example -C seajs-config.js -O libs
```

## nginx gzip bonus

上面提到，你可以为 sea-modules 目录下所有文件设置超长的过期头，另外考虑到前端性能，你可能还希望启用 gzip
在 nginx 里面配置 gzip 很简单，不过默认配置下这个压缩过程是动态实时的，需要消耗服务器资源
所以 nginx 还提供一种预压缩的方式，即由服务器预先生成所有的 gzip 文件，浏览器请求时，直接返回这个压缩过的文件

我的插件也将这个压缩文件的过程集成了进来，通过 --gzip 参数可以开启

```
spm chaos-build example -C seajs-config.js -gzip current
spm chaos-build example -C seajs-config.js -gzip all
```

传递 all 参数表示压缩 sea-modules 目录下所有文件，而 current 只压缩这次生成的业务模块文件
执行后可以发现，目录下多了一堆 .gz 文件，比如 blogs/new-ce1fb85354fa9309a9ff5184e43a22d0.js.gz

然后配置下 nginx 即可，参考如下：

```
location ~ ^/js/sea-modules {
      gzip_static on;
      expires 1y;
      add_header Cache-Control public;
}
```

## 注意事项

* 有个小缺陷，必须使用 script 标签引入 SeaJS 配置文件，而不能使用 data-config ，因为必须让配置文件在 seajs.use 之前执行，参考

```html
<script src="/js/sea-modules/seajs/2.0.0/sea.js"></script>
<script src="/js/seajs-config.js"></script>
<script>
    seajs.use((seajs.production ? '' : '/js/') + 'example/users/index');
</script>
```
* 中间处理模块 transport 的过程与 spm-build 略有不同，做了精简，会将 css/html 后缀的文件转换为模块并合并，但 css文件里面的@import 不会被处理

* 开发时 require 文本文件，需要引入 text 插件，而打包后就不需要了；开发时 require css 文件不需要插件，但打包后需要 style 插件支持。所以我现在这么配置

```javascript
seajs.config({
    plugins : seajs.production ? ['style'] : ['text']
});
```
