<template>
  <div>
    <h1>这是新建评论模板页面</h1>
    <wux-cell hover-class="none">
      <wux-input label="title" placeholder="请输入标题"/>

      <wux-textarea hasCount rows="3" cursorSpacing="80" placeholder="请输入内容"/>
    </wux-cell>
    <wux-select id="wux-select2" />
        <view class="page__bd">
        <wux-cell-group title="Select">
            <wux-cell title="请选择相关书籍" :extra="title" @click="onClick2"></wux-cell>
            <wux-cell title="请选择相关书籍" :extra="title" @click="onClick2"></wux-cell>
        </wux-cell-group>
    </view>
    <wux-button block type="assertive" @click="save">保存</wux-button>

  </div>
</template>
<script>
import { $wuxSelect } from '../../../static/wux/index.js'
import { getRequest, postRequest } from "@/utils/request";
export default {
  data() {
    return {

    bookMapList:[],
    bookid:'',
    title:'',
    }
  },
  mounted() {
    this.getBookList()
  },
  methods: {
    async getBookList(){
      const res = await getRequest('/bookmap')
      console.log('res', res)
      this.bookMapList = res.data.list
    },
    onClick2() {
      // 是否搜索
        $wuxSelect('#wux-select2').open({
            value: this.bookid,
            options: this.bookMapList,
            onConfirm: (value, index, options) => {
                console.log('onConfirm', value, index, options)
                if (index !== -1) {
                  this.title = options[index].title
                  this.bookid = value
                }
            },
        })
    },
    save(){
      console.log('bookid', this.bookid, 'title', this.title)
          // openid,
    // bookid,
    // title,
    // summary,
    // content,
    // location,
    // phoneversion
    }
  },

}
</script>
<style lang="less" scoped>
</style>
