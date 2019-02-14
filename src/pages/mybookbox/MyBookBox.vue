<template>
<section class="mybookbox-wrap">
   <h1>个人书袋</h1>
  <view class="page__bd page__bd_spacing">
    <wux-button block type="assertive" @click="scannCodeAddBook">扫码添加图书<wux-icon type="ios-qr-scanner" size="16" /></wux-button>
    <wux-button block type="assertive" @click="AddBooktest">扫码添加图书<wux-icon type="ios-qr-scanner" size="16" /></wux-button>
    <input type="text" v-model.lazy="xxxx">
  </view>
</section>

</template>
<script>
import { postRequest } from "@/utils/request.js";
import { showSuccess } from "@/utils/index.js";
export default {
  data() {
    return {
      xxxx:'',
    }
  },
  methods: {
    AddBooktest(){
      // console.log('xxx',this.xxxx)
      this.addBook(this.xxxx)
    },
    async addBook(isbn){
      const res = await postRequest('/addbook', {
        isbn,
        openid: "okzye4qU_TEfD_vZI4JYLUzGpiXk"
      })
      if(res.code === 0 && res.data.title){
        showModal('添加成功', `${res.title}添加成功`)
      }
    },
    scannCodeAddBook() {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    }
  },

}
</script>
<style>
</style>
