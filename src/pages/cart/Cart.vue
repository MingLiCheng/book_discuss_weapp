<template>
  <div>
    <h1 @click="test">这是购物车页面</h1>
    <GoodsCart v-for="(cart, cartIndex) in carts" :key="cartIndex" :cart="cart"></GoodsCart>
    <van-submit-bar
      :price="countPrice"
      button-text="提交订单"
      @submit="onClickButton"
      custom-class="van-submit-bar"
      safe-area-inset-bottom="false"
    />
  </div>
</template>
<script>
import GoodsCart from "@/components/shop/GoodsCart.vue";
import FabButton from '@/components/FabButton.vue'
import { getRequest, postRequest } from "@/utils/request.js";
export default {
  data() {
    return {
      carts: [],
      countPrice: '',
    }
  },
  components: {
    GoodsCart,
    FabButton
  },
  methods: {
    test(){
      console.log('ceshi')
      this.countPrice = 1000
    },
    onClickButton() {
      console.log('点击按钮');
    },
    compentedCountPrice() {
      let count = 0;
      this.carts.forEach(v => {
        count += (v.goodprice * v.goodnum)
      });
      this.countPrice = count*100
      console.log('zhixing 计算', this.countPrice, this.carts)
    },
    async getCartlist() {
      getRequest('/cart/list', { openId: wx.getStorageSync('userinfo').openId }).then(res => {
        console.log('res', res)
        this.carts = res.data.carts
        this.compentedCountPrice()
      })
    }
  },
  mounted() {
    this.getCartlist()
  }
}
</script>
<style lang="less" scoped>
</style>
