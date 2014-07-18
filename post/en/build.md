# Build

- pubdate: 2013-02-21
- category: Documentation
- index: 1

----------

`spm build` focuses on package build, it is not designed as a build tool for everything.

It is based on [grunt][] and shipped with some built-in tasks.

[spm-build][] is not published with spm now, you should install it by yourself:

```
$ npm install spm-build -g
```

## Standard Package

The folder structure of a standard package:

```
package.json
src/
    filename.js
```

After `spm build`, the folder structure:

```
package.json
src/
    filename.js
dist/
    filename.js
    filename-debug.js
```

Learn how to write [package.json](./package.md).


## Customize Build

`spm build` uses [grunt](http://gruntjs.com) as the task manager.
If you want to customize and control the build process, you need to write
your own grunt tasks.

`spm build` will call the `build` task in your `Gruntfile.js`.

An example of `Gruntfile.js`:

```js
module.exports = function(grunt) {
    grunt.registerTask('build', function() {
        console.log('customize build')
    });
}
```

When `spm build`, it will print `customize build`.

You can even write your own build tools with the help of our low level api
[cmd-util](https://github.com/spmjs/cmd-util).

Learn more on these grunt tasks:

- https://github.com/spmjs/grunt-cmd-transport
- https://github.com/spmjs/grunt-cmd-concat
- https://github.com/gruntjs/grunt-contrib-uglify
- https://github.com/gruntjs/grunt-contrib-cssmin

## Remote Gruntfile

Remote gruntfile is designed for team collaboration.

Add a `gruntfile` config in `~/.spm/spmrc`:

```ini
[user]
gruntfile = http://your-company.com/gruntfile.js
```

When `spm build`, it will download the gruntfile, and run the `build` task in this gruntfile.

[grunt]: http://gruntjs.org
[spm-build]: https://github.com/spmjs/spm-build
