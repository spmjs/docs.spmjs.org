# 总述

- pubdate: 2013-03-26
- category: 高层 API
- index: 0

-----------

SPM 的 API 说明.

-----------

## 关系

SPM 系统中, 一共有三大部分:

- [spm](https://github.com/spmjs/spm2): 提供了发布, 查找等基本的功能. 其他功能则通过插件形式提供, 如 spm-build, spm-init.
- [grunt](https://github.com/spmjs/spm-grunt): SPM 对 grunt 稍加修改, 名为 [spm-grunt](https://github.com/spmjs/spm-grunt), 你基本上可以把它当成 grunt 一样使用.
- [yuan](/api/yuan): 封装了对远程源服务器操作的 js 接口.

## 如何引入

SPM 是一个标准 nodejs 模块, 所以在安装好 SPM 之后, 只需要通过 `require` 就可引入 SPM 这个模块.

```js
var spm = require('spm')
```

## 查看当前版本

`spm.version` 中包含 SPM 的版本信息.

```
> spm.version
'2.1.11'
```

