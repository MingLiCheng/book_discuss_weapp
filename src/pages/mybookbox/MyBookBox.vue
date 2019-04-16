<template>
<section class="mybookbox-wrap">
  <view class="page__bd page__bd_spacing">
    <wux-button block type="assertive" @click="scannCodeAddBook">扫码添加图书<wux-icon type="ios-qr-scanner" size="16" /></wux-button>
  </view>
  <view>
    <p v-for="(isbnItem, isbnIndex) in tempIsbn" :key="isbnIndex">{{ isbnItem }}</p>
  </view>
</section>

</template>
<script>
import { postRequest } from "@/utils/request.js";
import { showSuccess, showModal } from "@/utils/index.js";
export default {
  data() {
    return {
      xxxx:'',
      openId:'',
      tempIsbn:['下面是失败的书本编码','请复制保存'],
    }
  },
  methods: {
    async addBook(isbn){
      // 程鹏 openid: "okzye4hpGfczbtZYfSrtj1wB3vds"
      let params = {
        isbn,
        openid: `${this.openId}`
      }

      try {
        const res = await  postRequest('/addbook', params)
        if(res.code === 0 && res.data.msg == 'success'){
          showModal('添加成功', `${res.data.title}添加成功`)
        }
      } catch (error) {
        if(error.data.msg == '图书已存在'){
          showModal('添加失败', `图书已存在`)
        }else{
          this.tempIsbn.push(isbn)
          showModal('添加失败', `联系管理员`)
        }

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
  mounted() {
    this.openId =  wx.getStorageSync('userinfo').openId
  },

}
</script>
<style>
</style>
