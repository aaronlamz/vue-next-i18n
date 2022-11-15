# 模块机制
在JavaScript的发展历程中，它主要在浏览器前端发光发热。由于官方规范（ECMAScript）规范化的时间较早，规范涵盖的范畴非常小。这些规范中包含词法、类型、上下文、表达式、声明（statement）、方法、对象等语言的基本要素。

在实际应用中，JavaScript的表现能力取决于宿主环境中的API支持程度。在Web 1.0时代，只有对DOM、BOM等基本的支持。随着Web 2.0的推进，HTML5崭露头角，它将Web网页带进Web应用的时代，在浏览器中出现了更多、更强大的API供JavaScript调用，这得感谢W3C组织对HTML5规范的推进以及各大浏览器厂商对规范的大力支持。

但是，Web在发展，浏览器中出现了更多的标准API，这些过程发生在前端，后端JavaScript的规范却远远落后。对于JavaScript自身而言，它的规范依然是薄弱的，还有以下缺陷。

* 没有模块系统。
* 标准库较少。ECMAScript仅定义了部分核心库，对于文件系统，I/O流等常见需求却没有标准的API。就HTML5的发展状况而言，W3C标准化在一定意义上是在推进这个过程，但是它仅限于浏览器端。
* 没有标准接口。在JavaScript中，几乎没有定义过如Web服务器或者数据库之类的标准统一接口。
* 缺乏包管理系统。这导致JavaScript应用中基本没有自动加载和安装依赖的能力。

CommonJS规范的提出，主要是为了弥补当前JavaScript没有标准的缺陷，以达到像Python、Ruby和Java具备开发大型应用的基础能力，而不是停留在小脚本程序的阶段。他们期望那些用CommonJS API写出的应用可以具备跨宿主环境执行的能力，这样不仅可以利用JavaScript开发富客户端应用，而且还可以编写以下应用。

* 服务器端 JavaScript 应用程序。（例如，提供TCP、HTTP服务）
* 命令行工具。（非常常用）
* 桌面图形界面应用程序（例如：Electron应用）
* 混合应用（ Titanium 和 Adobe AIR 等形式的应用，这种还没怎么了解过）。

如今，CommonJS 中的大部分规范虽然依旧是草案，但是已经初显成效，为 JavaScript 开发大型应用程序指明了一条非常棒的道路。目前，它依旧在成长中，这些规范涵盖了模块、二进制、Buffer、字符集编码、I/O流、进程环境、文件系统、套接字、单元测试、Web服务器网关接口、包管理等。

## CommonJS 规范
CommonJS 对模块的定义十分简单，主要分为模块引用、模块定义和模块标识3个部分。

### 模块引用
模块引用的示例代码如下：
```javascript
var math = require('math');
```
在CommonJS规范中，存在require()方法，这个方法接受模块标识，以此引入一个模块的API到当前上下文中。

### 模块定义
在模块中，上下文提供require()方法来引入外部模块。对应引入的功能，上下文提供了exports对象用于导出当前模块的方法或者变量，并且它是唯一导出的出口。在模块中，还存在一个module对象，它代表模块自身，而exports是module的属性。在Node中，一个文件就是一个模块，将方法挂载在exports对象上作为属性即可定义导出的方式：
```javascript
// math.js
exports.add = function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
```
在另一个文件中，我们通过require()方法引入模块后，就能调用定义的属性或方法了：
```javascript
var math = require('math');
console.log(math.add(1, 2, 3, 4, 5));
```
### 模块标识
模块标识其实就是传递给require()方法的参数，它必须是符合小驼峰命名的字符串，或者以．、.．开头的相对路径，或者绝对路径。它可以没有文件名后缀．js。模块的定义十分简单，接口也十分简洁。它的意义在于将类聚的方法和变量等限定在私有的作用域中，同时支持引入和导出功能以顺畅地连接上下游依赖。如图所示，每个模块具有独立的空间，它们互不干扰，在引用时也显得干净利落。

<div align="center"><img src="~@img/module.png"></div>

