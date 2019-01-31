<template>
  <div class="me-container">
    <div class="user-avatar">
      <img :src="userInfo.avatarUrl" alt="" srcset="">
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created() {
    this.userInfo = wx.getStorageSync('userinfo')
    console.log('me-userinfo', this.userInfo)
  },
}
</script>
<style lang="less" scoped>
.user-avatar{
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto;
  border-radius: 50%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

