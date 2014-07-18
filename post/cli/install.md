# spm-install

- pubdate: 2013-08-07
- category: 包管理工具
- index: 3

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

`spm install` 可以将源上的包下到本地，以 `family/name/version` 的目录显示 。

模块名应该为 `family/name` 的形式，这是 [CMD 的规范](https://github.com/seajs/seajs/issues/242)。

```
spm install jquery/jquery
```

会下载到 `./sea-modules/jquery/jquery/1.10.1`

如果 family 和 name 相同时可以省略其一

```
spm install jquery
```

默认下载的最新版，不过也可以指定版本

```
spm install jquery@1.7.2
```

还有一种特殊情况，模块并不在源上而在本地，这样可以指定一个磁盘路径。执行后会将 dist 下的代码拷贝到目标路径，一般不依赖于源的小型项目会使用。

```
spm install .
```

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source)。

### -d, --destination

可指定下载目录，默认为 sea-modules。

### -g, --global

下载到全局，路径为 ~/.spm/sea-modules

### -f, --force

install 的缓存机制

```
当前路径 ---> (是)不处理
是否存在  `
         `-> (否) 缓存和源中的 md5 ---> (是)(缓存不存在) 重新下载
                   值是否有差异     `
                                  `-> (否) 取缓存
```

使用 force 选项则不会判断当前路径是否存在，会强制替换当前路径的模块。

## 配置文件

可在 [spmrc](../doc/spm-global-config#spmrc) 设置

```
[install]
; 是否保留 -debug 文件
debugfile = true

; 下载生成的目录结构，必须以 {{filename}} 结尾
format = {{family}}/{{name}}/{{version}}/{{filename}}
```
