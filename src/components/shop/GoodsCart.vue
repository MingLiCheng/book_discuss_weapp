<template>
  <view>
    <van-card :num="cart.goodnum" tag="标签" :price="parseFloat(cart.goodprice) " :desc="cart.author" :title="cart.title" :thumb="cart.image">
            <view  class="slot-tags" slot="tags">
        <wux-input-number color="assertive" slot="footer" />
      </view>
      <view  slot="footer">
        <wux-input-number color="assertive" slot="footer" />
      </view>
    </van-card>
  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props:['cart'],
  methods: {
    onClickButton() {
      console.log('点击按钮');
    },
    onClickLink() {
      console.log('修改地址');

    }
  }
}
</script>
<style>
.van-submit-bar {
  /* position: relative !important; */
  bottom: 0px;
}
.edit-address {
  color: #1989fa;
}
.van-tag {
  margin-left: 15px;
}
.slot-tags{
  display:'flex'
}
</style>

