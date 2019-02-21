<template>
  <view>
    <van-card num="2" tag="标签" price="10.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg">
      <view slot="footer">
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </view>
    </van-card>

      <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onClickButton"
        custom-class="van-submit-bar"
        safe-area-inset-bottom="false"
      />

  </view>
</template>
<script>
export default {
  data() {
    return {
    }
  },
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
</style>

