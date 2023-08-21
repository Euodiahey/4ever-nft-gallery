<script setup>
</script>

<template>
  <main>
    <button @click="onLogin">login</button>
  </main>
</template>

<script>
import { login } from '../utils/lens/login'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    async onLogin() {
      try {
        await login('0x712b4DAf0Ab3761aBAdF80BAEccba92bb120252d')
        console.log('111')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>
