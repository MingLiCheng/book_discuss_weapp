<template>
  <section class="cmessage-wrap">
    <wux-cell-group title="ISSUE的相关评论" label="底部说明文字">
      <wux-cell
        v-for="(issueComment, issueCommentIndex) in issues_comments"
        :key="issueCommentIndex"
        :title="issueComment.content"
        is-link
        :url="'/pages/commentinfo/main?commentId=' + issueComment.issue_id"
        open-type="navigateTo"
      ></wux-cell>
    </wux-cell-group>
    <wux-cell-group title="回复的信息" label="底部说明文字">
      <wux-cell
        v-for="(replyItem, replyIndex) in reply_comments"
        :key="replyIndex"
        :title="replyItem.content"
        is-link
        open-type="navigateTo"
      ></wux-cell>
    </wux-cell-group>
  </section>
</template>
<script>
import { getRequest } from '../../utils/request.js'
export default {
  data () {
    return {
      issues_comments: [],
      reply_comments: []
    }
  },
  mounted () {
    this.getMyCollects()
  },
  methods: {
    async getMyCollects () {
      const res = await getRequest('/comment/list', {
        openid: wx.getStorageSync('userinfo').openId
      })
      this.issues_comments = res.data.list
      this.reply_comments = res.data.res
    }
  },

}
</script>
<style lang="less" scoped>
</style>
