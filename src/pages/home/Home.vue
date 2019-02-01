<template>
  <div>
    <h1>这是首页</h1>
    <button v-show="!isLogin" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">请登录</button>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  created() {
    Api.getRequest('/test').then(res => {
      console.log('远程接口 is running', res)
    })
    // 判断用户是否的相关缓存
    if(wx.getStorageSync('userinfo')){
      // 发生过授权
      this.isLogin = true
      // wx.switchTab({
      //   url: '/pages/me/main'
      // })
    }else{

    }

  },
  methods: {
    doLogin() {
      console.log('config.loginUrl', config.loginUrl)
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo',userinfo)
          this.isLogin = true
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
