# spm-login

- pubdate: 2013-08-07
- category: 包管理工具
- index: 2

-----------

## 安装

```
npm install spm@2.x -g
```

## 使用说明

对源进行一些写操作时需要用户权限才能进行，首先你需要明确你使用的源是哪个，可以查看 [配置文件的 source 选项](../doc/spm-global-config#source) ，官方的源为 https://spmjs.org/ 。

你需要注册账户获取用户名和密码，然后就可以通过 `spm login` 来登录。直接输入 spm login 根据提示完成。

```
$ spm login

  do you have an account? (Y/n) y

  username: admin
  password: ******
```

也可以直接指定用户名和密码

```
$ spm login -u admin -p ******
```

## 选项

### -s, --source

指定源，详情看 [配置文档](../doc/spm-global-config#source) 。

### -u, --username

指定用户名

### -p, --password

指定密码
