<template>
  <div>
    <wux-cell-group title="收藏的图书" label="底部说明文字">
      <wux-cell
        v-for="(book, bookindex) in books"
        :key="bookindex"
        :title="book.title"
        is-link
        :url="'/pages/bookinfo/main?id=' + book.item_id"
        open-type="navigateTo"
      ></wux-cell>
    </wux-cell-group>
    <wux-cell-group title="收藏的问题" label="底部说明文字">
      <wux-cell
        v-for="(issue, issueindex) in issues"
        :key="issueindex"
        :title="issue.title"
        is-link
        :url="'/pages/commentinfo/main?commentId=' + issue.item_id"
        open-type="navigateTo"
      ></wux-cell>
    </wux-cell-group>
  </div>
</template>
<script>
import { getRequest } from '../../utils/request.js'
export default {
  data () {
    return {
      books: [],
      issues: []
    }
  },
  mounted () {
    this.getMyCollects()
  },
  methods: {
    async getMyCollects () {
      const res = await getRequest('/collect/list', {
        openid: wx.getStorageSync('userinfo').openId
      })
      this.books = res.data.books
      this.issues = res.data.issues
    }
  },

}
</script>
<style lang="less" scoped>
</style>
