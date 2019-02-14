<template>
  <div>
    <TopSwiper :tops='tops'></TopSwiper>
    <div class="test-model">
      <van-button round custom-class="xxx" @click="openSetting">授权</van-button>
      <van-button round custom-class="xxx" >登陆</van-button>
      <van-button round custom-class="xxx" @click="vuextest1">test1</van-button>
      <van-button round custom-class="xxx" @click="vuextest2">test2</van-button>
    </div>
    <BookCard v-for="(bookitem, index) in booklist" :key="index" :book="bookitem"></BookCard>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import * as Api from '../../utils/request.js'
import TopSwiper from '@/components/TopSwiper'
import BookCard from '@/components/BookCard'
import { mapGetters, mapState } from 'vuex';
export default {
  components: { TopSwiper, BookCard },
  data() {
    return {
      tops: [],
      booklist:[]
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
  onLoad(){
    this.getBookList()
    this.getTop()
  },
  onPullDownRefresh () {
    this.getTop()
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
    },
    async getTop () {
      const tops = await Api.getRequest('/top')
      this.tops = tops.data.list
      console.log('this.tops', this.tops)
      wx.stopPullDownRefresh()
    },
    async getBookList(){
      const list = await Api.getRequest('/booklist')
      this.booklist = list.data.list
      wx.stopPullDownRefresh()
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
