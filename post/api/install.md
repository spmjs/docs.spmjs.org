# spm.install

- pubdate: 2013-03-26
- category: 高层 API
- index: 3

-----------

## spm.install(options)

安装指定模块.

options 为配置对象, 各字段:

- options.source: [String] 从哪个源上安装, 默认是 `'default'`, 取自 spmrc 的 default 配置. 可以设置 spmrc 中其他定义的字段值.
- options.parallel: [Boolean] 是否并行下载, 默认为 true.
- options.force: [Boolean] 是否强制安装已安装模块.
- options.query: [Array<String>] 指定模块名, 类似: `['arale/base']`.
- options.destination: [String] 目标目录, 默认值取自 spmrc 中的 `'install.path'` 配置.

```js
spm.install({
    dest: ".",
    query: ["arale/base"]
})
```
这就在从默认源上下载了 `arale/base` 模块及其依赖模块至当前目录下的 `sea-modules` .
