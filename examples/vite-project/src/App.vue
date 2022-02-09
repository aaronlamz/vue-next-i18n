
<template>
  <h2>Current Lang :</h2>
  <h2>Test Cases:</h2>
  <p>Key[button.add]: {{ $t('button.add') }}</p>
  <p>Key[params]: {{ $t('params', 'value') }}</p>
  <p>Key Array: {{ $t(['简体', '繁体', '英文']) }}</p>
  <button>Change Lang</button>
</template>
<script  lang="ts">
export default {
  i18n: {
    en: {
      button: {
        add: 'i18nOption Add new'
      },
      params: (val: string) => `params: ${val}`
    },
    zhCHS: {
      button: {
        add: 'i18n选项 新增'
      },
      params: (val: string) => `i18n选项 参数: ${val}`
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
