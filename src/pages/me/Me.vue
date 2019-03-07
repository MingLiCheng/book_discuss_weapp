<template>
  <section class="me-container">
    <div class="me-info-card">
      <div class="user-avatar">
        <open-data v-if="!userInfo.avatarUrl" type="userAvatarUrl"></open-data>
        <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" alt>
      </div>
      <div class="user-nickname">
        <open-data type="userNickName"></open-data>
      </div>
      <div class="user-qita">
        <button v-show="!getIsLogin" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">请登录</button>
      </div>
    </div>
    <div>
    <YearProgress></YearProgress>
    </div>
    <div class="me-module-box">
      <wux-cell-group>
        <wux-cell title="个人信息" is-link url="/pages/myinfo/main"></wux-cell>
        <wux-cell title="个人书袋" is-link url="/pages/mybookbox/main"></wux-cell>
        <wux-cell title="我的收藏" is-link url="/pages/mycollect/main"></wux-cell>
        <wux-cell title="评论消息" is-link url="/pages/mycommentmessage/main"></wux-cell>
        <!-- <wux-cell title="评论消息" is-link url="/pages/home/main" open-type="switchTab"></wux-cell> -->
      </wux-cell-group>
    </div>
  </section>
</template>
<script>
import YearProgress from '../../components/YearProgress'
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
import { mapMutations, mapGetters  } from 'vuex'
export default {
  components:{ YearProgress },
  data() {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  created() {
    this.userInfo = wx.getStorageSync('userinfo')
    console.log('me-userinfo', this.userInfo)
    // 判断用户是否的相关缓存
    if (wx.getStorageSync('userinfo')) {
      // 发生过授权
      this.isLogin = false

      // wx.switchTab({
      //   url: '/pages/me/main'
      // })
    } else {

    }
  },
  onLoad(){
    console.log('个人中心页面加载-->onLoad')
    console.log('getisLogin', this.getIsLogin)
    // 判断是否为登陆状态
    if(!this.getIsLogin){

    }
  },
  onUnload(){
    console.log('onUnload')
  },
  onShow(){
    console.log('个人中心页面显示--->onshow')
  },
  mounted() {
    console.log('mounted')
    this.userInfo = wx.getStorageSync('userinfo')
  },
  methods: {
    doLogin() {
      console.log('config.loginUrl', config.loginUrl)
      qcloud.setLoginUrl(config.loginUrl)
      const _this = this
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo', userinfo)
          // _this.isLogin = true
          _this.$store.dispatch('setIsLogin', true)
          _this.$store.dispatch('setOpenId', userinfo.openId)
          _this.userInfo = userinfo
          console.log('LoginSuccess', userinfo)
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getIsLogin'])
  },
}
</script>
<style lang="less" scoped>
.me-container {
  .me-info-card {
    height: 320rpx;
    width: 100%;
    background-color: rgb(231, 139, 139);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      background: #000;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-nickname {
      background: rgb(126, 113, 113);
    }
    .user-qita {
      min-width: 240rpx;
      height: 100%;
      // background-color: aqua;
    }
  }
  .me-module-box {
    box-sizing: border-box;
    width: 100%;
    height: 400rpx;
    background-color: brown;
    // padding: 10rpx 0rpx;
    p {
      height: 100rpx;
      line-height: 100rpx;
      border: 1xp;
    }
  }
}
</style>

