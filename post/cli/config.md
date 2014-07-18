# spm-config

- pubdate: 2013-08-07
- category: 包管理工具
- index: 1

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

`spm config` 为 SPM 的配置项，可供 SPM 以及插件使用。这个命令是在操作 `~/.spm/spmrc` 这个文件，可查看 [spmrc 的规范](../doc/spm-global-config#spmrc)。

### 添加配置

```
spm config user.username popomore
```

生成的配置为

```
[user]
username = popomore
```

可以生成多级的配置

```
spm config source:alipay.url http://yuan.alipay.im
```

生成的配置为，`source:alipay` 为一个 section

```
[source:alipay]
url = http://yuan.alipay.im
```

### 删除配置

只能删除一个 section

```
spm config remove source:alipay
```

### 显示所有配置

```
spm config show
```

