# 简介
Node.js 诞生于 2009 年，由 Joyent 的员工 [Ryan Dahl](https://github.com/ry) 开发而成，之后 Joyent 公司一直扮演着 Node.js 孵化者的角色。由于诸多原因，Ryan 在2012年离开社区，随后在2015年由于 Node 贡献者对 es6 新特性集成问题的分歧，导致分裂出 iojs ，并由 iojs 发布1.0、2.0和3.0版本。由于 iojs 的分裂最终促成了2015年Node基金会的成立，并顺利发布了4.0版本。Node.js 基金会的创始成员包括 Google、Joyent、IBM、Paypal、微软、Fidelity 和 Linux 基金会，创始成员将共同掌管过去由 Joyent 一家企业掌控的 Node.js 开源项目。此后，Node.js 基金会发展非常好，稳定的发布版本。

## 什么是 Node.js
根据[官方描述](https://nodejs.org/en/)，Node.js® 是一个基于 [Chrome V8](https://v8.dev/) 引擎的 JavaScript 运行时环境(类似的 JavaScript 运行时环境有[deno](https://deno.land/)、[bun](https://bun.sh/))。作为一个异步事件驱动的 JavaScript 运行时，Node.js 被设计用来构建可扩展的网络应用。

## 为什么叫 Node.js
起初，Ryan Dahl称他的项目为 web.js ，就是一个 Web 服务器，但是项目的发展超过了他最初单纯开发一个 Web 服务器的想法，变成了构建网络应用的一个基础框架，这样可以在它的基础上构建更多的东西，诸如服务器、客户端、命令行工具等。Node.js 发展为一个强制不共享任何资源的单线程、单进程系统，包含十分适宜网络的库，为构建大型分布式应用程序提供基础设施，其目标也是成为一个构建快速、可伸缩的网络应用平台。它自身非常简单，通过通信协议来组织许多 Node ，非常容易通过扩展来达成构建大型网络应用的目的。每一个 Node 进程都构成这个网络应用中的一个节点，这是它名字所含意义的真谛。

## Node.js 特点
* Node.js 在浏览器之外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使得 Node.js 的性能非常好。Chrome V8 引擎以 C/C++ 为主，相当于使用JavaScript 写法，转成 C/C++ 调用，大大的降低了学习成本。

* 事件驱动（event-driven），非阻塞 I/O 模型（non-blocking I/O model），简单点讲就是每个函数都是异步的，最后由 Libuv 这个 C/C++ 编写的事件循环处理库来处理这些 I/O 操作，隐藏了非阻塞 I/O 的具体细节，简化并发编程模型，让你可以轻松的编写高性能的Web应用，所以它是轻量（lightweight）且高效（efficient）的。

* Node.js 应用程序在单个进程中运行，无需为每个请求创建新的线程。 Node.js 在其标准库中提供了一组异步的 I/O 原语(什么意思?)，以防止 JavaScript 代码阻塞，通常，Node.js 中的库是使用非阻塞范式编写的，使得阻塞行为成为异常而不是常态。

* 当 Node.js 执行 I/O 操作时（比如从网络读取、访问数据库或文件系统），Node.js 将在响应返回时恢复操作（而不是阻塞线程和浪费 CPU 周期等待）。这允许 Node.js 使用单个服务器处理数千个并发连接，而​​不会引入管理线程并发（这可能是错误的重要来源）的负担。

* 使用 npm 作为包管理器，目前 npm 是开源库里包管理最大的生态，功能强大。

## [Node.js 依赖项](https://nodejs.org/zh-cn/docs/meta/topics/dependencies/)
Node.js 依赖于以下一些依赖项，这样它才能正常工作。

### 类库
* [V8](https://v8.dev/docs/)
V8 类库为 Node.js 提供了 JavaScript 引擎，Node.js 通过 V8 C++ 的 API 函数接口进行操控， V8 由谷歌公司维护，用于谷歌浏览器中。

* [libuv](http://docs.libuv.org/en/v1.x/)
另外一个重要的依赖项是 libuv，它是一个 C 写成的类库，用于非阻塞型的 I/O 操作，同时在所有支持的操作系统上保持一致的接口。它提供了一些机制来处理诸如文件系统、DNS、网络、子进程、管道、信号量控制、轮询机制和数据流。它同样也提供了一个线程池，用于无法在操作系统层面进行异步操作的任务卸载。

* [llhttp](https://github.com/nodejs/llhttp)
HTTP 解析是通过一个由 C 语言编写、轻量级称作 llhttp 的类库进行的。由于它的设计不会引发系统调用和系统资源分配，因而它的预请求内存痕迹极小。

* [c-ares](https://c-ares.haxx.se/docs.html)
对于某些异步的 DNS 请求，Node.js 使用由 C 编写，称作 c-areas 的类库。它是通过 JavaScript 的 DNS 模块，以 resolve() 家族函数的形式发布。lookup() 函数，核心剩余部分使用它，借助在 libuv 中 getaddrinfo(3) 跨越函数的调用。那是因为 c-areas 支持 /etc/hosts，/etc/resolv.conf 以及 /etc/svc.conf。但不是像 mDNS 一样的东西。

* [OpenSSL](https://www.openssl.org/docs/)
OpenSSL 广泛地在 tls 和 crypto 模块中使用。它提供了战争环境下，许多现代网络为安全而依赖的密码函数。

* [zlib](https://www.zlib.net/manual.html)
为了快速压缩解压，Node.js 依赖于工业标准的 zlib 类库。同名可知的还有 gzip 和 libpng。Node.js 使用 zlib 创建同步、异步和数据流压缩、解压缩接口。

### 工具
* [npm](https://docs.npmjs.com/)
Node.js 完全是基于模块化构建的，因此需要一个高质量的包管理器；有鉴于此 npm 产生了。随着 npm 的产生史上最大的社区创建的编程生态圈诞生，它们使得构建 Node.js 快而容易。

* [gyp](https://gyp.gsrc.io/docs/UserDocumentation.md)
构建系统通过 gyp 来处理。这是一个从 V8 拷贝而来、基于 python 的项目生成工具。它可以生成项目文件用以跨不同平台中使用。Node.js 需要一个构建系统，因为它自身的大部分，以及它的依赖项，是用需要编译的语言写成的。

* [gtest](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
本地代码可以通过 gtest 进行测试，它是从 Chromium 收录的。它不需要一个真实可启动的 Node.js 环境下，直接测试 C/C++ 程序。

## Node.js 应用场景
《Node.js in action》一书里说，Node.js 所针对的应用程序有一个专门的简称：DIRT。它表示数据密集型实时（data-intensive real-time）程序。因为 Node.js 自身在 I/O 上非常轻量，它善于将数据从一个管道混排或代理到另一个管道上，这能在处理大量请求时持有很多开放的连接，并且只占用一小部分内存。它的设计目标是保证响应能力，跟浏览器一样。
但在今天来看，DIRT 还是范围小了。其实 DIRT 本质上说的 I/O 处理的都算，但随着大前端的发展，Node.js 已经不再只是 I/O 处理相关了。

Node.js 使用场景主要分为4大类
* 跨平台：覆盖你能想到的面向用户的所有平台，传统的PC Web端，以及PC客户端 nw.js、electron 、移动端 cordova、HTML5、react-native、weex，硬件 ruff.io 等
* Web应用开发：网站、API、RPC服务等
* 前端：三大框架 React 、 Vue 、 Angular 辅助开发，以及工程化演进过程（使用Gulp 、Webpack 构建 Web 开发工具）
* 工具：npm上各种工具模块，包括各种前端预编译、构建工具 Grunt、 Gulp、Webpack、脚手架，命令行工具等

Node.js 具体的应用场景
|分类|描述|相关模块|
|:---|:---:|:---:|
|网站|类似于 cnodejs.org 这样传统的网站|Express、 Koa|
|API|同时提供给移动端，PC，H5 等前端使用的 HTTP Api 接口|Restify、HApi|
|API代理|为前端提供的，主要对后端Api接口进行再处理，以便更多的适应前端开发|Express、 Koa|
|IM即时聊天|基于 WebSocket协议|Socket.io 、 sockjs|
|反向代理|提供类似于 nginx 反向代理功能，但对前端更友好|anyproxy 、 node-http-proxy 、 hiproxy|
|前端构建工具|辅助前端开发，尤其是各种预编译，构建相关的工具，能够极大的提高前端开发效率|Grunt 、 Gulp 、 Bower 、 Webpack 、 Fis3 、 YKit|
|命令行工具|使用命令行自定义了很多相关工具|[Cordova](https://cordova.apache.org/) 、 [Shell.js](https://cordova.apache.org/)|
|跨平台打包工具|使用 Web 开发技术开发PC客户端是目前最流行的方式，会有更多前端开发工具是采用这种方式的|PC端的electron、nw.js|
|P2P|区块链开发、BT客户端|webtorrent 、 ipfs|
|编辑器|Atom 和 VSCode 都是基于 electron 模块的|electron|
|物联网与硬件|ruff.io和很多硬件都支持node sdk|ruff|

Node.js 的应用场景会越来越广泛，更多参见 [sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)