## Node.js 模块实现
在Node中引入模块，需要经历如下3个步骤。
* 路径分析
* 文件定位
* 编译执行

在Node中，模块分为两类：一类是Node提供的模块，称为核心模块；另一类是用户编写的模块，称为文件模块。

* 核心模块部分在Node源代码的编译过程中，编译进了二进制执行文件。在Node进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。
* 文件模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢。

接下来，我们来看看Node的模块加载机制：
### 优先从缓存加载
展开介绍路径分析和文件定位之前，我们需要知晓的一点是，与前端浏览器会缓存静态脚本文件以提高性能一样，Node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而Node缓存的是编译和执行之后的对象。

不论是核心模块还是文件模块，require()方法对相同模块的二次加载都一律采用缓存优先的方式，这是第一优先级的。不同之处在于核心模块的缓存检查先于文件模块的缓存检查。
### 路径分析和文件定位
因为标识符有几种形式，对于不同的标识符，模块的查找和定位有不同程度上的差异。

1、模块标识符分析

前面提到过，require()方法接受一个标识符作为参数。在Node实现中，正是基于这样一个标识符进行模块查找的。模块标识符在Node中主要分为以下几类。
* 核心模块，如http、fs、path等。
* ．或．．开始的相对路径文件模块。
* 以/开始的绝对路径文件模块。
* 非路径形式的文件模块，如自定义的connect模块（以NPM包形式引入）。

* 核心模块

核心模块的优先级仅次于缓存加载，它在Node的源代码编译过程中已经编译为二进制代码，其加载过程最快。
如果试图加载一个与核心模块标识符相同的自定义模块，那是不会成功的。如果自己编写了一个http用户模块，想要加载成功，必须选择一个不同的标识符或者换用路径的方式。

* 路径形式的文件模块

以．、.．和/开始的标识符，这里都被当做文件模块来处理。在分析文件模块时，require()方法会将路径转为真实路径，并以真实路径作为索引，将编译执行后的结果存放到缓存中，以使二次加载时更快。
由于文件模块给Node指明了确切的文件位置，所以在查找过程中可以节约大量时间，其加载速度慢于核心模块。

* 自定义模块（特殊文件模块）

自定义模块指的是非核心模块，也不是路径形式的标识符。它是一种特殊的文件模块，可能是一个文件（这种是什么形式？）或者包(NPM包形式)的形式。这类模块的查找是最费时的，也是所有方式中最慢的一种。

> 关于模块路径:模块路径是Node在定位文件模块的具体文件时制定的查找策略，具体表现为一个路径组成的数组。
> 模块路径的查找规则如下:
> * 当前文件目录下的node_modules目录。
> * 父目录下的node_modules目录。
> * 父目录的父目录下的node_modules目录。
> * 沿路径向上逐级递归，直到根目录下的node_modules目录。
> 它的生成方式与JavaScript的原型链或作用域链的查找方式十分类似。在加载的过程中，Node会逐个尝试模块路径中的路径，直到找到目标文件为止。可以看出，当前文件的路径越深，模块查找耗时会越多，这是自定义模块的加载速度是最慢的原因。

2、文件定位

从缓存加载的优化策略使得二次引入时不需要路径分析、文件定位和编译执行的过程，大大提高了再次加载模块时的效率。

但在文件的定位过程中，还有一些细节需要注意，这主要包括文件扩展名的分析、目录和包的处理。

* 文件扩展名分析

require()在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。CommonJS模块规范也允许在标识符中不包含文件扩展名，这种情况下，Node会按 .js、.json、.node 的次序补足扩展名，依次尝试。

在尝试的过程中，需要调用fs模块同步阻塞式地判断文件是否存在。因为Node是单线程的，所以这里是一个会引起性能问题的地方。小诀窍是：如果是．node和．json文件，在传递给require()的标识符中带上扩展名，会加快一点速度。

另一个诀窍是：同步配合缓存，可以大幅度缓解Node单线程中阻塞式调用的缺陷。

* 目录分析和包

