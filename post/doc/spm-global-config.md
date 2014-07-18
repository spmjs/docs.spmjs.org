# spmrc 配置文件

- pubdate: 2013-09-10
- category: 规范标准
- index: 21

----------

安装好 SPM 之后, 会在用户目录下生成 `.spm` 目录, 里面包含了各种各样的信息, 在此说明下各个文件/目录的含义.

```
.spm
| -- spmrc
| -- deps.json
| -- plugins.json
| -- run.json
| -- init/
| -- themes/
` -- cache/
```

## spmrc

spmrc 为 SPM 及其插件所使用的配置文件，文件为 `~/.spm/spmrc`，可通过[类库](https://github.com/spmjs/spmrc)和 [spm config]() 进行操作。

spmrc 是以 ini 形式存储的，结构如下

```ini
[section1]
name = property

[section2]
name = property
```

以下会列举一些全局的配置

### user

可指定一个 gruntfile 的路径，可以配置本地或远程的。

```ini
[user]
gruntfile =
```

通过 gruntfile 可高度自定义，如

1. 自定义命令

    在 gruntfile 注册一个 task hello，就可以用 spm hello 执行。

2. 覆盖原有命令

    在 gruntfile 重置下 build 的任务，可参考 [apm](https://github.com/spmjs/apm/blob/master/Gruntfile.js)。

### source

用 source 来指定源，可以指定多个。

```ini
[source:default]
url = http://spmjs.org
auth =

[source:alipay]
url = http://spmjs.alipay.com
```

然后可以通过 -s 指定，使用 default 可不指定，如将模块上传到 alipay 的源

```
spm publish -s alipay
```

任何人都可以从源读取，但是**写操作是要登录的**。先到源上注册账号通过 [spm login]() 登录，配置文件中会生成一个 auth 的 token。

可支持代理

```ini
[source:default]
url = http://spmjs.org
proxy = username:password@proxy.server:port
```

## run.json

用于统计 SPM 各个命令执行了多少次和最后执行时间.

## deps.json

存储当前 SPM 依赖的各个模块的版本号, 以便在 `spm check` 时查找依赖更新.

## plugins.json

存储当前安装的所有 SPM 插件信息.

## init/

存放不同类型模块的模板文件, 主要用于 `spm init xxx` 时, 从 init/xxx 目录获取配置及模板文件来拷贝.

每个目录其实是克隆了 https://github.com/spmjs 下 template-xxx 仓库, 所以可以直接 git pull 操作.

## themes/

文档生成时使用的不同主题, 目前两套 arale 和 alice.

arale 克隆的是 https://github.com/aralejs/nico-arale 仓库, alice 克隆的是 https://github.com/aliceui/nico-alice 仓库.

## cache/

`spm install` 时临时缓存的模块目录.
