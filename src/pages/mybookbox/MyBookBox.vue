<template>
  <section class="mybookbox-wrap">
    <view class="page__bd page__bd_spacing">
      <wux-button block type="assertive" @click="scannCodeAddBook">
        扫码添加图书
        <wux-icon type="ios-qr-scanner" size="16"/>
      </wux-button>
    </view>
    <view>
      <p v-for="(isbnItem, isbnIndex) in tempIsbn" :key="isbnIndex">{{ isbnItem }}</p>
    </view>
    <div>
      <wux-button block type="assertive" @click="content">连接</wux-button>
      <wux-button block type="assertive" @click="send">发送</wux-button>
      <wux-button block type="assertive" @click="test1">测试</wux-button>
      <wux-button block type="assertive" @click="test2">测试</wux-button>
    </div>
  </section>
</template>
<script>
import { postRequest } from "@/utils/request.js";
import { showSuccess, showModal } from "@/utils/index.js";
export default {
  data () {
    return {
      xxxx: '',
      openId: '',
      tempIsbn: ['下面是失败的书本编码', '请复制保存'],
    }
  },
  onLoad: function () {

    wx.connectSocket({
      url: 'wss://c8ezbnbi.ws.qcloud.la/weapp/tunnel' // 这里是服务器的地址
    }),
      wx.onSocketOpen(function (res) {
        // callback
        console.log("WebSocket连接已打开！"); // 打开WebSocket连接，在进行通信之前必须先打开一个连接
      }),
      wx.onSocketError(function (res) {  // WebSocket错误监听
        console.log('WebSocket连接打开失败，请检查！')
      }),
      wx.onSocketMessage(function (msg) { // WebSocket数据接收监听
        // CallBack
        console.log('onSocketMessage',msg);
      }),
      wx.onSocketClose(function () { // WebSocket关闭监听
        // callback
        console.log('WebSocket服务器已经关闭！');
      })
  },
  methods: {
    async addBook (isbn) {
      // 程鹏 openid: "okzye4hpGfczbtZYfSrtj1wB3vds"
      let params = {
        isbn,
        openid: `${this.openId}`
      }

      try {
        const res = await postRequest('/addbook', params)
        if (res.code === 0 && res.data.msg == 'success') {
          showModal('添加成功', `${res.data.title}添加成功`)
        }
      } catch (error) {
        if (error.data.msg == '图书已存在') {
          showModal('添加失败', `图书已存在`)
        } else {
          this.tempIsbn.push(isbn)
          showModal('添加失败', `联系管理员`)
        }

      }
    },
    scannCodeAddBook () {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    content () {
      wx.sendSocketMessage({ // 向服务器发送数据，注意这个方法之必须在调用wx.connectSocket和wx.onSocketOpen回调之后
        data: "string" // 官方文档里data可以是string或者ArrayBuffer，但是注意这个ArrayBuffer并不是Array
      })
    },
    send () {

    },
    test1 () {

    },
    test2 () {

    },
  },
  mounted () {
    this.openId = wx.getStorageSync('userinfo').openId
  },

}
</script>
<style>
</style>
