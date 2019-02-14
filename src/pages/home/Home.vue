<template>
  <div>
    <div class="test-model">
      <van-button round custom-class="xxx" @click="openSetting">授权</van-button>
      <van-button round custom-class="xxx" >登陆</van-button>
      <van-button round custom-class="xxx" @click="vuextest1">test1</van-button>
      <van-button round custom-class="xxx" @click="vuextest2">test2</van-button>
    </div>
    <h1>这是首页</h1>
    <h1 v-if="getIsLogin">test</h1>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
    }
  },
  created() {
    Api.getRequest('/test').then(res => {
      console.log('远程接口 is running', res)
    })
    // 判断用户是否的相关缓存
    if (wx.getStorageSync('userinfo')) {
      // 发生过授权
      // wx.switchTab({
      //   url: '/pages/me/main'
      // })
    } else {

    }
  },
  onShow() {
    console.log('首页显示-->onshow')
  },
  updated() {
  },
  methods: {
    vuextest1() {
      console.log('isLogin-vuex', this.isLogin)
      console.log('isLogin-vuex', this.getIsLogin)
    },
    vuextest2() {
      // this.$store.dispatch('setIsLogin', false)
      this.getIsLogin ? this.$store.dispatch('setIsLogin', false) : this.$store.dispatch('setIsLogin', true)

    },
    openSetting() {
      wx.openSetting({
        success(res) {
          console.log('res',res)
          console.log(res.authSetting)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getIsLogin']),
  },
}
</script>
<style lang="less">
.test-model {
  height: 100rpx;
  width: 100%;
  background-color: rgba(77, 74, 74, 0.507);
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  top: 0;
  .xxx {
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
