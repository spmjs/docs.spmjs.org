# spm-watch

- pubdate: 2013-08-08
- category: 支付宝插件
- index: 17

-----------

## 安装

```
npm install spm@2.x -g
npm install apm -g
```

## 使用说明

> 此工具只支持支付宝内部使用

开发调试的一个简单实现，每当文件发生变化后会自动 build 和 deploy。选项和 deploy 的配置一致。

## 选项

### --target


可指定坑位，如 p11，也就是上传到 assets.p11.alipay.net

```
$ spm watch --target p11
```

### --username

可指定用户名

### --password

可指定密码
