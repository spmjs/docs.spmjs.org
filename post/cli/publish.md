# spm-publish

- pubdate: 2013-08-07
- category: 包管理工具
- index: 4

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

publish 是包管理工具非常重要的一个功能，可以将你的代码分享给他人的唯一途径。

publish 对 package.json 有一定的要求，信息必须完备， **必须在 package.json 中指定 family、name 和 version**。

发布的时候只需执行 `spm publish`，首先检查 package 以及 dist 目录，然后将整个目录打包，最后上传。

`spm publish` 不仅可以发送代码还可以发送文档，下面的命令是发布 _site 下的文档，arale 的文档就是用这种方式。

```
spm publish --doc _site
```

## 选项

### --tag

publish 默认是 stable 版，如果你想 publish 一个测试版给其他模块调试，那么可以指定 tag 选项。

```
$ spm publish --tag dev
```

这样其他人 install 的时候就不会下载这个测试版。

### --doc

可发布文档，doc 选项指定一个文档目录

```
spm publish --doc _site
```

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。

### -f, --force

一般只能 publish 一次，指定 force 选项可以强制覆盖上一次。

### --no-tarball

如果只需要更新 package 的信息可以加这个选项，就不会上传文件包了。

