<template>
  <section class="order-wrap">
    <wux-popup position="bottom" :visible="visible">
      <div class="pay-wrap">
        <div class="opeartion-wrap">
          <span @click="canclePay">取消</span>
          <span class="title">确认支付</span>
        </div>
        <div class="money-wrap">
          <div class="title">payment</div>
          <div class="money">￥{{ countPrice }}</div>
        </div>
        <div class="payee-wrap">
          <span>收款方</span>
          <span>思多多</span>
        </div>
        <div class="save-wrap">
          <div class="save-btn" @click="openPlain">立即支付</div>
        </div>
      </div>
    </wux-popup>
    <div class="address-box">
      <van-cell
        custom-class="flex-center"
        :title="address.name"
        :value="address.tel_num"
        size="large"
        :label="address.province+address.city+address.area+address.street"
        is-link
        url="/pages/address/main?orderToken=true"
        icon="location-o"
      />
    </div>
    <div class="goods-box">
      <view class="goodcard-wrap">
        <van-card
          tag="标签"
          :price="goodprice"
          :desc="goodsInfo.author"
          :title="goodsInfo.title"
          :thumb="goodsInfo.image"
        >
          <view class="slot-tags" slot="tags">
            <view class="numberinput">
              <wux-input-number
                color="assertive"
                slot="footer"
                @change="onGoodsNumChange"
                :controlled="true"
                :value="goodsNum"
              />
            </view>
          </view>
          <view slot="footer"></view>
        </van-card>
        <wux-dialog id="wux-dialog"/>
      </view>
    </div>
    <div class="order-info-box">
      <van-cell-group>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
        <van-cell title="单元格" value="内容"/>
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="countPrice"
      button-text="提交订单"
      @submit="onClickButton"
      custom-class="van-submit-bar"
      safe-area-inset-bottom="false"
    />

    <wux-loading id="wux-loading"/>
    <wux-keyboard id="wux-keyboard"/>
  </section>
