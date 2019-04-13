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

  mounted () {
    this.getCartlist()
  },
  methods: {
    test () {
      console.log('ceshi')
      this.countPrice = 1000
    },
    onClickButton () {
      console.log('点击按钮')
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
      console.log('zhixing 计算', this.countPrice, this.carts)
    },
    async getCartlist () {
      getRequest('/cart/list', {
        openId: wx.getStorageSync('userinfo').openId
      }).then(res => {
        console.log('res', res)
        this.carts = res.data.carts
        this.compentedCountPrice()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
