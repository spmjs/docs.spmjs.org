# Node 环境配置

- pubdate: 2013-09-24
- category: 开始 
- index: 12

---

## 安装 Node

作为一个前端，你需要 Node 环境，[下载地址](http://nodejs.org/download/)

你也可以[通过包管理工具安装](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

> spm 使用的 Node 版本高于 0.8.24。

## 设置 PATH 和 NODE_PATH

**在配置前你要明白自己在做什么。**

`PATH` 用于配置执行文件的路径，当输入一个命令的时候，会按照目录的先后顺序查找，找到后执行这个命令。一般 `PATH` 会有多个目录，以冒号分隔。

在配置 `PATH` 的时候要确认 Node 安装的位置，找到 bin 文件夹，把他放在 PATH 最前面，如 `/usr/local/bin`。

require 全局模块的时候会用到 `NODE_PATH`，会在配置的目录下搜索模块，看看[官方说明](http://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)。

`NODE_PATH` 的配置一般都是相对于 bin 目录的，如 `/usr/local/lib/node_modules`。

如果你的 node 文件为 `/usr/local/bin/node`，那

```ini
export PATH=/usr/local/bin:$PATH
export NODE_PATH=/usr/local/lib/node_modules
```

把他加到你的 `.bash_profile` 或 `.zshrc` 中。

## npm prefix

有时你会发现 npm 的安装目录和 `NODE_PATH` 不是同一个。npm install 会安装到 `/usr/local/share/npm/lib/node_modules`，但 `NODE_PATH` 为 `/usr/local/lib/node_modules`。

这是因为你设置了 prefix (可能是编译的时候加的) 为 `/usr/local/share/npm`。

查看 prefix

```
npm config get prefix
```

修改 prefix

```
npm config set prefix /usr/local
```

## 去除 sudo

使用 npm 安装模块的时候经常要输入 sudo，还要输入密码，这点很让人烦躁，而且会导致很多权限问题。下面你可以简单粗暴的去除 sudo（看看 npm 作者的[软文](http://howtonode.org/introduction-to-npm)）

```
sudo chown -R $USER /usr/local
```

也可以使用 [nvm](https://github.com/creationix/nvm/) 来管理 node 的安装目录和版本，你可以安装在任何目录而不是 `/usr/local`

## 安装 git

版本管理工具也是必须的，可以先[了解 git 的相关内容](http://rogerdudler.github.com/git-guide/index.zh.html)

git 下载地址如下

 -  [git for mac](https://code.google.com/p/git-osx-installer/downloads/list?can=3&q=&sort=-uploaded&colspec=Filename+Summary+Uploaded+Size+DownloadCount)

 -  [git for windows ](https://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)

## windows 环境

下载 [Windows 的 Node](http://nodejs.org/download/) 并安装，如下配置环境变量

```ini
PATH = C:\Users\{{username}}\AppData\Roaming\npm
NODE_PATH = C:\Users\{{username}}\AppData\Roaming\npm\node_modules
```

也可以试试 Windows 的包管理工具 [chocolatey](https://github.com/chocolatey/chocolatey)

安装 nodejs 和 git

```
c:\> cinst git.install
c:\> cinst nodejs.install
```
