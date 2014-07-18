# yuan

- pubdate: 2013-03-26
- category: 低层 API
- index: 12

-----

此模块用于与 SPM 源交互, 外部模块放在 spmjs.org, 内部模块放在 yuan.alipay.im.


```js
var yuan = require('spm').sdk.yuan
```

## options

- options.source: [String] 从哪个源上安装, 默认是 `'default'`, 取自 [spmrc](../doc/spm-global-config#spmrc) 的 default 配置. 可以设置 spmrc 中其他定义的字段值.
- options.force: [Boolean] 设置请求头中的 'X-Yuan-Force'.
- options.lang: [String] 设置请求头中的 'Accept-Language', 默认为 `'en_US'`.
- options.tag: [String] 发布的同时, 打上 tag. 默认为 `'stable'`. 如果是开发版, 可取 `'dev'`.
- options.tarfile: [String] 组件压缩包路径, 默认会生成当前目录中组件的压缩包.


## login

登陆账户.

```js
yuan(options).login(data, callback)
// - data.username
// - data.password
```

## register

注册账户.

```js
yuan(options).register(data, callback)
// - data.username
// - data.password
// - data.email
```

## info

查找特定模块的元信息.

```js
yuan(options).info(data, callback)
// - data.family
// - data.name
// - data.version
// - data.tag
```

## Search

查询模块.

```js
yuan(options).search(data, callback)
// - data.query
```

## publish

发布某个模块.

```js
yuan(options).publish(data, callback)
// - data.family
// - data.name
// - data.version
// - data.private
```

## unpublish

从源服务器上删除某个模块.

```js
yuan(options).unpublish(data, callback)
// - data.family
// - data.name
// - data.version
// - data.private
```

## upload

发布文档.

```js
yuan(options).unpublish(data, callback)
// - data.family
// - data.name
// - data.tag
// - data.tarfile
// - data.private
```