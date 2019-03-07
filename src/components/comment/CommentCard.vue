<template>
  <section class="commentcard-wrap">
    <div class="crad-header">
      <div class="user-image-box">
        <img :src="userinfo.avatarUrl" alt>
      </div>
      <div class="username-box">{{ userinfo.nickName }}</div>
    </div>
    <div class="crad-body">
      <div class="comment-title">{{ commentInfo.title }}</div>
      <text class="comment-info">{{ commentInfo.summary }}</text>
    </div>
    <div class="crad-footer">
      <div class="up-box">{{ commentInfo.upnumber }} <wux-icon type="ios-arrow-round-up" size="20" color="#EA5149" /></div>
      <div class="comment-box">{{ commentInfo.downnumber }} <wux-icon type="ios-arrow-round-down" size="20" color="#EA5149" /></div>
    </div>
  </section>
</template>

<script>
export default {
  //  {
  //               "id": 6,
  //               "openid": "okzye4qU_TEfD_vZI4JYLUzGpiXk",
  //               "bookid": "104",
  //               "content_id": "测试3",
  //               "title": "测试标题4",
  //               "summary": "测试简介3",
  //               "upnumber": 32,
  //               "create_time": "2019-03-04T08:09:26.000Z",
  //               "downnumber": 21,
  //               "phoneversion": "测试手机型号3",
  //               "location": "测试地址3",
  //               "twolevelcomment": null,
  //               "user_info": {
  //                   "nickName": "Murray_chan",
  //                   "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKEicWfExOkiaGDU4Vr4aWPEszUp1QrKRzFKnDKWrR4q4kD9S5yYUlp5LaLfhw8WrVeTJ8f1Tp4TAsg/132"
  //               }
  //           },
  props: ['commentInfo'],
  data() {
    return {
    }
  },
  computed: {
    userinfo() {
      return this.commentInfo.user_info || {}
    },
  }
}
</script>

<style lang="less" scoped>
.commentcard-wrap {
  width: 100%;
  border: 2rpx solid rgb(218, 214, 214);
  border-left: none;
  border-right: none;
  // border-radius: 10px;
  margin: 10rpx auto;
  box-sizing: border-box;
  padding: 0px 10rpx;
  background: rgb(255, 255, 255);
  .crad-header {
    height: 50rpx;
    display: flex;
    display: flex;
    .user-image-box {
      height: 50rpx;
      width: 50rpx;
      background: #000;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .username-box {
      color: rgb(221, 208, 208);
      font-size: 40rpx;
      margin-left: 15rpx;
    }
  }
  .crad-body {
    border-top: 1rpx solid #ccc;
    .comment-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 8rpx 0px;
    }
    .comment-info {
      font-size: 26rpx;
      color: rgb(167, 163, 163);
      // height: 100rpx;
      border: 1rpx solid #ccc;
      border-radius: 8rpx;
      padding: 8rpx;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
  .crad-footer {
    height: 40rpx;
    display: flex;
    font-size: 30rpx;
    color: rgb(167, 163, 163);
    line-height: 50rpx;
    border-bottom: 1rpx solid #ccc;
    .up-box {
      height: 100%;
    }
    .comment-box {
      margin-left: 15rpx;
      height: 100%;
    }
  }
}
</style>
