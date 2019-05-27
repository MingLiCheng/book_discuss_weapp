<template>
  <section class="shop-wrap">
    <!-- 商城首页 -->
    <div class="shop-home-wrap">
      <div class="search-bar">
        <div class="wrap" @click="onFocus">
          <wux-icon size="19" type="ios-search" color="#B2B2B2"/>
          <span>搜索</span>
        </div>
      </div>
      <div class="goods-box">
        <BookCardForShop
          v-for="(goodsItem, goodsIndex) in goodsList"
          :key="goodsIndex"
          :goods="goodsItem"
        ></BookCardForShop>
      </div>
    </div>
    <div v-if="!more" class="no-more-msg">没有更多</div>
    <div v-if="more" class="no-more-msg">加载中</div>

    <!-- 浮动按钮 -->
    <FabButton></FabButton>
  </section>
</template>
<script>
import BookCardForShop from "@/components/BookCardForShop.vue";
import FabButton from "@/components/FabButton.vue";
import GoodsCart from "../../components/shop/GoodsCart.vue";
import * as Api from "../../utils/request.js";

export default {
  components: { BookCardForShop, GoodsCart, FabButton },
  data() {
    return {
      goodsList: [],
      page: 0,
      more: true
    };
  },
  methods: {
    onFocus(e) {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    },
    async getGoodsList(init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const list = await Api.getRequest("/shop/goodslist", { page: this.page });

      if (init) {
        this.goodsList = list.data.list;
        if (this.goodsList.length >= list.data.total) {
          this.more = false;
        }
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新，不能直接覆盖books 而是累加
        this.goodsList = this.goodsList.concat(list.data.list);
      }
      wx.hideNavigationBarLoading();
    }
  },
  mounted() {
    this.getGoodsList(true);
  },
  onPullDownRefresh() {
    this.getGoodsList(true);
  },
  onReachBottom() {
    if (!this.more) {
      // 没有更多了
      return false;
    }
    this.page = this.page + 1;
    this.getGoodsList();
  }
};
</script>
<style lang="less">
.goods-box {
  display: flex;
  flex-wrap: wrap;
}
.wux-fab-button__icon {
  width: 60rpx !important;
  height: 60rpx !important;
}
.wux-fab-button--bottomRight {
  right: 5rpx !important;
  bottom: 100rpx !important;
}
.shop-wrap {
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
  .no-more-msg {
    text-align: center;
    font-size: 24rpx;
    color: rgb(172, 166, 166);
  }
}
</style>
