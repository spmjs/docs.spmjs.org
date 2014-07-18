# spm.plugin

- pubdate: 2013-03-26
- category: 高层 API
- index: 4

-----------

SPM 提供插件接口给外部, 用于更好地扩展 SPM.

```js
var plugin = spm.plugin;
```

## plugin.install(options)

安装一个插件, 可以在 `postinstall.js` 中使用.

- options.name: [String] 插件名字
- options.binary: [String] 插件在 npm 注册的模块名字
- options.description: [String] 插件描述

```js
plugin.install({
  name: 'init',
  binary: 'spm-init',
  description: 'init a template'
})
```

## plugin.uninstall(name)

删除一个插件, 可以在 `uninstall.js` 中使用.

- name: [String] 插件名字.

```js
plugin.uninstall('init')
```

## plugin.plugins()

返回所有插件

```js
var allPlugins = plugin.plugins();

/* 返回结果格式:
[
  {
    name: 'init',
    binary: 'spm-init',
    description: 'init a template'
  },

  // ...
]
*/
```