</template>
<script>
import GoodsCart from '@/components/shop/GoodsCart.vue'
import FabButton from '@/components/FabButton.vue'
import { getRequest, postRequest } from '@/utils/request.js'
import { $wuxLoading, $wuxKeyBoard } from '../../../static/wux/index.js'
export default {
  components: {
    GoodsCart,
    FabButton
  },
  data () {
    return {
      goodsInfo: {},
      countPrice: '',
      openid: '',
      visible: false,
      addressId: '',
      address: '',
      goodsId: '',
      goodsNum: 1,
      orderId: ''
    }
  },
  computed: {
    goodprice () {
      return this.goodsInfo.goodprice ? this.goodsInfo.goodprice.toFixed(2) : 0
    }
  },
  created () {
    this.openid = wx.getStorageSync('userinfo').openId
  },
  onShow () {

    wx.setNavigationBarTitle({
      title: '确认订单'
    })
    this.getAddress(false)
    // 判断是否存在goodsId
    this.goodsId = this.$root.$mp.query.goodsId
    this.getGoodsInfoById()
    this.addressId = wx.getStorageSync('addressId')
    wx.removeStorageSync('addressId')
    if (this.addressId) {
      this.getAddress(this.addressId)
    }
  },
  methods: {
    onGoodsNumChange (e) {
      // 当要改变数量的时候就发送请求---->成功后 的到反馈在改变？
      if (e.mp.detail.value === 0) {
        // 提示是否删除该商品
        wx.showToast({
          title: '无法减少商品',
          icon: 'none'
        })
      } else {
        this.goodsNum = e.mp.detail.value
      }
      this.compentedCountPrice()
    },
    async getGoodsInfoById () {
      const res = await getRequest('/shop/gooddetail', {
        good_id: this.goodsId
      })
      this.goodsInfo = res.data.goodInfo[0]
      this.compentedCountPrice()
    },
    async getAddress (id) {
      if (!id) {
        // 默认加载
        const res = await getRequest('/address/get', {
          openid: this.openid
        })
        this.address = res.data.info
      } else {
        // 根据id加载
        const res = await getRequest('/address/get', {
          addressId: this.addressId
        })
        this.address = res.data.info
      }
    },
    closePopup () {
      this.visible = false
    },
    showLoading () {
      this.$wuxLoading = $wuxLoading()
      this.$wuxLoading.show({
        text: '订单生成中',
      })
    },
    hideLoading () {
      this.$wuxLoading.hide()
    },
    test () {
      this.countPrice = 1000
    },
    onClickButton () {
      // this.showLoading()
      // 生成订单 付款
      this.createOrder()
    },
    compentedCountPrice () {
      this.countPrice = this.goodsInfo.goodprice * this.goodsNum * 100
    },
    async getCartlist () {
      getRequest('/cart/list', {
        openId: wx.getStorageSync('userinfo').openId
      }).then(res => {
        this.carts = res.data.carts
        this.compentedCountPrice()
      })
    },
    // 生成订单
    async createOrder () {
      this.showLoading()
      // 根据商品生成订单 openId, goodsNum, goodsId, goodsPrice
      const res = await postRequest('/order/createByGoodsId', {
        openId: this.openid,
        goodsNum: this.goodsNum,
        goodsId: this.goodsId,
        goodsPrice: this.goodsInfo.goodprice
      })
      // 失败
      if (!res.data.message === 'SUCCESS') {
        this.hideLoading()
        wx.showToast({
          title: "失败，发生未知错误",
          icon: "none",
          duration: 2000
        })
      } else {
        // 成功
        this.hideLoading()
        wx.showToast({
          title: "提交订单成功",
          icon: "success",
          duration: 2000
        })
        this.countPrice = (res.data.count).toFixed(2)
        this.orderId = res.data.order
        this.toPay()
      }
    },
    // 弹出支付接口
    toPay () {
      console.log(1);
      setTimeout((params) => {
        console.log('this', this)
        this.visible = true
      }, 1000);
    },
    // 取消支付
    canclePay () {
      this.visible = false
      wx.showToast({
        title: '取消支付',
        icon: "none",
        duration: 2000,
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/myorder/main'
        })
      }, 500);
    },
    openPlain () {
      const fn = async (title, status) => {
        wx.hideLoading()
        wx.showToast({
          title,
          duration: 2000,
        })
        if (status) {
          // 成功 调用接口修改订单状态
          const res = await postRequest('/order/editStatus', {
            order_id: this.orderId,
            pay_status: '1', // 已经支付
            trade_status: '1' // 等待发货
          })
          if (res.data.message == 'SUCCESS') {
            setTimeout(() => {
              this.visible = false
              wx.redirectTo({
                url: '/pages/myorder/main'
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '发生未知错误联系管理员',
              duration: 2000,
            })
            this.visible = false
            wx.redirectTo({
              url: '/pages/me/main'
            })
          }
        } else {
          setTimeout(() => {
            this.visible = false
            wx.redirectTo({
              url: '/pages/myorder/main'
            })
          }, 1000);
        }
      }

      $wuxKeyBoard().show({
        className: 'className',
        titleText: '安全键盘',
        cancelText: '取消',
        inputText: '输入数字密码',
        showCancel: true,
        disorder: false,
        maxlength: 6,
        callback (value) {
          console.log(`输入的密码是：${value}`)

          wx.showLoading({
            title: '验证支付密码'
          })

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (`${value}` == '456789') {
                resolve(fn('密码正确', true))
              } else {
                reject(fn('密码错误', false))
              }
            }, 2000);

            // setTimeout(() => Math.ceil(Math.random() * 10) >= 6 ? resolve(fn('密码正确', true)) : reject(fn('密码错误', false)), 2000)
          })
        },
      })
    },

  }
}
</script>
<style lang="less">
.order-wrap {
  background-color: #cccccc;
  .pay-wrap {
    height: 600rpx;
    background-color: #cccccc;
    width: 100%;
    .opeartion-wrap {
      text-align: none;
      height: 100rpx;
      background-color: #37363b;
      color: #ffffff;
      font-size: 36rpx;
      line-height: 100rpx;
      display: flex;
      padding: 0 34rpx;
      .title {
        width: 460rpx;
      }
    }
    .money-wrap {
      height: 200rpx;
      background-color: #f5f5f5;
      color: black;
      font-size: 36rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .money {
        height: 80rpx;
        padding: 10rpx;
        font-size: 60rpx;
      }
    }
    .payee-wrap {
      box-sizing: border-box;
      height: 100rpx;
      padding: 0 40rpx;
      background-color: #ffffff;
      border: 2rpx 0px 2rpx 0pxsolid #d7d7d7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #d1d1d1;
      font-size: 34rpx;
      span:nth-child(2) {
        color: black;
      }
    }
    .save-wrap {
      height: 200rpx;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      .save-btn {
        height: 100rpx;
        width: 94%;
        background-color: #1aac19;
        color: #ffffff;
        font-size: 36rpx;
        border-radius: 6rpx;
        text-align: center;
        line-height: 100rpx;
      }
    }
  }
  .address-box {
    background-color: #fff;
    height: 176rpx;
    width: 100%;
    .flex-center {
      align-items: center;
    }
  }
  .goods-box {
    padding-top: 20rpx;
    background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png")
      0 0 repeat-x #fff;
    width: 100%;
    background-color: rgb(100, 240, 119);
    .goodcard-wrap {
      .slot-tags {
        display: flex;
        justify-content: flex-end;
        .numberinput {
          width: 230rpx;
        }
      }
    }
  }
  .order-info-box {
    padding: 20rpx 0;
    height: 300rpx;
    width: 100%;
    background-color: rgb(95, 209, 230);
  }
}
</style>
