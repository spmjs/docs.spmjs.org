# spm.publish

- pubdate: 2013-03-26
- category: 高层 API
- index: 5

-----------

## spm.publish(options)

发布某个组件到源上.

- options.tag: [String] 发布的同时, 打上 tag. 默认为 `'stable'`. 如果是开发版, 可取 `'dev'`.
- options.tarfile: [String] 组件压缩包路径, 默认会生成当前目录中组件的压缩包.

options 的各个字段同 [yuan](/api/yuan#options)

```js
spm.publish({
    source: 'spmjs',
    query: 'arale/class@1.0.0'
});
```

## spm.unpublish(options)

从源上删除某个组件.

```js
spm.unpublish({
    query: 'arale/class@1.0.0'
});
```

