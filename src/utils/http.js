import Axios from 'axios'

let baseURL = 'https://h.foreverland.xyz'
if (/.com/.test(location.host)) {
  baseURL = 'https://api.4everland.org'
}
const http = Axios.create({
  baseURL,
  headers: {
    Authorization: localStorage.token // "",
  }
})

http.interceptors.response.use(
  (res) => {
    const data = res.data
    if (typeof data == 'object' && data && 'code' in data) {
      if (data.code != 200 && data.code != 'SUCCESS') {
        let msg = data.message || `${data.code} error`
        // handleMsg(200, data.code, msg, res.config);
        window.alert(msg)
        const error = new Error(msg)
        error.code = data.code
        throw error
      }
      if ('data' in data) {
        return data
      }
    }
    return res
  },
  (error) => {
    // , status, statusText, config = {}
    const { data = {}, status } = error.response || {}
    // console.log(error, status, statusText);
    let msg = data.message || error.message
    // handleMsg(status, data.code, msg, config);
    console.log(status)
    if (status == 401) {
      window
        .$prompt({
          message: '请输入登录token'
        })
        .onOk((token) => {
          console.log(token)
          localStorage.token = token
          location.reload()
        })
    } else window.alert(msg)
    error.message = msg
    error.code = data.code
    return Promise.reject(error)
  }
)

export default http
