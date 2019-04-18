<template>
  <section class="book-card-wrap">
    <wux-card>
      <view slot="body" class="card-body">
          <view class="adv-fdlogo" v-if="book.adv_id">广告</view>
          <wux-image
            wux-class="image"
            width="200rpx"
            height="271rpx"
            :src="book.image"
            loading="Loading"
          />

        <view class="book-info-msg" @click="toBookInfo">
          <view class="info-left">
            <p class="book-title">{{ book.title }}</p>
            <view class="book-author-box">
              <p v-for="(authorItem, index) in authorValue" :key="index">{{ authorItem }}</p>
            </view>
            <p v-if="isAuthorOver">...</p>
            <p class="book-publisher">{{ book.publisher }}</p>
          </view>
          <view class="info-right">
            <view class="rater-box">
              <wux-rater slot="footer" font-size="12" max="5" :default-value="raterValue" disabled/><span>{{ book.rate }}</span>
            </view>
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
  props: ['book'],
  mounted() {
    console.log('xx', this.book);
    
  },
  methods: {
    toBookInfo(){
      wx.navigateTo({
        url: '/pages/bookinfo/main?id=' + this.book.id
      })
    }
  },
  computed: {
    raterValue(){
      return (this.book.rate / 2).toFixed(1)
    },
    authorValue(){
      return (this.book.author).split(',')
    },
    isAuthorOver(){
      return (this.book.author).split(',').length > 3 ? true : false
    }
  },
}
</script>
<style lang="less" scoped>
.book-card-wrap {
  width: 100%;
  wux-card {
    width: 100%;
  }
  .book-image {
    width: 200rpx;
  }
  .card-body {
    // background-color: rgb(56, 55, 55);
    display: flex;
    .adv-fdlogo {
      position: absolute;
      width: 80rpx;
      height: 40rpx;
      background-color: rgb(34, 253, 89);
      z-index: 11;
      border-radius: 8rpx;
      color: #f8f1f1;
      text-align: center;
      line-height: 40rpx;
      font-weight: 500;
    }
    wux-image{
      border: 1rpx solid #EA5149;
      margin-right: 10rpx;
    }
    .book-info-msg {
      // width: 225px;
      font-size: 24rpx;
      display: flex;
      justify-content: space-between;
      .info-left {
        width: 300rpx;
        // background-color: hotpink;
        color: #666666;
        .book-title{
          font-size: 30rpx;
          padding-bottom: 20rpx;
          color: #EA5149;
        }
        .book-publisher{
          position: absolute;
          bottom: 20rpx;
        }
        .book-author-box{
          height: 96rpx;
          // background-color: rgb(26, 2, 2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .info-right {
        width: 176rpx;
        // background-color: rgb(235, 116, 116);
        .rater-box{
          display:table-cell;
          vertical-align:bottom;
          span{
            position: absolute;
            padding-top: 2px;
            color: #e09015;
          }
        }
      }
    }
  }
}
</style>
