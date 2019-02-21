<template>
  <div>
    <BookInfo :book="book"></BookInfo>
    <CommentList></CommentList>
  </div>
</template>
<script>
import BookCard from "@/components/BookCard";
import BookInfo from "@/components/BookInfo";
import CommentList from "@/components/CommentList";
import { getRequest } from "../../utils/request.js";
export default {
  components: {
    BookCard,
    BookInfo,
    CommentList
  },
  data() {
    return {
      bookid: '',
      book: {}
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getBookInfoById()
  },
  methods: {
    async getBookInfoById() {
      await getRequest('/bookdetail', { id: `${this.bookid}` }).then(res => {
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
<style lang="less" scoped>
.bookinfo-test{
  width: 100%;
  overflow: hidden;
}
</style>
