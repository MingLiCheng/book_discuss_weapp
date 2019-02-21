<template>
  <div>
    <h1>这是商品详细信息页面 商品id{{ goodsId }}</h1>
    <BookInfo :book="book"></BookInfo>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" info="5"/>
      <van-goods-action-button text="加入购物车" type="warning"/>
      <van-goods-action-button text="立即购买"/>
    </van-goods-action>
  </div>
</template>
<script>
import BookInfo from "@/components/BookInfo";
import { getRequest } from "../../utils/request.js";
export default {
  components: {
    BookInfo,
  },
  data() {
    return {
      goodsId: '',
      book: {}

    }
  },
  mounted() {
    this.goodsId = this.$root.$mp.query.goodsId
    this.getBookInfoById()
  },
  methods: {
    onClickIcon() {
      console.log('点击图标');
    },

    onClickButton() {
      console.log('点击按钮');
    },
    async getBookInfoById() {
      await getRequest('/bookdetail', { id: `${this.goodsId}` }).then(res => {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.book = res.data
        console.log('getBookInfoById,res', res)
      })

    }
  },

}
</script>
<style lang="less" scoped>
</style>
