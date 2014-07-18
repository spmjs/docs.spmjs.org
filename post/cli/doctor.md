# spm-doctor

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

spm doctor 检查 spm 配置环境和相关插件的版本是否正确。

可以通过这个命令检查当前环境，排错时首推功能。

- 检测 node 环境，如遇到错误可根据文档进行配置。
- 检测依赖库的版本是否过期，如遇到错误可重新安装。
- 检测 spmrc 的配置是否正确，如遇到错误可修改 [~/.spm/spmrc](../doc/spm-global-config#spmrc) 文件对应的配置。
