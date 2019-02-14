<template>
  <div>
    <h1>这是书本信息:{{ bookid }}</h1>
    <BookCard :book="book"></BookCard>
  </div>
</template>
<script>
import BookCard from "@/components/BookCard";
export default {
  components: {
    BookCard
  },
  data() {
    return {
      bookid:'',
      book:{
        title:'1111',
        author:'2222',
        publisher:'3333',
        rate:'8',
      }
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
  },
}
</script>
<style lang="less" scoped>

</style>
