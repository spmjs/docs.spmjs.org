# spm-plugin

- pubdate: 2013-08-07
- category: 包管理工具
- index: 8

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

`spm plugin` 可安装和卸载 plugin，plugin 需要符合 [插件的开发规范](/api/develop-plugin) 才能正确安装。

### 安装 plugin

```
spm plugin install init
```

执行后会用 npm 安装 spm-init，然后将命令挂在到 spm 上。可使用 `spm init` 或 `spm-init` 执行命令。

### 卸载 plugin

```
spm plugin uninstall init
```

卸载 plugin 后无法使用 `spm init`，也不显示在 plugin 列表中，但还是可以使用 `spm-init`。

### 显示所有 plugin

```
spm plugin list
```
