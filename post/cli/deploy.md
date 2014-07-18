# spm-deploy

- pubdate: 2013-08-08
- category: 支付宝插件
- index: 12

-----------

## 仓库

[spmjs/spm-deploy](https://github.com/spmjs/spm-deploy)

## 安装

```
npm install spm@2.x -g
tnpm install spm-deploy -g
```

## 使用说明

> 此工具只支持支付宝内部使用，外部需要自己写 Gruntfile 。

通过 scp 把模块上传到服务器上，服务器要支持 ssh。

默认上传到 assets.dev.example.net

```
$ cd widget
$ spm deploy
```

上传后可访问 http://assets.dev.example.net/arale/widget/1.0.0/widget.js

还可以直接上传源上已有的文件

```
$ spm deploy arale/widget
```

## 选项

### --target


可指定坑位，如 p11，也就是上传到 assets.p11.example.net

```
$ spm deploy --target p11
```

### --host


可指定域名

```
$ spm deploy --host assets.a1.example.net
```

### --username

可指定用户名

### --password

可指定密码
