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
        <wux-button
          wux-class="user-login-btn"
          clear
          block
          v-if="!getIsLogin"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="doLogin"
        >登录</wux-button>
        <wux-button wux-class="user-login-btn" clear block v-if="getIsLogin" @click="setAuth">权限</wux-button>
      </div>
    </div>
    <div>
      <YearProgress></YearProgress>
    </div>
    <div class="me-module-box">
      <wux-cell-group>
        <wux-cell title="个人信息" is-link url="/pages/myinfo/main"></wux-cell>
        <wux-cell title="我的订单" is-link url="/pages/myorder/main"></wux-cell>
        <wux-cell title="我的收藏" is-link url="/pages/mycollect/main"></wux-cell>
        <wux-cell title="评论消息" is-link url="/pages/mycommentmessage/main"></wux-cell>
      </wux-cell-group>
    </div>
  </section>
</template>
<script>
import YearProgress from '../../components/YearProgress'
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: { YearProgress },
  data () {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  // created () {
  //   this.userInfo = wx.getStorageSync('userinfo')
  //   // 判断用户是否的相关缓存
  //   if (wx.getStorageSync('userinfo')) {
  //     // 发生过授权
  //     this.$store.dispatch('setIsLogin', true)
  //     // wx.switchTab({
  //     //   url: '/pages/me/main'
  //     // })
  //   } else {
  //     this.$store.dispatch('setIsLogin', false)
  //   }
  // },
  onShow () {
    this.userInfo = wx.getStorageSync('userinfo')
  },
  methods: {
    setAuth () {
      // wx.clearStorage()
      // wx.getSetting({
      //   success (res) {
      //     if (!res.authSetting['scope.record']) {
      //       wx.authorize({
      //         scope: 'scope.record',
      //         success () {
      //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      //           wx.startRecord()
      //         }
      //       })
      //     }
      //   }
      // })
      wx.openSetting({
        success (res) {
          console.log(res.authSetting)
        },
        fail (res) {
          console.log(res)
        }
      })
    },

    doLogin () {
      qcloud.setLoginUrl(config.loginUrl)
      const _this = this
      qcloud.login({
        success: function (userinfo) {
          wx.setStorageSync('userinfo', userinfo)
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
  }
}
</script>
<style lang="less">
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
      color: #ffffff;
      font-weight: 500;
    }
    .user-qita {
      min-width: 240rpx;
      height: 100%;
      // background-color: aqua;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      .user-login-btn {
        color: #ffffff;
      }
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

