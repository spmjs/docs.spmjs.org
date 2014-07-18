# spm-doc

- pubdate: 2013-08-08
- category: 支付宝插件
- index: 13

-----------

## 仓库

[spmjs/spm-doc](https://github.com/spmjs/spm-doc)

## 安装

```
npm install spm@2.x -g
npm install spm-doc -g
```

## 使用说明

spm doc 为文档管理工具，用于生成，开发，发布文档，是对 [nico](https://github.com/lepture/nico) 的一个封装。

先确认是否已经下载了[默认的 CMD 模块的文档模板](https://github.com/spmjs/nico-cmd)到 `~/.spm/themes/cmd` 。

`spm doc build` 生成文档到 _site 目录下。

`spm doc server` 在 _site 目录启动一个服务用于调试文档。

`spm doc watch` 在 _site 目录启动一个服务用于调试，并监听源码改动，实时刷新。

`spm doc publish` 将文档发布到源上。

`spm doc clean` 清除 _site 目录。

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。

### -f, --force

强制更新，没有缓存

### -p, --port

启动 server 的时候指定端口，默认为 8000。
