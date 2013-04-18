#关于Grunt，从一个简单的配置开始！
- pubdate: 2013-04-18 15:09
---
`author: twinstony`

玩儿转grunt，需要了解的知识稍微多一点，这里仅以一个简单的配置介绍grunt，希望能让你尽快的认识她。

进一步的了解，请移步官网：[Grunt](http://gruntjs.com/ "Grunt")

## 简介
Q：Grunt为何物？

A：一个专为JavaScript提供的构建工具。

Q：啥是构建工具？

A：在项目部署上线前，通常要将源文件压缩，合并，并拷贝到bch或trunk中。
在将js模块化后，又多了一个分析，提取业务代码中所依赖模块的工作。
解决这一系列繁重工作的自动化工具，称之为构建工具。

Q：grunt是如何工作的？

A：刚刚接触grunt，举个例子可能不太恰当，但应该可以让你先比较准确的认识她。
就好像一个万能工厂（grunt），只负责执行任务（Task），不关心每个任务到底都干了什么。
这些任务比如：

* clean:删除临时文件

* uglify:压缩

* qunit:测试

* concat:合并

任务流程可能是这样的：

* task:clean

* task:uglify

* task:qunit

* task:concat

## 安装

前提是你已经安装了`nodejs`和`npm`。 你可以在 [nodejs.org](http://nodejs.org/) 下载安装包安装，也可以通过包管理器（比如在 Mac 上用 homebrew，同时推荐在 Mac 上用 homebrew）。

**安装grunt CLI**

```
npm install -g grunt-cli
```

按照官方的说法，`grunt-cli`只是为了在同一台机器上安装不同的`grunt`版本，那么咱们先不去管他。

**在项目中使用grunt**

首先需要往项目里添加两个文件：`package.json`和`Gruntfile.js`

* package.json:该文件用来为npm存放项目配置的元数据，与grunt关系最大的配置在devDependencies中。

```
"devDependencies": {
        "grunt": "~0.4.1",
        "grunt-cmd-transport": "~0.2.0",
        "grunt-cmd-concat": "~0.2.0",
        "grunt-contrib-uglify": "~0.2.0",
        "grunt-contrib-clean": "~0.4.0"
    }
```

* Gruntfile.js:注意G的大写，这个文件就是`grunt`的配置了，其中详细定义了每个任务的细节和执行任务的顺序等。

**安装grunt**

在命令行进入项目所在目录，键入如下命令即可，`npm`会根据`devDependencies`中的配置，将需要的`grunt`及其插件下载到你的项目目录中。

```
npm install grunt --save-dev
```


## 传说中简单的配置T-T

终于到了简单配置环节，就从`Gruntfile.js`入手，一点点的认识`grunt`。

一个几乎是`Gruntfile.js`通用的写法：

```
    module.exports = function(grunt) {
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json');
      });
    };
```

由于篇幅关系，这里只简单说下。`grunt`配置的主体都在`grunt.initConfig`中

`pkg: grunt.file.readJSON('package.json')`是为了以后在其它任务（task）中方便读取`package.json`已经定义好的值。

下面我们来了解下任务（task）：

```
    transport: {
            dialog: {
                files : [
                    {
                        src : '*',
                        dest : '.build/styles/component/dialog/src'
                    }
                ]
            }
        }
```

`transport`就是一个任务（task），她是这次`spm2`所提供的一系列`grunt`构建插件的其中一个，该插件主要负责提取模块中的依赖，
并为每个模块设置`模块ID`。`dialog`是任务的其中一个目标（Target），`files`中定义了要对哪些文件执行该任务（src），
以及执行任务后，生成的文件放在什么地方(dest)。

下一个任务是合并(concat)：

```
    concat: {
            dialog: {
                files: {
                    "dist/styles/component/dialog/src/dialog.js": [".build/styles/component/dialog/src/dialog.js"]
                }
            }
        }
```

`concat`的内容是合并依赖的模块，有很多需要设置的地方，因为本文档目的只是介绍`grunt`，
所以这里简单说，该配置采用了另外一种`src`和`dest`的写法。相信大家只要理解了任务（task）和目标（target）后应该很好理解。

最后，加载`grunt`需要的插件：

```
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
```

还要告诉grunt该怎么执行这些任务：

```
    grunt.registerTask('build', ['transport', 'concat']);
```

完整的`Gruntfile.js`：

```
    module.exports = function(grunt) {
          grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            transport: {
                        dialog: {
                            files : [
                                {
                                    src : '*',
                                    dest : '.build/styles/component/dialog/src'
                                }
                            ]
                        }
                    },
            concat: {
                        dialog: {
                            files: {
                                "dist/styles/component/dialog/src/dialog.js": [".build/styles/component/dialog/src/dialog.js"]
                            }
                        }
                    }
          });

          grunt.loadNpmTasks('grunt-cmd-transport');
          grunt.loadNpmTasks('grunt-cmd-concat');

          grunt.registerTask('build', ['transport', 'concat']);
        };

```

最后的最后，进入项目所在目录，命令行输入：

```
grunt build
```

一切顺利的话，你就可以看到变化了！













