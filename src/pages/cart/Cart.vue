<template>
  <div>
    <GoodsCart v-for="(cart, cartIndex) in carts" :key="cartIndex" :cart="cart"></GoodsCart>
    <van-submit-bar :price="countPrice" button-text="结算" @submit="onClickButton" custom-class="van-submit-bar"
      safe-area-inset-bottom="false" />
  </div>
</template>
<script>
import GoodsCart from '@/components/shop/GoodsCart.vue'
import FabButton from '@/components/FabButton.vue'
import { getRequest } from '@/utils/request.js'
export default {
  components: {
    GoodsCart,
    FabButton
  },
  data () {
    return {
      carts: [],
      countPrice: ''
    }
  },
  onShow(){
    this.getCartlist()
  },
  methods: {
    test () {
      this.countPrice = 1000
    },
    onClickButton () {
      if(this.countPrice <=0 ){
        wx.showToast({
          title:'请添加商品后在结算',
          icon:'none'
        })
        return false
      }
      // 结算生成订单
      wx.navigateTo({
        url: '/pages/order/main'
      })
    },
    compentedCountPrice () {
      let count = 0
      this.carts.forEach(v => {
        count += v.goodprice * v.goodnum
      })
      this.countPrice = count * 100
    },
    async getCartlist () {
      getRequest('/cart/list', {
        openId: wx.getStorageSync('userinfo').openId
      }).then(res => {
        this.carts = res.data.carts
        this.compentedCountPrice()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
