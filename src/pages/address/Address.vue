<template>
  <section class="address-wrap">
    <wux-cell-group title="我的收货地址">
      <van-cell
        v-for="(addressItem,addressIndex) in addresslist"
        :key="addressIndex"
        :title="addressItem.name"
        :value="addressItem.tel_num"
        size="large"
        value-class="value-cus-class"
        :label="addressItem.province+addressItem.city+addressItem.area+addressItem.street"
        @click="selectAddress(addressItem.addressId)"
      >
        <div slot="right-icon" class="van-cell__right-icon">
          <van-button plain type="danger" size="mini" @click.stop="editAddress">编辑</van-button>
          <van-button plain type="danger" size="mini" @click.stop="delAddress">删除</van-button>
        </div>
      </van-cell>
    </wux-cell-group>
    <van-button plain type="danger" size="large" @click="addAddress">新增</van-button>
  </section>
</template>
<script>
import { getRequest } from '@/utils/request.js'
export default {
  data () {
    return {
      addresslist: [],
      orderToken: ''
    }
  },
  async mounted () {
    this.orderToken = this.$root.$mp.query.orderToken;
    await this.getAddressInfoByOpenId()
  },
  methods: {
    selectAddress (id) {
      console.log('token', this.orderToken)
      if (!this.orderToken) {
        return false
      }
      console.log('你好 -- select')
      wx.setStorageSync('addressId',id)
      wx.navigateBack({
        delta: 1
      })

    },
    editAddress () {
      console.log('你好 -- edit')
    },
    delAddress () {
      console.log('你好 -- del')
    },
    addAddress () {
      console.log('你好 --- add')
    },
    async getAddressInfoByOpenId () {
      const openId = wx.getStorageSync('userinfo').openId
      getRequest('/addresslist', { openId: openId }).then(res => {
        console.log('res', res)
        this.addresslist = res.data.list
      })
    }
  }
}
</script>
<style lang="less">
.address-wrap {
  .value-cus-class {
    text-align: left;
  }
  .van-cell__right-icon {
    width: 100rpx;
  }
}
</style>
