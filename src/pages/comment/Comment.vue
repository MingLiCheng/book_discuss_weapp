<template>
  <section class="comment-wrap">
    <div class="top-fixed-box">
      <div class="search-bar">
        <div class="wrap" @click="onFocus">
          <wux-icon size="19" type="ios-search" color="#B2B2B2"/>
          <span>搜索</span>
        </div>
         <div class="create-btn-box" @click="toNewComment">
          <wux-icon type="ios-create" size="28" style="padding:10px;" color="#0084ff"/>
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
            <!-- 关注 -->
            <CommentCard
              v-for="(collectItem, collectIndex) in myCollects"
              :key="collectIndex"
              :commentInfo="collectItem"
            ></CommentCard>

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
            <!-- 推荐 -->
            <CommentCard
              v-for="(commentItem, commentIndex) in comments"
              :key="commentIndex"
              :commentInfo="commentItem"
            ></CommentCard>
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
            <!-- 热榜 -->
            <CommentCard
              v-for="(commentItem, commentIndex) in comments"
              :key="commentIndex"
              :commentInfo="commentItem"
            ></CommentCard>

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
            <!-- 我的 -->
            <CommentCard
              v-for="(commentItem, commentIndex) in myComments"
              :key="commentIndex"
              :commentInfo="commentItem"
            ></CommentCard>

            <p id="footer-token" class="sfooter-box"></p>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
  </section>
</template>
<script>
import CommentCard from "@/components/comment/CommentCard";
import * as Api from "../../utils/request.js";
export default {
  components: { CommentCard },
  data() {
    return {
      current: "tab1",
      index: "0",
      tabs: [
        {
          key: "tab1",
          title: "关注",
          content: "Content of tab 1"
        },
        {
          key: "tab2",
          title: "全部",
          content: "Content of tab 2"
        },
        {
          key: "tab3",
          title: "热榜",
          content: "Content of tab 3"
        },
        {
          key: "tab4",
          title: "我的",
          content: "Content of tab 3"
        }
      ],
      comments: [],
      myComments: [],
      myCollects: [],
      openid: ""
    };
  },
  onShow () {
    this.openid = wx.getStorageSync("userinfo").openId

    this.getMyIssueByCollect()
  },
  onPullDownRefresh() {
    this.getMyIssueByCollect();
  },
  methods: {
    onFocus(e) {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    onTabsChange(e) {
      const { key } = e.mp.detail;
      this.current = key;
      this.index = this.tabs.map(n => n.key).indexOf(key);
    },
    onSwiperChange(e) {
      const { current: index, source } = e.mp.detail;
      const { key } = this.tabs[index];
      if (!!source) {
        this.current = key;
        this.index = index;
      }
      switch (index) {
        case 3:
          this.getMyComment();
          break;
        case 1:
          this.getAllcomment();
          break;

        default:
          break;
      }
    },
    async getAllcomment() {
      const res = await Api.getRequest("/issue/list");
      this.comments = res.data.list;
    },
    async getMyComment() {
      const res = await Api.getRequest("/issue/list", {
        openid: this.openid
      });
      this.myComments = res.data.list;
    },
    async getMyIssueByCollect() {
      const res = await Api.getRequest("/issue/collect", {
        openid: this.openid
      });
      wx.stopPullDownRefresh();
      this.myCollects = res.data.list;
    },
    toNewComment() {
      wx.navigateTo({
        url: "/pages/newcomment/main"
      });
    }
  }
};
</script>
<style lang="less">
.comment-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #efeff4;
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
      span {
        margin-left: 10rpx;
      }
    }
  }
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
      width: 66rpx;
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
