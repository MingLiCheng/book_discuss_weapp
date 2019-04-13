<template>
  <section class="commentinfo-wrap">
    <wux-popup position="bottom" :visible="visible2" @close="Close2">
      <wux-cell-group wux-class="textarea-cell">
        <wux-cell hover-class="none" title="评论">
          <wux-textarea
            @change="onChange"
            controlled
            :value="content"
            autoHeight
            hasCount
            rows="5"
            cursorSpacing="80"
            placeholder="Count..."
          />
        </wux-cell>
        <wux-cell hover-class="none">
          <wux-button block type="balanced" @click="save" @tap="close2">保存</wux-button>
        </wux-cell>
      </wux-cell-group>
    </wux-popup>
    <div class="thumb">
      <img class="back" :src="book.image" mode="aspectFill">
      <img class="img" :src="book.image" mode="aspectFit">
      <div class="info">
        <div class="title">{{book.title}}</div>
        <div class="author">{{book.author}}</div>
      </div>
    </div>
    <div class="comment-info">
      <div class="comment-title">{{ comment.title }}</div>
      <div class="comment-content">{{ comment.content }}</div>
    </div>
    <div class="operate">
      <div class="create">
        <wux-button clear type="positive" @click="open2">
          <wux-icon type="ios-create" size="16"/>写评论
        </wux-button>
      </div>
      <div class="collect">
        <wux-button v-if="comment.isCollect == 0" clear type="positive" @click="setCollect(1)">
          <wux-icon type="ios-star-outline" size="18"/>收藏
        </wux-button>
        <wux-button v-if="comment.isCollect != 0" clear type="positive" @click="setCollect(0)">
          <wux-icon type="ios-star" size="18"/>已收藏
        </wux-button>
      </div>
    </div>
    <div class="hr"></div>
    <div class="child-comment">
      <CommenTwoLev v-for="(itemx, itemIndex) in comments" :key="itemIndex" :commentInfo="itemx"></CommenTwoLev>
    </div>
  </section>
</template>
<script>
import CommenTwoLev from "@/components/comment/CommenTwoLev";
import { getRequest, postRequest } from "@/utils/request";
export default {
  components: {
    CommenTwoLev
  },
  data () {
    return {
      commentId: "",
      comment: {},
      bookId: "",
      book: {},
      visible1: false,
      visible2: false,
      content: "",
      comments: []
    };
  },
  async mounted () {
    this.commentId = this.$root.$mp.query.commentId;
    await this.getIssueInfoById();
    await this.getCommentByIssue()
  },
  methods: {
    async setCollect (iscollect) {
      const res = await postRequest('/collect/set', {
        isCollect: iscollect,
        openid: wx.getStorageSync('userinfo').openId,
        issueid: this.comment.id
      })
      if (res.data.message === 'SUCCESS') {
        this.comment.isCollect = iscollect == 1 ? 1 : 0
      } else {
        wx.showToast({
          title: '失败'
        })
      }
    },
    async getIssueInfoById () {
      getRequest("/issue/detail", {
        issueId: this.commentId,
        openid: wx.getStorageSync('userinfo').openId
      }).then(res => {
        console.log("res", res);
        this.comment = res.data.detail;
        this.book = {
          image: res.data.detail.image,
          title: res.data.detail.bookName,
          author: res.data.detail.author
        };
      });
    },
    async getCommentByIssue () {
      const res = await getRequest("/comment/list", {
        issue_id: this.commentId
      });
      this.comments = res.data.list
    },
    open2 () {
      this.visible2 = true;
    },
    Close2 () {
      this.visible2 = false;
    },
    onChange (e) {
      this.content = e.mp.detail.value;
    },
    async save () {
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
        issueId: this.commentId,
        openId: wx.getStorageSync("userinfo").openId,
        content: this.content
      });
      if (res.code == 0 && res.data.message == "SUCCESS") {
        wx.showToast({
          title: "保存成功",
          icon: "success",
          duration: 2000
        })
        this.visible2 = false
        this.content = ''
        await this.getCommentByIssue()
      }
    }
  }
};
</script>
<style lang="less">
.hr {
  height: 2rpx;
  width: 100%;
  background-color: rgb(175, 174, 174);
  margin: 20px 0px;
}
.commentinfo-wrap {
  box-sizing: border-box;
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .comment-info {
    padding: 5px 15px;
    .comment-title {
      font-size: 18px;
      color: black;
      font-weight: 400;
    }
    .comment-content {
      text-indent: 2em;
      font-size: 14px;
      color: rgb(15, 15, 15);
    }
  }
  .operate {
    height: 80rpx;
    border: 1rpx solid rgb(185, 184, 184);
    border-left: none;
    border-right: none;
    display: flex;
    justify-content: space-between;
    .create {
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1rpx solid rgb(185, 184, 184);
      width: 49%;
    }
    .collect {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 49%;
    }
  }
  .child-comment {
    background-color: rgb(236, 232, 232);
  }
  .textarea-cell {
    min-height: 300rpx;
  }
}
</style>
