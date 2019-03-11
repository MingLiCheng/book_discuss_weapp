<template>
  <section class="commentTwoLev-wrap">
    <div class="crad-header">
      <div class="user-image-box">
        <img :src="userinfo.avatarUrl" alt>
      </div>
      <div class="username-box"><span>{{ userinfo.nickName }}</span> <span class="reply">回复</span></div>
    </div>
    <div class="crad-body">
      <text class="comment-info">{{ commentInfo.content }}</text>
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
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.commentTwoLev-wrap {
  width: 100%;
  border-left: none;
  border-right: none;
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
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .username-box {
      width: 80%;
      color: rgb(179, 170, 170);
      font-size: 30rpx;
      margin-left: 15rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .reply{
        display: inline-block;
        font-size: 20rpx;
        border: 1rpx solid rgb(224, 222, 222);
        padding: 0 5rpx;
      }
    }
  }
  .crad-body {
    border-top: 1rpx solid rgb(226, 223, 223);
    .comment-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 8rpx 0px;
    }
    .comment-info {
      font-size: 28rpx;
      color: rgb(110, 104, 104);
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
