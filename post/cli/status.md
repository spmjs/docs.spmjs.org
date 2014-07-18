# spm-status

- pubdate: 2013-08-08
- category: 通用插件
- index: 11

-----------

## 仓库

[spmjs/spm-status](https://github.com/spmjs/spm-status)

## 安装

```
npm install spm@2.x -g
npm install spm-status -g
```

## 使用说明

使用 status 可以检测某个模块是否已经发布到服务器上了，比如想知道支付宝的 cdn 上是否已经有 seajs，首先要配置 cdn 的地址，可以配多个

```
$ spm config online-status.online https://a.alipayobjects.com
```

开始检测

```
$ spm status seajs // 检测整个 seajs family
$ spm status seajs/seajs // 检测 seajs 的所有版本
$ spm status seajs/seajs@2.1.1 // 检测 seajs 2.1.1 版本
```

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。

### -O, --output

指定 output 可生成一个 json 文件

```
$ spm status seajs -O output.json
```

### --latest

只输出模块 最新的一个版本

### --error

只输出 404 的文件
