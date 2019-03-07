<template>
  <section class="address-wrap">
    <wux-cell-group  title="我的收货地址">
      <van-cell v-for="(addressItem,addressIndex) in addresslist"
      :key="addressIndex"
      :title="addressItem.name"
      :value="addressItem.tel_num" size="large"
      value-class="value-cus-class"
      :label="addressItem.province+addressItem.city+addressItem.area+addressItem.street">
        <div slot="right-icon" class="van-cell__right-icon">
          <van-button plain type="danger" size="mini">编辑</van-button>
          <van-button plain type="danger" size="mini">删除</van-button>
        </div>
      </van-cell>
    </wux-cell-group>
    <van-button plain type="danger" size="large">新增</van-button>
  </section>
</template>
<script>
import { getRequest } from '@/utils/request.js'
export default {
  data() {
    return {
      addresslist:[],
    }
  },
  async mounted() {
    console.log('1')
    await this.getAddressInfoByOpenId()
  },
  methods: {
    async getAddressInfoByOpenId(){
      const openId = wx.getStorageSync('userinfo').openId
      getRequest('/addresslist', { openId : openId}).then( res => {
        console.log('res', res)
        this.addresslist = res.data.list
      })
    }
  },

}
</script>
<style lang="less">
.address-wrap{
  .value-cus-class{
    text-align: left;
  }
  .van-cell__right-icon{
    width: 100rpx;
  }
}
</style>
