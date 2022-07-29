# 🔥️ vue-next-i18n

<p align="center">
<img src="https://github.com/Aaronlamz/vue-next-i18n/actions/workflows/npm-publish.yml/badge.svg?branch=main">
<img src="https://img.shields.io/github/license/Aaronlamz/vue-next-i18n">
<img src="https://img.badgesize.io/https://unpkg.com/vue-next-i18n/dist/vue-next-i18n.cjs.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
<img src="https://packagephobia.com/badge?p=vue-next-i18n@1.0.10" />
<img alt="coverage" src="https://github.com/aaronlamz/vue-next-i18n/actions/workflows/test.yml/badge.svg">
<img alt="Codecov" src="https://img.shields.io/codecov/c/github/aaronlamz/vue-next-i18n">

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
// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
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

// 2. 初始化i18n实例
import { createApp } from 'vue';
import { createI18n } from 'vue-next-i18n';

const i18n = createI18n({
  locale: 'zhCHS', // 设置多语言
  messages, // 多语言文件
  localeKeys:['zhCHS','zhCHT','en'] // 用于数组形象获取多语言时的顺序，默认顺序： ['zhCHS','zhCHT','en']
})


// 3. 创建Vue根实例
const app = createApp({
  // set something options
  // ...
})

// 4. 注册i18n实例
app.use(i18n)

// 5. 挂载
app.mount('#app')

// OK了
```
### HTML
```
<div id="app">
  <p>{{ $t("message.hello") }}</p>
</div>


```
```
<!-- Output the following: -->
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
### 使用数组形式
The array order depends on the localeKeys, default value is ['zhCHS','zhCHT','en']

```
// example localeKeys: ['zhCHS','en','ja']

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
    // code...
  }
}

<div id="app">
  <p>{{ $t('message.hello') }}</p>
</div>
```

## 📜 变更日志
Details changes for each release are documented in the [CHANGELOG.md](./CHANGELOG.md).

## 📄 License
MIT License © 2022 [Aaron Lam](https://github.com/Aaronlamz)

