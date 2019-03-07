<template>
  <section class="bookcardforshop-wrap">
    <div class="image-box" @click="toGoodsInfoPage">
      <wux-image
        wux-class="image"
        width="200rpx"
        height="271rpx"
        :src="goods.image"
        loading="Loading"
      />
    </div>
    <div class="title-box">{{ goods.author }}</div>
    <div class="book-price">
      <div class="price-box">{{ goods.price }}</div>
      <div class="car-icon-box" @click="addToCart">
        <wux-icon  type="ios-cart" size="18" color="#EA5149"/>
      </div>
    </div>

  <wux-toptips id="wux-toptips" />
  </section>
</template>
<script>
import { getRequest, postRequest } from "@/utils/request.js";
import { $wuxToptips } from '../../static/wux/index'
export default {
  data() {
    return {

    }
  },
  props: ['goods'],
  methods: {
    toGoodsInfoPage() {
      wx.navigateTo({
        url: '/pages/goodsinfo/main?goodId=' + this.goods.good_id + '&bookId='+this.goods.book_id
      })
    },
    addToCart(){
      console.log('good', this.goods)
      postRequest('/cart/addgood',{
        open_id: wx.getStorageSync('userinfo').openId,
        good_id: this.goods.good_id,
        goodnum:'1',
        goodprice: this.goods.price.substr(0,5)
      }).then( res=> {
        if(res.data.message == 'SUCCESS'){
          $wuxToptips().success({
            hidden: false,
            text: '添加成功',
            duration: 2000,
            success() {},
        })
        }
      })
    }
  },

}
</script>
<style lang="less" scoped>
.bookcardforshop-wrap {
  position: relative;
  width: 44%;
  height: 430rpx;
  // background: rgb(228, 98, 98);
  border: 1px solid #eee;
  box-sizing: border-box;
  margin: 20rpx;
  .image-box {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .title-box {
    font-size: 26rpx;
    text-align: center;
  }
  .book-price {
    position: absolute;
    width: 288rpx;
    display: flex;
    justify-content: space-between;
    height: 40rpx;
    padding: 0 20rpx;
    bottom: 20rpx;
    .price-box {
      width: 160rpx;
      font-size: 26rpx;
      // background-color: rgb(42, 83, 51);
    }
    .car-icon-box {
      width: 40rpx;
      border-radius: 50%;
      border: 1px solid #ea5149;
      display: flex;
      align-items: center;
      text-align: center;
      background-color: #fff;
      wux-icon {
        margin: 0 auto;
      }
    }
  }
}
</style>
