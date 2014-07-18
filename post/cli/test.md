# spm-test

- pubdate: 2013-08-08
- category: 支付宝插件
- index: 15

-----------

## 安装

```
npm install spm@2.x -g
npm install apm -g
```

## 使用说明


> 此工具只支持支付宝内部使用

spm test 使用 phantomjs 跑测试用例，测试 src 和 dist 代码，并使用 jscoverage 生成覆盖率文档。 

**需要使用 [nico-cmd](https://github.com/spmjs/nico-cmd) 作为文档模板，并用 spm doc 生成本地测试文档先。**
