import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import router from './router'
import utils from './utils'
import './css/style.scss'
import Components from './components'

const app = createApp(App)
app.use(Quasar, {
  plugins: {} // import Quasar plugins and add here
})

app.use(utils)

app.use(router)
app.use(Components)

app.mount('#app')
