<template>
  <section class="home-wrap">
    <wux-search-bar clear maxlength="8"/>
    <TopSwiper :tops="tops"></TopSwiper>
    <div class="classify-nav">
      <wux-tabs controlled scroll :current="tabCurrent" @change="onTabsChange($event)">
        <wux-tab key="tab1" title="全部"></wux-tab>
        <wux-tab key="tab2" title="文学"></wux-tab>
        <wux-tab key="tab3" title="流行"></wux-tab>
        <wux-tab key="tab4" title="文化"></wux-tab>
        <wux-tab key="tab5" title="生活"></wux-tab>
        <wux-tab key="tab6" title="经管"></wux-tab>
        <wux-tab key="tab7" title="科技"></wux-tab>
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
  data() {
    return {
      tabCurrent: 'tab1',
      tops: [],
      booklist: [],
      book: {},
      page: 0,
      more: true,
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
  onLoad() {
    this.getBookList(true)
    this.getTop()
  },
  onPullDownRefresh() {
    this.getTop()
    this.getBookList(true)
  },
  onReachBottom() {
    if (!this.more) {
      // 没有更多了
      return false
    }
    this.page = this.page + 1
    this.getBookList()
  },
  updated() {
  },
  methods: {
    onTabsChange(e) {
      console.log('oncheng', e)
      console.log('切换到', e.mp.detail.key)
      this.tabCurrent = e.mp.detail.key
    },
    async getTop() {
      const tops = await Api.getRequest('/top')
      this.tops = tops.data.list
      console.log('this.tops', this.tops)
      wx.stopPullDownRefresh()
    },
    async getBookList(init) {
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
        wx.stopPullDownRefresh()
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.booklist = this.booklist.concat(list.data.list)
      }
      wx.hideNavigationBarLoading()

    }
  },
  computed: {
    ...mapGetters(['getIsLogin']),
  },
}
</script>
<style lang="less">
.home-wrap {
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
  .no-more-msg{
    text-align:center;
    font-size:24rpx;
    color:rgb(172, 166, 166);

  }
}
</style>
