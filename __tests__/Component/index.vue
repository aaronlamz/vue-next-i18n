<template>
  {{ currentLocale }}
</template>
<script lang="ts">
import { useI18n } from '../../src/index'
export default {
  setup() {
    const i18n = useI18n()
    const { currentLocale } = i18n

    return {
      currentLocale
    }
  }
}
</script>
