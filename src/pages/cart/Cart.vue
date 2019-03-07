<template>
  <div>
    <h1>这是购物车页面</h1>
    <GoodsCart v-for="(cart, cartIndex) in carts" :key="cartIndex" :cart="cart"></GoodsCart>
    <van-submit-bar
      :price="3050"
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
      carts:[],
    }
  },
  components: {
    GoodsCart,
    FabButton
  },
  methods: {
    onClickButton() {
      console.log('点击按钮');
    },
    async getCartlist(){
      getRequest('/cart/list',{ openId: wx.getStorageSync('userinfo').openId}).then(res => {
        console.log('res', res)
        this.carts = res.data.carts
      })
    }
  },
  mounted() {
    this.getCartlist()
  },

}
</script>
<style lang="less" scoped>
</style>
