
<template>
  <h2>Current Lang : {{ currentLocale }}</h2>
  <h2>Current Lang from $i18n.currentLocale: {{ currentLocale }}</h2>
  <h2>Test Cases：</h2>
  <p>Key[button.add： {{ $t('button.add') }}</p>
  <p>Key[params]： {{ $t('params', param) }}</p>
  <p>Key Array： {{ $t(['简体', '繁体', '英文']) }}</p>
  <p>Key [global option]： {{ $t('global') }}</p>
  <p>
    <button @click="swtchLang('en')">Change Lang to en</button>
  </p>
  <p>
    <button @click="swtchLang('zhCHS')">Change Lang to zhCHS</button>
  </p>
  <button @click="swtchLang('zhCHT')">Change Lang to zhCHT</button>
  <p>
    <button @click="changLang('zhCHT')">
      Change Lang to zhCHT by $i18n.changeLocale
    </button>
  </p>
  <p>
    <button @click="changLang('zhCHS')">
      Change Lang to zhCHS by $i18n.changeLocale
    </button>
  </p>
  <p>
    <button @click="changLang('en')">
      Change Lang to en by $i18n.changeLocale
    </button>
  </p>
  <p>
    <button @click="changeFunctionParams('zhCHS')">
      Change param to zhCHS
    </button>
  </p>
  <p>
    <button @click="changeFunctionParams('zhCHT')">
      Change param to zhCHT
    </button>
  </p>
  <p>
    <button @click="changeFunctionParams('en')">Change param to en</button>
  </p>
</template>
<script  lang="ts">
import { useI18n } from '../../../src/index'
import { fromMapTips } from './map'
import { ref } from 'vue'
export default {
  i18n: {
    en: {
      button: {
        add: 'i18nOption Add new'
      },
      params: (val: string) => `en i18n Option params: ${val}`
    },
    zhCHS: {
      button: {
        add: 'i18n选项 新增'
      },
      params: (val: string) => `简体 i18n选项 参数: ${val}`
    },
    zhCHT: {
      button: {
        add: 'i18n选项 新增繁体'
      },
      params: (val: string) => `繁体 i18n选项 参数: ${val}`
    }
  },
  methods: {
    changLang(locale: string) {
      ;(this as any).$i18n.changeLocale(locale)
    },
    changeFunctionParams(param: string) {
      ;(this as any).param = param
    }
  },
  setup() {
    let param = ref('zhCHS')
    const i18n = useI18n()
    const { changeLocale, currentLocale } = i18n
    const swtchLang = (locale: string) => {
      changeLocale(locale)
    }
    console.log(fromMapTips)
    let tips = ref(fromMapTips)
    return {
      param,
      currentLocale,
      tips,
      swtchLang
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
