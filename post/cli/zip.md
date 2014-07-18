# spm-zip

- pubdate: 2013-08-08
- category: 支付宝插件
- index: 14

-----------

## 安装

```
npm install spm@2.x -g
npm install apm -g
```

## 使用说明

> 此工具只支持支付宝内部使用

模块生成 zip 包。

```
$ cd widget
$ spm zip
```

还可以直接打包源上已有的文件

```
$ spm zip arale/widget
$ spm zip arale/widget@1.0.0
```

**提醒支付宝的同学：包内的目录结构为 family/name/version，所以要在 assets 目录上传。**

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。

### -I, --input

zip 是将 dist 下的文件打包，input 选项可指定其他目录

### -O, --output

ouput 选项可指定输出的文件名
    
### --format

可指定压缩包内的路径，默认为 `family/name/version`