在分析标识符的过程中，require()通过分析文件扩展名之后，可能没有查找到对应文件，但却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时Node会将目录当做一个包来处理。

在这个过程中，Node对 CommonJS 包规范进行了一定程度的支持。
首先，Node在当前目录下查找package.json（CommonJS包规范定义的包描述文件），通过JSON.parse()解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤。

如果main属性指定的文件名错误，或者压根没有package.json文件，Node会将index当做默认文件名，然后依次查找index.js、index.json、index.node。

如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败的异常。

### 模块编译
在Node中，每个文件模块都是一个对象，它的定义如下：

```javascript
  function Module(id, parent){
    this.id = id;
    this.exports = {};
    if(parent && parent.children){
      parent.children.push(this)
    }
    this.filename = null;
    this.loaded = false;
    this.children = [];
  }
```
编译和执行是引入文件模块的最后一个阶段。定位到具体的文件后，Node会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同，具体如下说明。
* .js 文件。 通过fs模块同步读取文件后编译执行。
* .node文件。这是用C/C++编写的扩展文件，通过dlopen()方法加载最后编译生成的文件。
* .json文件。通过fs模块同步读取文件后，用JSON.parse()解析返回结果。
* 其余扩展名文件。 它们都被当做 .js 文件载入。

每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入的性能。
根据不同的文件扩展名，Node会调用不同的读取方式，如.json文件的调用如下：

```javascript
   // Native extension for .json:
   Module._extensions['.json'] = function(module, filename) {
     var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
     try {
       module.exports = JSON.parse(content);
     } catch (err) {
       err.message = filename + ': ' + err.message;
       throw err;
     }
   }
```

其中，Module._extensions会被赋值给require()的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式。编写如下代码测试一下：

```javascript
console.log(require.extensions)
```

得到的执行结果如下：

```javascript
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: undefined,
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {}
}
```

如果想对自定义的扩展名进行特殊的加载，可以通过类似require.extensions['.ext']的方式实现。
但是从v0.10.6版本(版本还是有点早😂)开始，官方不鼓励通过这种方式来进行自定义扩展名的加载，而是期望先将其他语言或文件编译成JavaScript文件后再加载，这样做的好处在于不将烦琐的编译加载等过程引入Node的执行过程中。

在确定文件的扩展名之后，Node将调用具体的编译方式来将文件执行后返回给调用者。

1、JavaScript文件的编译
回到CommonJS模块规范，我们知道每个模块文件中存在着require、exports、module这3个变量，但是它们在模块文件中并没有定义，那么从何而来呢？甚至在Node的API文档中，我们知道每个模块中还有__filename、__dirname这两个变量的存在，它们又是从何而来的呢？如果我们把直接定义模块的过程放诸在浏览器端，会存在污染全局变量的情况。

事实上，在编译的过程中，Node对获取的JavaScript文件内容进行了头尾包装。在头部添加了
(function (exports, require, module, __filename, __dirname) {\n，在尾部添加了\n});。
一个正常的JavaScript文件会被包装成如下的样子：

```javascript
(function (exports, require, module, __filename, __dirname) {
  // 在这里编写模块的代码
  var math = require('math');
  exports.add = function (a, b) {
    return a + b;
  }
})(exports, require, module, __filename, __dirname);
```

这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过vm原生模块的runInThisContext()方法执行（类似eval，只是具有明确上下文，不污染全局），返回一个具体的function对象。最后，将当前模块对象的exports属性、require()方法、module（模块对象自身），以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个function()执行。

这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的exports属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用到，但是模块中的其余变量或属性则不可直接被调用。

至此，require、exports、module的流程已经完整，这就是Node对CommonJS模块规范的实现。

2、C/C++ 模块编译

Node调用process.dlopen()方法进行加载和执行。在Node的架构下，dlopen()方法在Windows和*nix平台下分别有不同的实现，通过libuv兼容层进行了封装。

