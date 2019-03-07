<template>
  <section class="comment-wrap">
    <div class="top-fixed-box">
      <div class="top-search-box">
        <div class="search-box-a">
          <wux-search-bar clear maxlength="8"/>
        </div>
        <div class="create-btn-box">
          <wux-icon type="ios-create" size="28" color="#0084ff"/>
        </div>
      </div>
      <wux-tabs
        wux-class="bordered"
        theme="assertive"
        controlled
        :current="current"
        @change="onTabsChange"
      >
        <block v-for="(tabItem,tabIndex) in tabs" :key="tabIndex">
          <wux-tab :key="tabItem.key" :title="tabItem.title"></wux-tab>
        </block>
      </wux-tabs>
    </div>
    <div class="tab-item-wrap">
      <swiper :current="index" @change="onSwiperChange">
        <swiper-item>
          <scroll-view
            scroll-y
            style="height: 100%; padding: 10px 5px 20px 5px; box-sizing: border-box;"
            scroll-into-view="footer-token"
            scroll-top="0"
          >
            <CommentCard v-for="(commentItem, commentIndex) in comments" :key="commentIndex" :commentInfo="commentItem" ></CommentCard>
            <p id="footer-token" class="sfooter-box"></p>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            scroll-y
            style="height: 100%; padding: 10px 5px 20px 5px; box-sizing: border-box;"
            scroll-into-view="footer-token"
            scroll-top="0"
          >
            <p id="footer-token" class="sfooter-box"></p>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            scroll-y
            style="height: 100%; padding: 10px 5px 20px 5px; box-sizing: border-box;"
            scroll-into-view="footer-token"
            scroll-top="0"
          >

            <p id="footer-token" class="sfooter-box"></p>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            scroll-y
            style="height: 100%; padding: 10px 5px 20px 5px; box-sizing: border-box;"
            scroll-into-view="footer-token"
            scroll-top="0"
          >
            <p id="footer-token" class="sfooter-box"></p>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
    <!-- <div class="fab-btn"><wux-icon type="ios-create" size="28" color="#0084ff"/></div> -->
  </section>
</template>
<script>
import CommentCard from "@/components/comment/CommentCard";
import * as Api from '../../utils/request.js'
export default {
  components: { CommentCard },
  data() {
    return {
      current: 'tab1',
      index: '0',
      tabs: [
        {
          key: 'tab1',
          title: '关注',
          content: 'Content of tab 1',
        },
        {
          key: 'tab2',
          title: '推荐',
          content: 'Content of tab 2',
        },
        {
          key: 'tab3',
          title: '热榜',
          content: 'Content of tab 3',
        },
        {
          key: 'tab4',
          title: '我的',
          content: 'Content of tab 3',
        },
      ],
      comments:[],

    }
  },
  mounted() {
    this.getAllcomment()

  },
  methods: {
    onTabsChange(e) {
      // console.log('onTabsChange', e)
      const { key } = e.mp.detail
      this.current = key
      this.index = this.tabs.map((n) => n.key).indexOf(key)
    },
    onSwiperChange(e) {
      // console.log('onSwiperChange', e)
      const { current: index, source } = e.mp.detail
      const { key } = this.tabs[index]
      if (!!source) {
        this.current = key
        this.index = index
      }
    },
    async getAllcomment(){
      const res = await Api.getRequest('/commentlist')
      console.log('comments', res)
      this.comments = res.data.list
    }
  },


}
</script>
<style lang="less">
.comment-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #efeff4;
  .top-fixed-box {
    width: 100%;
    height: 174rpx;
    z-index: 99;
    .top-search-box {
      display: flex;
    }
    .search-box-a {
      flex: 1;
    }
    .create-btn-box {
      width: 100rpx;
      display: flex;
      align-items: center;
    }
  }
  .tab-item-wrap {
    // background: rgb(240, 148, 95);
    flex: 1;
    swiper {
      width: 100%;
      height: 100%;
      swiper-item {
        // background-color: hotpink;
        .sfooter-box {
          height: 50rpx;
          width: 100%;
        }
      }
    }
  }
  .fab-btn {
    position: fixed;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-color: rgb(31, 139, 228);
    right: 20rpx;
    top: 10rpx;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#green {
  height: 100px;
  width: 100%;
  background-color: green;
}
#red {
  height: 100px;
  width: 100%;
  background-color: red;
}
#yellow {
  height: 100px;
  width: 100%;
  background-color: yellow;
}
#blue {
  height: 100px;
  width: 100%;
  background-color: blue;
}
</style>
