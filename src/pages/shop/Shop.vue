<template>
  <section class="shop-wrap">
    <!-- 商城首页 -->
    <div class="shop-home-wrap">
      <wux-search-bar clear maxlength="8"/>
      <div class="goods-box">
        <BookCardForShop
          v-for="(goodsItem, goodsIndex) in goodsList"
          :key="goodsIndex"
          :goods="goodsItem"
        ></BookCardForShop>
      </div>
    </div>

    <!-- 浮动按钮 -->
  <FabButton></FabButton>
  </section>
</template>
<script>
import BookCardForShop from '@/components/BookCardForShop.vue'
import FabButton from '@/components/FabButton.vue'
import GoodsCart from "../../components/shop/GoodsCart.vue";
import * as Api from '../../utils/request.js'


export default {
  components: { BookCardForShop, GoodsCart, FabButton },
  data() {
    return {
      goodsList: [],
    }
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    async getGoodsList() {
      const list = await Api.getRequest('/shop/goodslist')
      this.goodsList = list.data.list
    }
  },
  mounted() {
    this.getGoodsList()
  },

}
</script>
<style lang="less">
.goods-box {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
}
.fubtn_one {
  // background: #000 !important;
  // background-image: url("https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3426693439,1368089707&fm=173&app=49&f=JPEG?w=218&h=146&s=F922851855787E27354885C3030060B9") !important;
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
}
</style>
