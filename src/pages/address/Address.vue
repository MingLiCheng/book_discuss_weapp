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
          <van-button
            plain
            type="danger"
            size="mini"
            @click.stop="editAddress(addressItem.addressId)"
          >编辑</van-button>
          <van-button
            plain
            type="danger"
            size="mini"
            @click.stop="delAddress(addressItem.addressId)"
          >删除</van-button>
        </div>
      </van-cell>
    </wux-cell-group>
    <van-button plain type="danger" size="large" @click="addAddress">新增</van-button>
    <wux-dialog id="wux-dialog"/>
  </section>
</template>
<script>
import { getRequest, postRequest } from '@/utils/request.js'
import { $wuxDialog } from '../../../static/wux/index'
export default {
  data () {
    return {
      addresslist: [],
      orderToken: ''
    }
  },
  async onShow () {
    this.orderToken = this.$root.$mp.query.orderToken;
    await this.getAddressInfoByOpenId()
  },
  methods: {
    selectAddress (id) {
      if (!this.orderToken) {
        return false
      }
      wx.setStorageSync('addressId', id)
      wx.navigateBack({
        delta: 1
      })

    },
    editAddress (id) {
      wx.navigateTo({
        url: '/pages/addaddress/main?id=' + id
      })
    },
    async delAddress (id) {
      $wuxDialog().confirm({
        resetOnClose: true,
        closable: true,
        title: '删除改地址',
        content: '将删除改地址是否继续',
        onConfirm: async (e) => {
          const res = await postRequest('/address/del', {
            open_id: wx.getStorageSync('userinfo').openId,
            addressId: id
          })
          if (res.data.message == 'SUCCESS') {
            wx.showToast({
              title: "添加成功", //提示的内容,
              icon: "success", //图标,
              duration: 2000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => {
                this.getAddressInfoByOpenId()
              }
            })
          }
        },
        onCancel: (e) => {
          return false
        }
      })
    },
    addAddress () {
      wx.navigateTo({
        url: '/pages/addaddress/main'
      })
    },
    async getAddressInfoByOpenId () {
      const openId = wx.getStorageSync('userinfo').openId
      getRequest('/addresslist', { openId: openId }).then(res => {
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
