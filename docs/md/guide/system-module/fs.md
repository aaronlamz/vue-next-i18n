# 文件系统
文件系统（File System）是 Node 中使用最为频繁的模块之一，该模块提供了读写文件的能力，是借助于底层的 libuv 的 C++ API 来实现的。

前端常见的构建工具，比如 Webpack、Gulp 等，都会使用文件系统模块来读取文件，并且把文件内容输出到磁盘上。

## 模块使用

node:fs 模块支持以标准 [POSIX](https://www.zhihu.com/question/21048638) 函数建模的方式与文件系统进行交互。

Node API 支持Promise 异步、同步和回调的形式。来看一个简单的例子：

```javascript
// 基于 Node.js 18.4.0 版本 ES6 的文件系统模块
// 基于 promise 的 API
import * as fs from 'node:fs/promises';

// 使用回调和同步的 API：
import * as fs from 'node:fs';
```

所有文件系统操作都具有同步、回调和基于 promise 的形式，并且可以使用 CommonJS 语法和 ES6 模块进行访问。

* Promise 示例
```javascript
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello'); // unlink(path) 如果 path 指向符号链接，则删除该链接，但不影响链接所指向的文件或目录。 如果 path 指向的文件路径不是符号链接，则删除文件。
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.error('there was an error:', error.message);
}
```

* 回调的示例
回调的形式将完成回调函数作为其最后一个参数，并异步地调用该操作。 传给完成回调的参数取决于方法，但是第一个参数始终为异常预留。 如果操作成功完成，则第一个参数为 null 或 undefined。
```javascript
import { unlink } from 'fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});
```

* 同步的示例
同步的 API 会阻止 Node.js 事件循环和进一步的 JavaScript 执行，直到操作完成。 立即抛出异常，可以使用 try…catch 进行处理，也可以使其冒泡。
```javascript
import { unlinkSync } from 'fs';

try {
  unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (err) {
  // 处理错误
}
```

## 常用 API 示例

> 下面的例子均使用同步API的形式，请注意，同步API的返回值为 Promise 对象。

1、fs.accessSync(path[, mode])
* path `string` | `Buffer` | `URL`
* mode `integer` 默认值: fs.constants.F_OK

同步地测试用户对 path 指定的文件或目录的权限。 mode 参数是可选的整数，指定要执行的可访问性检查。 mode 应该是值 fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个（例如 fs.constants.W_OK | fs.constants.R_OK）的按位或组成的掩码。 查看[文件访问的常量](http://nodejs.cn/api/fs.html#file-access-constants)以获取可能的 mode 值。

如果任何可访问性检查失败，将抛出 Error。 否则，该方法将返回 undefined。

```javascript
import { accessSync, constants } from 'fs';

try {
  accessSync('etc/passwd', constants.R_OK | constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}
```

2、fs.copyFileSync(src, dest[, flags])
* src `string` | `Buffer` | `URL` 需要复制的源文件名称
* dest `string` | `Buffer` | `URL` 复制到的目标文件名称
* flags `integer` 默认值: 0 用于复制操作的修饰符。默认值为 0，表示不使用任何修饰符。

同步地将src复制到dest。默认情况下，如果dest已经存在，会被覆盖。返回未定义。Node.js对复制操作的原子性不做任何保证。如果在目标文件被打开写入后发生错误，Node.js将尝试删除目标文件。

mode是一个可选的整数，用于指定复制操作的行为。可以创建一个由两个或多个值的位数OR组成的掩码（例如：fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE）。

选项具体说明：
* fs.constants.COPYFILE_EXCL：如果目标文件已存在，则抛出错误。
* fs.constants.COPYFILE_FICLONE：复制操作将试图创建一个copy-on-write(写入时复制？)的软连接(reflink)。如果平台不支持copy-on-write方式，那么就会使用后备复制机制。

```javascript
import { copyFileSync, constants } from 'node:fs';

// destination.txt will be created or overwritten by default.
copyFileSync('source.txt', 'destination.txt');
console.log('source.txt was copied to destination.txt');

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
copyFileSync('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
```

3、fs.cpSync(src, dest[, options])

> v16.7.0 版本新增的 API

* src `string` | `Buffer` | `URL` 需要复制的源文件路径
* dest `string` | `Buffer` | `URL` 复制到的目标文件路径
* options `Object` 默认值: {}
  * dereference：`boolean` 默认值: false 如果为true，则复制的文件将包含它们的硬链接。
  * errorOnExist：`boolean` 默认值: false 如果为true，则复制的文件将会覆盖目标文件。
  * filter：`function` 默认值: null 如果提供了这个参数，则只复制过滤器返回true的文件。
  * force：`boolean` 默认值: false 如果为true，则复制的文件将会覆盖目标文件。
  * preserveTimestamps：`boolean` 默认值: false 如果为true，则复制的文件将保持原有的时间戳。
  * recursive：`boolean` 默认值: false 如果为true，则复制的文件将包含它们的子目录。
  * verbatimSymlinks：`boolean` 默认值: false 如果为true，则复制的文件将包含它们的硬链接。

同步地将整个目录结构从src复制到dest，包括子目录和文件。

当把一个目录复制到另一个目录时，不支持[globs语法](https://blog.logrocket.com/understanding-using-globs-node-js/)，行为类似于cp dir1/ dir2/。

> 其他API，请参见官方文档[File System](https://nodejs.org/api/fs.html#fsexistssyncpath)

## FileHandle 类
FileHandle 对象是一个文件描述符的对象包装器，它可以用来读取、写入、或者删除文件。

FileHandle 对象的实例通过 fs.open() 或 fs.openFile() 方法创建。

所有 FileHandle 对象都是 EventEmitter

如果 FileHandle 对象不是使用 filehandle.close() 方法关闭的话，则会尝试自动关闭文件描述符并且会抛出异常，避免内存泄漏。但是最好不要依赖这个特性，因为它可能在以后的版本中被移除。

## 通用对象
所有的文件系统 API 类型（Promise、回调和同步API）都共享这些通用对象。

### fs.Dir 类


## 常用示例

## 参考链接
* [File System API](https://nodejs.org/api/fs.html)
* [fs源代码](https://github.com/nodejs/node/blob/v18.4.0/lib/fs.js)




