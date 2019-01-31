<template>
  <div>
    <h1>这是首页</h1>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
export default {
  created() {
    console.log('test')
    Api.getRequest('/test').then(res => {
      console.log('res', res)
      console.log('xxx')
    })
    console.log('xxxxxxx')
  },
  methods: {
    doLogin() {
      console.log('config.loginUrl', config.loginUrl)
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo',userinfo)
          console.log('LoginSuccess', userinfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    }
  },
}
</script>
<style>
</style>
