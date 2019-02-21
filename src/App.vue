<script>
import { showSuccess } from "./utils/index.js";
export default {
  created () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
        // 未授权
        console.log('未授权')
        // 授权
        }
      }
    })


    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')

    // 判断用户是否登陆
    // 1.检测是否有缓存
    const userinfo = wx.getStorageSync('userinfo') || null
    if(userinfo) {
      this.$store.dispatch('setIsLogin', true)
        wx.showToast({
        title: '欢迎回来'+`${userinfo.nickName}`,
        icon: 'success',
        duration: 2000
      })
      // showSuccess('欢迎回来'+`${userinfo.nickName}`)
    }else{

    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
