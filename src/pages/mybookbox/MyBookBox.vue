<template>
<section class="mybookbox-wrap">
   <h1>个人书袋</h1>
  <view class="page__bd page__bd_spacing">
    <wux-button block type="assertive" @click="scannCodeAddBook">扫码添加图书<wux-icon type="ios-qr-scanner" size="16" /></wux-button>
  </view>
</section>

</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    scannCodeAddBook() {
      // 允许从相机和相册扫码
      wx.scanCode({
        success(res) {
          console.log(res)
        }
      })
    }
  },

}
</script>
<style>
</style>
