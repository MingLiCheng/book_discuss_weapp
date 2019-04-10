<template>
  <div class='swiper'>
    <swiper
      :indicator-dots='true'
      indicator-color='#EA5A49'
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'
    >
      <div
        :key='imgindex'
        v-for='(top,imgindex) in imgUrls'
      >
        <swiper-item>
          <view class="image-box" v-for='img in top' :key='img.id'>
          <view class="adv-fdlogo" v-if="img.adv_id">广告</view>
          <img
            @click='bookDetail(img)'
            class='slide-image'
            mode='aspectFit'
            :src="img.image"
          >
          </view>
        </swiper-item>
      </div>

    </swiper>
  </div>
</template>

<script>
export default {
  props: ["tops"],
  computed: {
    imgUrls() {
      // 如果通用 请用chunk函数  比如lodash的chunk方法
      let res = this.tops;
      console.log([res.slice(0, 3), res.slice(3, 6), res.slice(6)]);
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
    }
  },
  methods: {
    bookDetail(item) {
      wx.navigateTo({
        url: "/pages/bookinfo/main?id=" + item.id
      });
    }
  }
};
</script>
<style lang='less'>
.swiper {
  box-sizing: border-box;
  padding-top: 5px;
  background-color: rgba(221, 224, 226, 0.959);
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
  .image-box{
    width: 33%;
    display: inline-block;
  }
  .slide-image {
    width: 100%;
    height: 250rpx;
  }
}
</style>

