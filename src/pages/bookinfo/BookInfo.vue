<template>
  <div class="bookinfo-wraps">
    <BookInfo :book="book"></BookInfo>
    <div class="issue-list">
      <CommentCard v-for="(issue, issuesIndex) in issues" :key="issuesIndex" :commentInfo="issue"></CommentCard>
    </div>
  </div>
</template>
<script>
import BookCard from "@/components/BookCard";
import BookInfo from "@/components/BookInfo";
import CommentCard from "@/components/comment/CommentCard";
import { getRequest } from "../../utils/request.js";
export default {
  components: {
    BookCard,
    BookInfo,
    CommentCard
  },
  data () {
    return {
      bookid: '',
      book: {},
      openid: '',
      issues: []
    }
  },
  mounted () {
    this.openid = wx.getStorageSync('userinfo').openId
    this.bookid = this.$root.$mp.query.id
    this.getBookInfoById()
    this.getIssueByBookId()
  },
  methods: {
    async getBookInfoById () {
      await getRequest('/bookdetail', { id: `${this.bookid}`, openid: `${this.openid}` }).then(res => {
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.book = res.data
      })

    },
    async getIssueByBookId () {
      const res = await getRequest('/issue/list', {
        bookid: this.bookid
      })
      console.log('res', res);
      
      this.issues = res.data.list
      console.log('issues', this.issues);
      
    }
  },
}
</script>
<style lang="less" scoped>
.bookinfo-test {
  width: 100%;
  overflow: hidden;
}
.bookinfo-wraps {
  .issue-list {
    background-color: #e5e5e5;
    padding: 1rpx 10rpx;
  }
}
</style>
