<template>
  <div>
    <BookInfo :book="book"></BookInfo>
    <van-goods-action>
      <!-- <van-goods-action-icon icon="chat-o" text="客服"/> -->
      <van-goods-action-icon icon="cart-o" @click="toCart" text="购物车" info="5"/>
      <van-goods-action-button text="加入购物车" @click="addToCart" type="warning"/>
      <van-goods-action-button @click="toBuy" text="立即购买"/>
    </van-goods-action>
    <wux-toast id="wux-toast"/>
    <wux-dialog id="wux-dialog"/>
  </div>
</template>
<script>
import BookInfo from "@/components/BookInfo";
import { getRequest, postRequest } from "../../utils/request.js";
import { $wuxToast, $wuxDialog } from "../../../static/wux/index.js";

export default {
  components: {
    BookInfo,
  },
  data () {
    return {
      bookId: '',
      goodId: '',
      book: {}

    }
  },
  mounted () {
    this.bookId = this.$root.$mp.query.bookId
    this.goodId = this.$root.$mp.query.goodId
    this.getBookInfoById()
  },
  methods: {
    toCart () {
      wx.navigateTo({
        url: '/pages/cart/main'
      })
    },
    toBuy () {
      // 跳转至订单页面 并携带id
      wx.navigateTo({
        url: '/pages/directbuy/main?goodsId='+ this.goodId
      })
      // $wuxToast().show({
      //   type: 'cancel',
      //   duration: 1500,
      //   color: '#EA5149',
      //   text: '暂时不支持，请加入购物车后结算',
      //   success: () => console.log('点击直接购买')
      // })
    },
    onClickButton () {
      console.log('点击按钮');
    },
    async getBookInfoById () {
      await getRequest('/bookdetail', { id: `${this.bookId}` }).then(res => {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.book = res.data
      })
    },
    addToCart () {
      if (!wx.getStorageSync("userinfo")) {
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: "您还没有登陆",
          content: "是否跳转到登陆页面",
          onConfirm (e) {
            wx.switchTab({
              url: "/pages/me/main"
            });
          },
          onCancel (e) {
            return false;
          }
        });
      } else {
        postRequest("/cart/addgood", {
          open_id: wx.getStorageSync("userinfo").openId,
          good_id: this.goodId,
          goodnum: "1",
          goodprice: this.book.price.substr(0, 5)
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
  },

}
</script>
<style lang="less" scoped>
</style>
