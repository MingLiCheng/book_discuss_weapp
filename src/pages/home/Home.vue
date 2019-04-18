<template>
  <section class="home-wrap">
    <div class="search-bar">
      <div class="wrap" @click="onFocus">
        <wux-icon size="19" type="ios-search" color="#B2B2B2"/><span>搜索</span>
      </div>
    </div>
    <TopSwiper :tops="tops"></TopSwiper>
    <div class="classify-nav">
      <wux-tabs controlled scroll :current="tabCurrent" @change="onTabsChange($event)">
        <wux-tab key="tab1" title="全部"></wux-tab>
        <wux-tab key="文学" title="文学"></wux-tab>
        <wux-tab key="流行" title="流行"></wux-tab>
        <wux-tab key="文化" title="文化"></wux-tab>
        <wux-tab key="生活" title="生活"></wux-tab>
        <wux-tab key="经管" title="经管"></wux-tab>
        <wux-tab key="科技" title="科技"></wux-tab>
      </wux-tabs>
    </div>
    <BookCard v-for="(bookitem, index) in booklist" :key="index" :book="bookitem"></BookCard>
    <div v-if="!more" class="no-more-msg">没有更多</div>
    <div v-if="more" class="no-more-msg">加载中</div>
  </section>
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
  data () {
    return {
      tabCurrent: 'tab1',
      tops: [],
      booklist: [],
      book: {},
      page: 0,
      more: true,
    }
  },
  created () {
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
  onLoad () {
    this.getBookList(true)
    this.getTop()
  },
  onPullDownRefresh () {
    this.getTop()
    this.getBookList(true)
  },
  onReachBottom () {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getBookList()
  },
  updated () {
  },
  methods: {
    onFocus (e) {
      wx.navigateTo({
        url: "/pages/search/main"
      })
    },
    onTabsChange (e) {
      this.tabCurrent = e.mp.detail.key
      if (this.tabCurrent != 'tab1') {
        this.getBookByType(this.tabCurrent)
      } else {
        this.getBookList(true)
      }
    },
    async getTop () {
      const tops = await Api.getRequest('/top')
      this.tops = tops.data.list
      const bookAdv = await Api.getRequest('/adv/listByTypeId', { typeId: 0 })
      this.tops.splice(Math.floor(Math.random() * 8 + 0), 0, bookAdv.data.list[0])
      wx.stopPullDownRefresh()
    },
    async getBookList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const list = await Api.getRequest('/booklist', { page: this.page })
      if (list.data.list.length < 10 && this.page > 0) {
        this.more = false
        console.log('this.more', this.more)
      }
      if (init) {
        this.booklist = list.data.list
        await this.getAdvBookList()
        wx.stopPullDownRefresh()
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.booklist = this.booklist.concat(list.data.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getBookByType (type) {
      const list = await Api.getRequest('/book/getBooklistByType', { type })
      this.booklist = list.data.list
    },
    // 获取广告的列表
    async getAdvBookList () {
      const res = await Api.getRequest('/adv/listByTypeId', { typeId: 0 })
      this.booklist = this.booklist.concat(res.data.list)
    }
  },
  computed: {
    ...mapGetters(['getIsLogin']),
  },
}
</script>
<style lang="less">
.home-wrap {
  .search-bar {
    height: 88rpx;
    padding: 16rpx 20rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #efeff4;
    .wrap {
      position: relative;
      width: 100%;
      height: 56rpx;
      overflow: hidden;
      background-color: #fff;
      flex: 1;
      background-clip: padding-box;
      border-radius: 6rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 33rpx;
      color: rgb(170, 169, 169);
      span{
        margin-left: 10rpx;
      }
    }
  }
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
  .classify-nav {
    // height: 100rpx;
    width: 750rpx;
    background-color: rgb(245, 61, 61);
  }
  .book-image {
    width: 200rpx;
  }
  .no-more-msg {
    text-align: center;
    font-size: 24rpx;
    color: rgb(172, 166, 166);
  }
}
</style>
