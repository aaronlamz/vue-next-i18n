# 🔥️ vue-next-i18n

<p align="center">
<img src="https://github.com/Aaronlamz/vue-next-i18n/actions/workflows/npm-publish.yml/badge.svg?branch=main">
<img src="https://img.shields.io/github/license/Aaronlamz/vue-next-i18n">
<img src="https://img.badgesize.io/https://unpkg.com/vue-next-i18n/dist/vue-next-i18n.cjs.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
<img src="https://packagephobia.com/badge?p=vue-next-i18n@1.0.10" />
<img alt="coverage" src="https://github.com/aaronlamz/vue-next-i18n/actions/workflows/test.yml/badge.svg">
<img alt="Codecov" src="https://img.shields.io/codecov/c/github/aaronlamz/vue-next-i18n">
<img alt="download" src="https://img.shields.io/npm/dm/vue-next-i18n">
<img alt="npm" src="https://img.shields.io/npm/v/vue-next-i18n">
</p>

<p>
 <a href="./README.zh-CN.md">🇨🇳 中文文档</a> 
</p>
Lightweight internationalization plugin for Vue 3

## 🌈 Getting started
To begin, you'll need to install vue-next-i18n 

### use npm
```
npm install vue-next-i18n
```
### use yarn
```
yarn add vue-next-i18n
```
## 🚀 Usage
When using with a module system, you must explicitly install the vue-next-i18n via app.use():
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

// 2. Create i18n instance with options
import { createApp } from 'vue';
import { createI18n } from 'vue-next-i18n';

const i18n = createI18n({
  locale: 'zhCHS', // set locale, depend on messages object structure keys
  messages, // set locale messages
  localeKeys:['zhCHS','zhCHT','en'] //Not required, default value： ['zhCHS','zhCHT','en']
})


// 3. Create a vue root instance
const app = createApp({
  // set something options
  // ...
})

// 4. Install i18n instance to make the whole app i18n-aware
app.use(i18n)

// 5. Mount
app.mount('#app')

// Now the app has started!
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
## 🚌 Composition API
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

## 📦 Examples

### basic
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

### support function translation
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
### use array messages
The array order depends on the localeKeys, default value is ['zhCHS','zhCHT','en']

```
// example localeKeys: ['zhCHS','en','ja']

<div id="app">
  <p>{{ $t(['你好 世界','hello world','こんにちは、世界']) }}</p>
</div>
```

### use i18n option in component
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

## 📜 Changelog
Details changes for each release are documented in the [CHANGELOG.md](./CHANGELOG.md).

## ©️ License
MIT License © 2022 [Aaron Lam](https://github.com/Aaronlamz)


