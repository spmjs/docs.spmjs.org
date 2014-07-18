# spm.config

- pubdate: 2013-03-26
- category: 高层 API
- index: 1

-----------

提供对 [`~/.spm/spmrc`](../doc/spm-global-config#spmrc) 这配置文件的操作接口.
此接口是对 [`spm.sdk.spmrc`](https://github.com/spmjs/spmrc) 的高层封装, 你也可以直接使用它.

```js
var config = spm.config;
```

## config.get(section|key)

读取 `spmrc` 这个 ini 文件, 并解析后, 获取某个字段值.

```js
config.get('user')
config.get('user.username')
```

## config.set(key, value)

设置字段值.

```js
config.set('user.username', 'xxx')
```

## config.remove(section)

删除某字段值.

```js
config.remove('user')
```
