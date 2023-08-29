
<template>
  <RouterView />
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'App',
  setup() {
    const $q = useQuasar()
    console.log($q)
    window.$notify = (message, position = 'top') => {
      $q.notify({
        message,
        position
      })
    }
    window.$alert = (message, title = 'Tip', opts = {}) => {
      return $q.dialog({
        title,
        message,
        ...opts
      })
    }
    window.$prompt = (opts) => {
      return $q.dialog({
        cancel: true,
        persistent: true,
        prompt: {
          model: '',
          type: 'text' // optional
        },
        ...opts
      })
    }
  }
}
</script>
