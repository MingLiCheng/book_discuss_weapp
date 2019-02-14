<template>
  <section class="book-card-wrap">
      <wux-card>
        <view slot="body" class="card-body">
          <wux-image wux-class="image"  width="200rpx" height="271rpx" :src="book.image" loading="Loading" />
          <view class="book-info-msg">
            <view class="info-left">
              <p>{{ book.title }}</p>
              <p>作者：{{ book.author }}</p>
              <p>出版社：{{ book.publisher }}</p>
            </view>
            <view class="info-right">
              <wux-rater slot="footer"  font-size="15" :default-value="book.rate/2" disabled />
            </view>
          </view>
        </view>
      </wux-card>
  </section>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props:['book']

}
</script>
<style lang="less" scoped>
.book-image{
  width: 200rpx;
}
.card-body{
  background-color: rgb(56, 55, 55);
  display: flex;
  .book-info-msg{
    width: 225px;
    display: flex;
    justify-content: space-between;
    .info-left{
      background-color: hotpink;
      color: #ffffff;
    }
    .info-right{
      background-color: rgb(235, 116, 116);
    }
  }
}
</style>