实际上，.node的模块文件并不需要编译，因为它是编写C/C++模块之后编译生成的，所以这里只有加载和执行的过程。在执行的过程中，模块的exports对象与．node模块产生联系，然后返回给调用者。C/C++模块给Node使用者带来的优势主要是执行效率方面的，劣势则是C/C++模块的编写门槛比JavaScript高。

3、JSON文件编译

.json文件的编译是3种编译方式中最简单的。Node利用fs模块同步读取JSON文件的内容之后，调用JSON.parse()方法得到对象，然后将它赋给模块对象的exports，以供外部调用。

## 核心模块
前面提到，Node的核心模块在编译成可执行文件的过程中被编译进了二进制文件。核心模块其实分为C/C++编写的和JavaScript编写的两部分，其中C/C++文件存放在Node项目的src目录下，JavaScript文件存放在lib目录下。如下图github目录所示：

<div align="center"><img src="~@img/node_structure.png"></div>

### JavaScript 核心模块编译过程

1、转存为 C/C++ 代码

Node采用了V8附带的js2c.py工具，将所有内置的 JavaScript 代码（src/node.js和lib/*.js）转换成C++ node_native_module.h头文件。
在这个过程中，JavaScript 代码以字符串的形式存储在node命名空间中，是不可直接执行的。在启动 Node 进程时，JavaScript 代码直接加载进内存中。在加载的过程中，JavaScript 核心模块经历标识符分析后直接定位到内存中，比普通的文件模块从磁盘中一处一处查找要快很多。

2、编译 JavaScript 核心模块

lib目录下的所有模块文件也没有定义require、module、exports这些变量。在引入JavaScript核心模块的过程中，也经历了头尾包装的过程，然后才执行和导出了exports对象。与文件模块有区别的地方在于：获取源代码的方式（核心模块是从内存中加载的）以及缓存执行结果的位置。

JavaScript 核心模块的定义如下面的代码所示，源文件通过process.binding('natives')取出，编译成功的模块缓存到NativeModule._cache对象上，文件模块则缓存到Module._cache对象上：
```javascript
  function NativeModule(id) {
    this.id = id;
    this.filename = id + '.js';
    this.exports = {};
    this.loaded = false;
    this.loading = false;
    NativeModule._source = process.binding('natives');
    NativeModule._cache = {};
  }
```
### C/C++ 核心模块编译过程
在核心模块中，有些模块全部由C/C++编写，有些模块则由C/C++完成核心部分，其他部分则由JavaScript实现包装或向外导出，以满足性能需求。后面这种C++模块主内完成核心，JavaScript主外实现封装的模式是Node能够提高性能的常见方式。通常，脚本语言的开发速度优于静态语言，但是其性能则弱于静态语言。而Node的这种复合模式可以在开发速度和性能之间找到平衡点。

这里我们将那些由纯C/C++编写的部分统一称为内建模块，因为它们通常不被用户直接调用。Node的buffer、crypto、evals、fs、os等模块都是部分通过C/C++编写的。

// C++ 源码待研究，原文版本太低，目录结构已变更

## C/C++ 扩展模块编写
// TODO

## 模块调用栈
了解了文件模块、核心模块、内建模块、C/C++扩展模块之后，有必要明确一下各种模块之间的调用关系。如下图所示：

<div align="center"><img src="~@img/node_core_module.png"></div>

C/C++内建模块属于最底层的模块，它属于核心模块，主要提供API给JavaScript核心模块和第三方JavaScript文件模块调用。如果你不是非常了解要调用的C/C++内建模块，请尽量避免通过process.binding()方法直接调用，这是不推荐的。

JavaScript核心模块主要扮演的职责有两类：一类是作为C/C++内建模块的封装层和桥接层，供文件模块调用；一类是纯粹的功能模块，它不需要跟底层打交道，但是又十分重要。

文件模块通常由第三方编写，包括普通JavaScript模块和C/C++扩展模块，主要调用方向为普通JavaScript模块调用扩展模块。
## 参考链接
* [《深入浅出Node.js》](https://m.ituring.com.cn/book/1290)
* [node_native_module.h](https://github.com/nodejs/node/blob/main/src/node_native_module.h)
