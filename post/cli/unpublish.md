# spm-unpublish

- pubdate: 2013-08-07
- category: 包管理工具
- index: 5

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

如果 publish 的一个模块或某个版本已经不需要了可以 unpublish 掉。

```
$ spm unpublish jquery/jquery
$ spm unpublish jquery/jquery@1.8.2
```

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。


