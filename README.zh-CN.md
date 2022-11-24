# 🔥️ vue-next-i18n

<p align="center">
<img src="https://github.com/Aaronlamz/vue-next-i18n/actions/workflows/npm-publish.yml/badge.svg?branch=main">
<img src="https://img.shields.io/github/license/Aaronlamz/vue-next-i18n">
<img src="https://img.badgesize.io/https://unpkg.com/vue-next-i18n/dist/vue-next-i18n.cjs.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
<img src="https://packagephobia.com/badge?p=vue-next-i18n@1.0.10" />
<img alt="Codecov" src="https://img.shields.io/codecov/c/github/aaronlamz/vue-next-i18n">
<img alt="download" src="https://img.shields.io/npm/dm/vue-next-i18n">
<img alt="npm" src="https://img.shields.io/npm/v/vue-next-i18n">

</p>

Vue3轻量版国际化插件

## 🌈 开始
安装vue-next-i18n 

### 使用 npm
```
npm install vue-next-i18n
```
### 使用 yarn
```
yarn add vue-next-i18n
```
## 🚀 用法
通过 app.use() 方法注册插件
```typescript
// 1. 准备翻译好的本地多语言数据
// 区域设置消息的结构是分层对象结构，每个区域设置都是顶级属性，比如如下的英文,中文,日文
const messages = {
  "en": {
    "message": {
      "hello": "hello world"
    }
  },
  "ch-sim": {
    "message": {
      "hello": "你好 世界"
    }
  },
  "ja": {
    "message": {
      "hello": "こんにちは、世界"
    }
  }
}

// 2. 初始化i18n插件实例
import { createApp } from 'vue';
import { createI18n } from 'vue-next-i18n';

const i18n = createI18n({
  locale: 'ch-sim', // 设置多语言插件的默认语言
  messages, // 多语言翻译json数据
  localeKeys:['ch-sim','en','ja'] // 用于数组形象获取多语言时的顺序，可以不设置(自动解析根属性)
})


// 3. 创建Vue根实例
const app = createApp({
  // 设置一些选项
  // ...
})

// 4. 注册i18n实例
app.use(i18n)

// 5. 挂载
app.mount('#app')

// 初始化配置好了, 可以使用了
```
### HTML
```
<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>


```
```
<!-- 输出如下内容: -->
<div id="#app">
  <p>你好 世界</p>
</div>
```
## 🚌 组合式 API
```typescript
import { useI18n } from 'vue-next-i18n'

export default {
  setup() {
    const i18n = useI18n()
    const { currentLocale, changeLocale } = i18n
    // 获取当前插件的语言区域名称
    console.log(currentLocale.value)
    // 修改当前插件的语言区域名称
    changeLocale('en') // 从 localeKeys 里面选择一个
    // 返回给其他 vue 组件使用
    return {
      currentLocale,
      changeLocale
    }
  }
}
```

## 📦 例子

### 基础
```
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  zhCHS: {
    message: {
      hello: '你好 世界'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>
```

### 支持传入函数
```
const messages = {
  en: {
    message: {
      hello: (val) =>  `hello world ${val}`
    }
  },
  zhCHS: {
    message: {
      hello: (val) =>  `你好 世界 ${val}`
    }
  },
  ja: {
    message: {
      hello: (val) =>  `こんにちは、世界 ${val}`
    }
  }
}

<div id="app">
  <p>{{ $t("message.hello",'hahaha') }}</p>
</div>
```
### 支持参数 $n 替换
插入第 n 个 (从 1 开始) 变量
```
const messages = {
  en: {
    message: {
      hello: `hello world $1,$2,$3...`
    }
  },
  zhCHS: {
    message: {
      hello: `你好 世界 $1,$2,$3...`
    }
  },
  ja: {
    message: {
      hello:`こんにちは、世界 $1,$2,$3...`
    }
  }
}

// 输出: hello world param1,param2,param3
<div id="app">
  <p>{{ $t("message.hello",'param1','param2','param3') }}</p>
</div>

```

### 使用数组形式插入匿名值
数组的顺序基于 localeKeys

```
// 示例 localeKeys: ['zhCHS','en','ja']

<div id="app">
  <p>{{ $t(['你好 世界','hello world','こんにちは、世界']) }}</p>
</div>
```

### 支持组件内i18n选项多语言配置
```
export default {
  i18n:{
    en: {
      message: {
        hello: 'hello world'
      }
    },
    zhCHS: {
      message: {
        hello: '你好 世界'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    } 
  },
  setup(){
    // 代码...
  }
}

<div id="app">
  <p>{{ $t('message.hello') }}</p>
</div>
```

## 📜 变更日志
关于每个版本的细节变化请查看文档 [CHANGELOG.md](./CHANGELOG.md).

## 📄 License
MIT License © 2022 [Aaron Lam](https://github.com/aaronlamz)


