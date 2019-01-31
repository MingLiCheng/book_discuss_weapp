import config from '../config'

export function getRequest(url,params=null) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: config.host + url, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: params,
      success: function (res) {
        if(res.data.code === 0){
          reslove(res.data)
        }else{
          reject(res.data)
        }
      }
    })
  })
}