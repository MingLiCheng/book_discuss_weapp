<template>
  <view class="goodcard-wrap">
    <van-card
      tag="标签"
      :price="goodprice"
      :desc="cart.author"
      :title="cart.title"
      :thumb="cart.image"
    >
      <view class="slot-tags" slot="tags">
        <view class="numberinput">
          <wux-input-number
            color="assertive"
            slot="footer"
            @change="onChange"
            :controlled="true"
            :value="cart.goodnum"
          />
        </view>
      </view>
      <view slot="footer"></view>
    </van-card>
    <wux-dialog id="wux-dialog"/>
  </view>
</template>

<script>
import { getRequest, postRequest } from "@/utils/request.js";
import { $wuxDialog } from '../../../static/wux/index'
export default {
  data() {
    return {
    }
  },
  props: ['cart'],
  computed: {
    goodprice() {
      return this.cart.goodprice.toFixed(2)
    }
  },
  methods: {
    onClickButton() {
      console.log('点击按钮');
    },
    onClickLink() {
      console.log('修改地址');

    },
    onChange(e) {
      // 当要改变数量的时候就发送请求---->成功后 的到反馈在改变？

      if (e.mp.detail.value == 0) {
        // 提示是否删除该商品
        $wuxDialog().confirm({
          resetOnClose: true,
          closable: true,
          title: '删除该商品',
          content: '减少将删除该商品',
          onConfirm: (e) => {
            postRequest('/cart/update', {
              goodnum: 0,
              goodprice: this.cart.goodprice,
              cart_id: this.cart.cart_id
            }).then(res => {
              console.log('res', res)
              this.$parent.getCartlist();
            })

          },
          onCancel: (e) => {
            console.log('谢谢你不吃之恩！')
            return false
          },
        })
      } else {
        this.cart.goodnum = e.mp.detail.value
        this.$parent.compentedCountPrice()
        postRequest('/cart/update', {
          goodnum: e.mp.detail.value,
          goodprice: this.cart.goodprice,
          cart_id: this.cart.cart_id
        }).then(res => {
          console.log('res', res)
        })
      }


    },
  }
}
</script>
<style lang="less" >
.van-submit-bar {
  /* position: relative !important; */
  bottom: 0px;
}
.edit-address {
  color: #1989fa;
}
.van-tag {
  margin-left: 15px;
}
.goodcard-wrap {
  .slot-tags {
    display: flex;
    justify-content: flex-end;
    .numberinput {
      width: 230rpx;
    }
  }
}
</style>

