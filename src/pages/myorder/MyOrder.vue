<template>
  <section class="myorder-wrap">
    <wux-tabs controlled theme="assertive" :current="tabCurrent" @change="onTabsChange($event)">
      <wux-tab key="tab" title="全部"></wux-tab>
      <wux-tab key="tab1" title="待付款"></wux-tab>
      <wux-tab key="tab2" title="待发货"></wux-tab>
      <wux-tab key="tab3" title="待收货"></wux-tab>
      <wux-tab key="tab4" title="待评价"></wux-tab>
    </wux-tabs>
    <div class="order-list-wrap">
      <div v-for="(orderItem, orderIndex) in orderlist" :key="orderIndex" class="order-card">
        <div class="seller-info" v-if="orderItem.trade_status == 0">未付款</div>
        <div class="seller-info" v-if="orderItem.trade_status == 1">待发货</div>
        <div class="seller-info" v-if="orderItem.trade_status == 2">待收货</div>
        <div class="seller-info" v-if="orderItem.trade_status == 3">待评价</div>
        <div
          class="goods-info"
          v-for="(goodsItem, goodsIndex) in orderItem.goods"
          :key="goodsIndex"
          :style="goodsIndex == orderItem.goods.length-1 ? 'border: 0px;' : ''"
        >
          <van-card
            :num="goodsItem.goods_number"
            :price="goodsItem.goods_price"
            desc="描述信息"
            :title="goodsItem.title"
            :thumb="goodsItem.image"
          />
        </div>
        <div class="order-info"></div>
        <div class="amount-info">共计{{ orderItem.goods_count }}件商品 合计: ￥{{ orderItem.order_amount }}</div>
        <div class="operation-wrap">
          <van-button plain hairline size="mini">更多</van-button>
          <van-button round plain hairline size="mini">查看物流</van-button>
          <van-button round plain hairline size="mini">延长收货</van-button>
          <van-button round plain hairline type="danger" v-if="orderItem.trade_status == 0" size="mini">取消订单</van-button>
          <van-button round plain hairline type="danger" v-if="orderItem.trade_status == 1" size="mini">提醒发货</van-button>
          <van-button round plain hairline type="danger" v-if="orderItem.trade_status == 2" size="mini">确认收货</van-button>
          <van-button round plain hairline type="danger" v-if="orderItem.trade_status == 3" size="mini">评价</van-button>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { postRequest, getRequest } from '@/utils/request.js'
export default {
  data () {
    return {
      tabCurrent: 'tab',
      orderlist: []
    }
  },
  onShow () {
    this.getOrderList()
  },
  computed: {

  },
  methods: {
    onTabsChange (e) {
      this.tabCurrent = e.mp.detail.key
      switch (this.tabCurrent) {
        case 'tab':
          this.getOrderList()
          break;
        case 'tab1':
          this.getOrderList('0')
          break;
        case 'tab2':
          this.getOrderList('1')
          break;
        case 'tab3':
          this.getOrderList('2')
          break;
        case 'tab4':
          this.getOrderList('3')
          break;
        default:
          break;
      }
      
    },
    async getOrderList (trade_status) {
      const res = await postRequest('/order/list', {
        openid: wx.getStorageSync('userinfo').openId,
        trade_status,
      })
      this.orderlist = res.data.list
    }
  },
}
</script>
<style lang="less" scoped>
.myorder-wrap {
  .order-list-wrap {
    width: 100%;
    background-color: rgb(234, 235, 233);
    padding: 14rpx;
    .order-card {
      width: 96%;
      border-radius: 15rpx;
      margin-top: 20rpx;
      background-color: #fff;
      overflow: hidden;
      .seller-info {
        height: 60rpx;
        font-size: 14px;
        color: #f15c64;
        font-weight: 600;
        padding-right: 40rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .goods-info {
        border-bottom: 0.5rpx solid #cccccc;
      }
      .order-info {
        height: 40rpx;
      }
      .amount-info {
        height: 40rpx;
        font-size: 14px;
        color: #333333;
        text-align: right;
        padding-right: 20rpx;
        // border-bottom: 0.5rpx solid #ccc;
      }
      .operation-wrap {
        height: 80rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        van-button {
          margin-right: 20rpx;
          color: #ccc;
        }
      }
    }
  }
}
</style>
