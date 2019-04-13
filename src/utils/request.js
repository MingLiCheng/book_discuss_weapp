import config from '../config'
import qcloud from 'wafer2-client-sdk'

export function getRequest (url, params) {
  return request(url, 'GET', params)
}
export function postRequest (url, params) {
  return request(url, 'POST', params)
}

function request (url, method, params = null) {
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: config.host + url, // 仅为示例，并非真实的接口地址
      method,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: params,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
