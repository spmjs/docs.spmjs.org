# spm.log

- pubdate: 2013-03-26
- category: 高层 API
- index: 2

-----------

Logger 对象, 提供各种控制台日志输出接口.

**注意: 请尽量使用 spm.log 来输出信息.**

```js
var logger = spm.log;
```


## logger.level

日志等级, 默认为 `'info'`, 可取 `'debug'`, `'info'`, `'warn'`, `'error'`,
这四种日志类型的重要程度依次递增, 这和日志的通用标准保持一致.

设置该值后, 当每条日志的等级 >= 该值后才输出至控制台, 小于的则不会输出.

## logger.config(options)

全局配置 logger 对象主要几个配置项:

- options.verbose: [Boolean] 为 true 时, 强制设置 logger.level 为 debug, 即 debug 及其以上的日志都会被输出.
- options.quiet: [Boolean] 为 true 时, 强制设置 logger.level 为 warn, 即 warn 机器以上的日志才会被输出.
- options.color: [Boolean] 为 true 时, 开启颜色标识, 为 false 时, 关闭颜色标识

## logger.debug(category, formatString, Data)

- category: [String] 信息类别, 在视觉上区分一组信息
- formatString: [String] 格式化字符串
- Data: 数据

例如:

```js
logger.debug('download', 'filename: %s', 'tmp.js');
```

## logger.info(category, formatString, Data)

各参数含义同上.

例如:

```js
logger.info('download', 'filename: %s', 'tmp1.js');
logger.info('download', 'filename: %s', 'tmp2.js');
```

## logger.warn(category, formatString, Data)

各参数含义同上.

例如:

```js
logger.warn('delete', 'filename: %s', 'tmp1.js');
logger.warn('delete', 'filename: %s', 'tmp2.js');
```

## logger.error(category, formatString, Data)

各参数含义同上.

例如:

```js
logger.error('delete', 'filename: %s', 'tmp1.js');
logger.error('delete', 'filename: %s', 'tmp2.js');
```

## logger.log(level, messages)

- level: 日志等级, 可取 `'debug'`, `'info'`, `'warn'`, `'error'`.
- messages: 输出字符串.

例如:

```js
logger.log('debug', 'this a debug info');
logger.log('info', 'this a regular info');
logger.log('warn', 'this a warning');
logger.log('error', 'this a error');
```

**注意: 这个是通用接口, 一般请直接使用 `logger.debug, logger.info, logger.warn, logger.error` 这四个接口.**