# grunt

- pubdate: 2013-03-26
- category: 低层 API
- index: 13

-----

SPM 对 Grunt 进行了些扩展. 包含 grunt 的所有接口.

```js
var grunt = require('spm').sdk.grunt;
```

## invokeTask(name, options)

调用/执行一个 Grunt 任务.

```js
grunt.invokeTask('build', {
  fallback: function(grunt) {
      console.log('fallback')
  }
})
```

它查找本地 Gruntfile.js 中设置的任务, 如果存在, 则会执行. 如果不存在, 则执行 `fallback` 回调.

## loadGlobalTasks(name)

加载一个全局模块集合, 这些模块会定义在 `NODE_PATH` . 类似于 `loadNpmTasks`.