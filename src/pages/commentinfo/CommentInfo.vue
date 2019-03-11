<template>
  <section class="commentinfo-wrap">
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
      <div></div>
      <div class="create"><wux-button clear type="positive"><wux-icon type="ios-create" size="16" /> 写评论</wux-button></div>
    </div>
    <div class="hr"></div>
    <div class="child-comment">
      <CommenTwoLev v-for="(item, itemIndex) in comment.list" :key="itemIndex" :commentInfo="item"></CommenTwoLev>
    </div>
  </section>
</template>
<script>
import CommenTwoLev from '@/components/comment/CommenTwoLev'
import { getRequest, postRequest } from "@/utils/request";
export default {
  components: {
    CommenTwoLev
  },
  data() {
    return {
      commentId: '',
      comment: {},
      bookId: '',
      book: {}
    }
  },
  async mounted() {
    this.commentId = this.$root.$mp.query.commentId
    await this.getCommentInfoById()
  },
  methods: {
    async  getCommentInfoById() {
      getRequest('/commentdetail', {
        commentId: this.commentId
      }).then(res => {
        console.log('res', res)
        this.bookId = res.data.info.list.bookid
        this.comment = res.data.info.list
        console.log('this.bookId', this.bookId)
        this.getBookInfoById()
      })
    },
    async getBookInfoById() {
      console.log('1')
      await getRequest('/bookdetail', { id: `${this.bookId}` }).then(res => {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.book = res.data
        console.log('getBookInfoById,res', res)
      })

    }
  },

}
</script>
<style lang="less">
.hr{
  height: 2rpx;
  width: 100%;
  background-color: rgb(175, 174, 174);
  margin: 20px 0px;
}
.commentinfo-wrap {
  box-sizing:border-box;
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
  .operate{
    height: 80rpx;
    border: 1rpx solid rgb(185, 184, 184);
    border-left: none;
    border-right: none;
    display: flex;
    justify-content: space-between;
    .create{
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1rpx solid rgb(185, 184, 184);
      width: 50%;
    }
  }
  .child-comment{
    background-color: rgb(236, 232, 232);
  }
}
</style>
