# spm-init

- pubdate: 2013-08-07
- category: 通用插件
- index: 10

-----------

## 仓库

[spmjs/spm-init](https://github.com/spmjs/spm-init)

## 安装

```
npm install spm@2.x -g
npm install spm-init -g
```

安装模板需要 git，确保能在命令行里运行 git。

## 使用说明

可以根据一个指定的模板初始化当前目录，但首先需要 [安装模板](#安装模板)。

```
spm init
```

### 模板存放路径

模板文件默认路径为 `~/.spm/init`，可以通过配置（`~/.spm/spmrc`）添加

```
[init]
template = ~/.spm-init
```

或执行

```
$ spm config init.template ~/.spm-init
```

### 安装模板

默认模板会自动从 github 上抓取，地址是 https://github.com/spmjs/template-cmd/ ，模板会下载到上面提到的路径。


### -u, --upgrade

更新模板，会执行 `git pull`

```
$ spm-init --upgrade
```

###  -f, --force

当前目录存在文件仍然继续执行。
