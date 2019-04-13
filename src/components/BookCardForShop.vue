<template>
  <section class="bookcardforshop-wrap">
    <div
      class="image-box"
      @click="toGoodsInfoPage"
    >
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
      <div
        class="car-icon-box"
        @click="addToCart"
      >
        <wux-icon
          type="ios-cart"
          size="18"
          color="#EA5149"
        />
      </div>
    </div>

    <wux-toast id="wux-toast"/>
    <wux-dialog id="wux-dialog" />
  </section>
</template>
<script>
import { getRequest, postRequest } from "@/utils/request.js";
import { $wuxToast, $wuxDialog } from "../../static/wux/index";
export default {
  data() {
    return {};
  },
  props: ["goods"],
  methods: {
    toGoodsInfoPage() {
      wx.navigateTo({
        url:
          "/pages/goodsinfo/main?goodId=" +
          this.goods.good_id +
          "&bookId=" +
          this.goods.book_id
      });
    },
    addToCart() {
      if (!wx.getStorageSync("userinfo")) {
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: "您还没有登陆",
          content: "是否跳转到登陆页面",
          onConfirm(e) {
            wx.switchTab({
              url: "/pages/me/main"
            });
          },
          onCancel(e) {
            return false;
          }
        });
      } else {
        postRequest("/cart/addgood", {
          open_id: wx.getStorageSync("userinfo").openId,
          good_id: this.goods.good_id,
          goodnum: "1",
          goodprice: this.goods.price.substr(0, 5)
        }).then(res => {
          if (res.data.message == "SUCCESS") {
            $wuxToast().show({
              type: 'success',
              duration: 1500,
              color: '#EA5149',
              text: '添加成功',
              success: () => console.log('添加成功')
            })
          }
        });
      }
    }
  }
};
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
