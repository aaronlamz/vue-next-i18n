# 🌈 Getting started
To begin, you'll need to install vue-next-i18n 

## use npm
```
npm install vue-next-i18n
```
## use yarn
```
yarn add vue-next-i18n
```
# 🚀 Usage
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
## HTML
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
# 🚌 Composition API
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

# 📦 API Examples

## basic
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

## support function
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
## support $n replacement
Inserts the n th (1-indexed) available
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

// output: hello world param1,param2,param3
<div id="app">
  <p>{{ $t("message.hello",'param1','param2','param3') }}</p>
</div>

```

## use array messages
The array order depends on the localeKeys, default value is ['zhCHS','zhCHT','en']

```
// example localeKeys: ['zhCHS','en','ja']

<div id="app">
  <p>{{ $t(['你好 世界','hello world','こんにちは、世界']) }}</p>
</div>
```

## use i18n option in component
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

