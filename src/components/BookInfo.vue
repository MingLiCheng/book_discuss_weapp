<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" :src="book.image" mode="aspectFill">
      <img class="img" :src="book.image" mode="aspectFit">
      <div class="info">
        <div class="title">{{book.title}}</div>
        <div class="author">{{book.author}}</div>
      </div>
    </div>
    <div class="detail flex">
      <div class="text-primary">
        <wux-rater font-size="15" max="5" controlled="true" :value="raterValue" disabled/>
        <span>{{ book.rate }}分</span>
      </div>
      <div v-if="book.isCollect == 0" class="collect" @click="setCollect(1)">
        <wux-icon type="ios-star-outline" color="#ea5a49" size="20"/>收藏
      </div>
      <div v-if="book.isCollect != 0" class="collect" @click="setCollect(0)">
        <wux-icon type="ios-star" color="#ea5a49" size="20"/>已收藏
      </div>
    </div>
    <div class="detail">
      {{book.publisher}}
      <div class="right">{{book.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" :key="tag" v-for="tag in book.tags">{{tag}}</div>
    </div>

    <wux-accordion-group :default-current="['0']">
      <wux-accordion title="内容摘要：">
        <div class="summary">
          <p :key="index" v-for="(summaryItem,index) in book.summary">{{summaryItem}}</p>
        </div>
      </wux-accordion>

      <wux-accordion title="作者简介：">
        <p>{{ book.author }}</p>
        <div>{{ book.author_intro }}</div>
      </wux-accordion>

      <wux-accordion title="目录：">
        <div>
          <p :key="index" v-for="(catalogItem,index) in book.catalog">{{catalogItem}}</p>
        </div>
      </wux-accordion>
    </wux-accordion-group>
    <button @click="test">xxxx</button>
  </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/request.js'
export default {
  data () {
    return {
      rex: 0,
    }
  },
  props: ['book'],
  computed: {
    userinfo () {
      return this.book.user_info || {}
    },
    raterValue () {
      return (this.book.rate / 2).toFixed(1)
    },
  },
  methods: {
    test () {
      this.rex = 1
    },
    async setCollect (iscollect) {
      const res = await postRequest('/collect/set', {
        isCollect: iscollect,
        openid: wx.getStorageSync('userinfo').openId,
        bookid: this.book.id
      })
      if(res.data.message==='SUCCESS'){
        this.book.isCollect = iscollect == 1 ? 1 : 0
      }else{
        wx.showToast({
          title:'失败'
        })
      }
    }
  },
  mounted () {
  },
  updated () {
  },
}
</script>

<style lang='less'>
.bookinfo {
  font-size: 14px;

  .badge {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px #ea5a49 solid;
    color: #ea5a49;
  }
  .summary {
    padding: 0 15px;
    // margin-top: 10px;
    p {
      text-indent: 2em;
      font-size: 14px;
    }
  }
  .right {
    float: right;
  }
  .detail {
    padding: 5px 10px;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .text-primary {
      position: relative;
      display: table-cell;
      vertical-align: bottom;
      width: 244rpx;
      span {
        position: absolute;
        padding-top: 4rpx;
        color: #e09015;
      }
    }
    .collect {
      width: 200rpx;
      height: 50rpx;
      text-align: center;
      line-height: 50rpx;
      color: #ea5a49;
      font-size: 30rpx;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
}
</style>


