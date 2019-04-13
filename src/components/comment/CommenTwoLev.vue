<template>
  <section class="commentTwoLev-wrap">
    <wux-popup position="bottom" :visible="visible" @close="close">
      <wux-cell-group wux-class="textarea-cell">
        <wux-cell hover-class="none" title="评论">
          <wux-textarea @change="onChange" controlled :value="content" autoHeight hasCount rows="5" cursorSpacing="80"
            placeholder="请输入" />
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-button block type="balanced" @click="save" @tap="close">保存</wux-button>
        </wux-cell>
      </wux-cell-group>
    </wux-popup>
    <div class="crad-header">
      <div class="user-image-box">
        <img :src="userinfo.avatarUrl" alt>
      </div>
      <div class="username-box"><span>{{ userinfo.nickName }}</span> <span class="reply" v-if="!isOneself" @click="openReply">回复</span>
        <span v-if="isOneself" class="del" @click="delCommentById(commentInfo.id)">删除</span></div>
    </div>
    <div class="crad-body">
      <text class="comment-info">{{ commentInfo.content }}</text>
    </div>
    <div v-for="(childItem, childIndex) in childComments" :key="childIndex" class="child-box">
      <div class="crad-header">
        <div class="user-image-box">
          <img :src="childItem.user_info.avatarUrl" alt>
        </div>
        <div class="username-box"><span>{{ childItem.user_info.nickName }}</span> <span>回复：{{ userinfo.nickName }}</span> <span
            class="reply" v-if="childItem.openid != openid" @click="openReply">回复</span>
          <span v-if="childItem.openid == openid" class="del" @click="delCommentById(childItem.id)">删除</span></div>
      </div>
      <div class="crad-body">
        <text class="comment-info">{{ childItem.content }}</text>
      </div>
    </div>
  </section>
</template>

<script>
import { getRequest, postRequest } from "@/utils/request";
export default {
  props: ["commentInfo", "getCommentByIssue"],
  data() {
    return {
      visible: false,
      content: "",
      childComments:[],
      openid: '',
    };
  },
  computed: {
    userinfo() {
      this.getTheChildComments();
      return this.commentInfo.user_info || {};
    },
    isOneself() {
      return this.commentInfo.openid == wx.getStorageSync("userinfo").openId
        ? true
        : false;
    }
  },
  created(){
    this.openid = wx.getStorageSync("userinfo").openId
  },
  methods: {
    openReply() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onChange(e) {
      this.content = e.mp.detail.value;
    },
    async save() {
      // 判断是否登陆
      if (!wx.getStorageSync("userinfo").openId) {
        wx.showToast({
          title: "请登陆",
          icon: "none",
          duration: 2000
        });
        wx.switchTab({
          url: "/pages/me/main"
        });
      }
      const res = await postRequest("/comment/add", {
        openId: wx.getStorageSync("userinfo").openId,
        content: this.content,
        farther_id: this.commentInfo.id
      });
      if (res.code == 0 && res.data.message == "SUCCESS") {
        wx.showToast({
          title: "保存成功",
          icon: "success",
          duration: 2000
        });
        this.visible2 = false;
        this.content = "";
        console.log('this', this)
        this.getTheChildComments()
      }
    },
    async getTheChildComments() {
      const res = await getRequest('/comment/childlist', {
        farther_id: this.commentInfo.id
      })
      this.childComments = res.data.list
    },
    async delCommentById(id) {
      const res = await getRequest('/comment/delById', {
        comment_id: id
      })
      console.log('res', res);
      if(res.data.message == 'SUCCESS') {
        console.log('删除成功');
        this.$parent.getCommentByIssue()
        this.getTheChildComments()
      }
    }
  }
};
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
      .reply {
        display: inline-block;
        font-size: 20rpx;
        border: 1rpx solid rgb(224, 222, 222);
        padding: 0 5rpx;
      }
      .del {
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
  .child-box {
    padding-left: 20rpx;
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
