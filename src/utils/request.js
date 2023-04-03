import axios from 'axios'
import { getUrlParams, getUrl_t } from './utils'
import { Notification, Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  /*  axios中请求配置有baseURL选项，表示请求URL公共部分
      http://vv.bangongyi.com 测试版打包地址
      https://qy.bangongyi.com 正式版打包地址
  */
  // baseURL: "http://vv.bangongyi.com",
  // baseURL: "https://qy.bangongyi.com",
  // 超时 
  baseURL: '',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 固定的 token typeId sid 是暂时开发环境掉接口用的
    let token = getUrlParams('token') === null ? '' : getUrlParams('token');
    let sid = getUrlParams('sid') === null ? '' : getUrlParams('sid');
    // 人事 邀请补充资料 外部地址用的 token
    let t = getUrl_t('t=') === null ?  '' : getUrl_t('t=');

    config.headers.token = token
    config.headers.sid = sid
    config.headers.t = t

    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.msg || '系统未知错误，请反馈管理员'

    // 二进制数据则直接返回
    if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer'){
      return res.data
    }
    if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
// export function download(url, params, filename) {
//   downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
//   return service.post(url, params, {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     responseType: 'blob'
//   }).then(async (data) => {
//     const isLogin = await blobValidate(data);
//     if (isLogin) {
//       const blob = new Blob([data])
//       saveAs(blob, filename)
//     } else {
//       const resText = await data.text();
//     }
//     downloadLoadingInstance.close();
//   }).catch((r) => {
//     console.error(r)
//     Message.error('下载文件出现错误，请联系管理员！')
//     downloadLoadingInstance.close();
//   })
// }

export default service
