import './extend'
import bucket from './bucket'

export default {
  install(app) {
    const global = app.config.globalProperties
    global.$bucket = bucket
  }
}
