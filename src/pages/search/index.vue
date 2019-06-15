<template>
  <div class="search">
    <div class="head">
      <div>
        <!-- <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
          alt
        > -->
        <wux-icon @click="qrscannerToSearch" type="ios-qr-scanner" size="26" style="padding:5px;" color="#ccc"/>
        <input
          type="text"
          confirm-type="search"
          focus="true"
          v-model="words"
          @focus="inputFocus"
          @input="tipsearch"
          @confirm="searchWords(words)"
          placeholder="商品搜索"
        >
        <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
        <img
          @click="clearInput"
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt
        >
      </div>
      <div @click="cancel">取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div
        @click="searchWords(item.title)"
        :data-value="item.title"
        v-for="(item,index) in tipsData"
        :key="index"
      >{{ item.title }}</div>
      <div v-if="tipsData.length==0" class="nogoods">数据库暂无此类商品...</div>
    </div>
    <div class="history" v-if="historyData.length!=0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div
          :data-value="item.keyword"
          v-for="(item,index) in historyData"
          @click="searchWords(item.keyword)"
          :key="index"
        >{{item.keyword}}</div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div
          v-for="(item,index) in hotData"
          @click="searchWords(item.keyword)"
          :data-value="item.keyword"
          :class="{active:0==index}"
          :key="index"
        >{{item.keyword}}</div>
      </div>
    </div>
    <!--图书列表  -->
    <!--商品列表  -->
    <div v-if="listData.length!=0" class="goodsList">
      <div class="booklist-wrap">
        <BookCard @click="test(1)" v-for="(dataItem, dataIndex) in listData" :key="dataIndex" :book="dataItem"></BookCard>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/request.js'
import BookCard from '../../components/BookCard'
export default {
  created () { },
  components: {
    BookCard
  },
  data () {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: [],
      book: {},
      listData: [],
      openid: "",
      order: "",
      isHot: "",
      isNew: ""
    };
  },
  mounted () {
    this.openid = wx.getStorageSync("userinfo").openId || "";
    this.getHotData();
  },

  methods: {
    qrscannerToSearch(){
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.searchWords(res.result)
          }
        }
      })
    },
    test (ex) {
      console.log('ex', ex)
    },
    goodsDetail (id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    cancel () {
      this.words = ''
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    clearInput () {
      this.words = "";
      this.listData = [];
      this.tipsData = [];
    },
    inputFocus () {
      //商品清空
      this.listData = [];
      //展示搜索提示信息
      this.tipsearch();
    },
    async getlistData () {
      //获取商品列表
      const data = await getRequest("/search/helperaction", {
        keyword: this.words
      })
      this.listData = data.data.keywords;
      this.tipsData = [];
    },
    async clearHistory () {
      const data = await postRequest("/search/clearhistoryAction", {
        openId: this.openid
      });
      console.log(data);
      if (data) {
        this.historyData = [];
      }
    },
    async searchWords (item) {
      var vaule = item
      this.words = vaule || this.words;
      const data = await postRequest("/search/addhistoryaction", {
        openId: this.openid,
        keyword: vaule || this.words
      });
      console.log(data);
      //获取历史数据
      this.getHotData();
      //获取商品列表
      this.getlistData();
    },
    async getHotData () {
      const data = await getRequest("/search/indexaction", {
        openId: this.openid
      });
      this.hotData = data.data.hotKeywordList
      this.historyData = data.data.historyData;
    },
    async tipsearch (e) {
      const data = await getRequest("/search/helperaction", {
        keyword: this.words
      });
      this.tipsData = data.data.keywords;
    },
    topicDetail (id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    }
  },
  computed: {}
};

</script>
<style lang='less'>
.search {
  height: 100vh;
  position: relative;
  font-size: 34rpx;
  .head {
    height: 91rpx;
    display: flex;
    padding: 0 32rpx;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.15);
    div:nth-child(1) {
      height: 59rpx;
      display: flex;
      align-items: center;
      background: #f4f4f4;
      img {
        display: inline-block;
        width: 31rpx;
        height: 31rpx;
        padding: 0 20rpx;
      }
      input {
        display: inline-block;
        width: 480rpx;
        height: 59rpx;
        margin-left: 10rpx;
      }
      .del {
        width: 53rpx;
        height: 53rpx;
        padding: 0;
      }
    }
    div:nth-child(2) {
      flex: 1;
      text-align: center;
      font-size: 34rpx;
      color: #42b983;
    }
  }
  .searchtips {
    position: absolute;
    width: 100%;
    top: 91rpx;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 32rpx;
    z-index: 9;
    background: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    div {
      padding: 20rpx 0;
    }
    .nogoods {
      text-align: center;
      margin-top: 300rpx;
    }
  }
  .goodsList {
    position: absolute;
    width: 100%;
    top: 91rpx;
    left: 0;
    bottom: 0;
    background: #fff;
    box-sizing: border-box; // padding: 0 32rpx;
    z-index: 9;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .booklist-wrap {
      position: relative;
    }
  }
  .history {
    background: #fff;
    padding: 32rpx;
    .t {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      div:nth-child(2) {
        width: 55rpx;
        height: 55rpx;
        background: url("http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    .cont {
      display: flex;
      flex-wrap: wrap;
      div {
        padding: 10rpx 10rpx;
        border: 1rpx solid #999;
        margin: 0 30rpx 20rpx 0;
      }
      .active {
        border: 1rpx solid #b4282d;
        color: #b4282d;
      }
    }
  }
  .hotsearch {
    margin-top: 20rpx;
  }
}
</style>
