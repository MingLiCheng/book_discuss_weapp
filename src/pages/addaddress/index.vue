<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份、城市、区县" v-model="address">
      </picker>
    </div>
    <!-- <view class="section">
      <view class="section__title">省市区选择器</view>
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <view class="picker">
          当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
        </view>
      </picker>
    </view>-->
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailadress">
    </div>
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#B4282D"/>设置为默认地址
        </label>
      </checkbox-group>
      <!-- <div @click="wxaddress">一键导入微信></div> -->
    </div>
    <div @click="saveAddress" class="bottom">保存</div>
  </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/request.js'

export default {
  created () { },
  mounted () {
    // this.openId = getStorageOpenid();
    this.openId = wx.getStorageSync('userinfo').openId
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.detailadress = this.res.detailInfo;
    }
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id;
      this.getDetail();
    }
  },
  data () {
    return {
      region: [],
      customItem: "全部",
      id: "",
      openId: "",
      res: {},
      userName: "",
      telNumber: "",
      address: "",
      detailadress: "",
      checked: false,
      province: '',
      city: '',
      area: ''
    };
  },
  methods: {
    bindRegionChange (e) {
      var value = e.mp.detail.value;
      this.address = value[0] + " " + value[1] + " " + value[2];
      this.province = value[0]
      this.city = value[1]
      this.area = value[2]
    },
    async getDetail () {
      const res = await getRequest("/address/get", {
        openid: this.openId , 
        addressId: this.id
      });
      var detail = res.data.info;
      this.userName = detail.name;
      this.telNumber = detail.tel_num;
      this.address = detail.province +''+ detail.city +''+ detail.area;
      this.detailadress = detail.street;
      this.checked = detail.is_default == 1 ? true : false;
    },
    checkboxChange (e) {
      this.checked = e.mp.detail.value[0];
    },
    async saveAddress () {
      var _this = this

      const res = await postRequest("/addads", {
        name: _this.userName,
        tel_num: _this.telNumber,
        province: _this.province,
        city: _this.city,
        area: _this.area,
        street: _this.detailadress,
        checked: _this.checked,
        open_id: _this.openId,
        addressId: _this.id
      });
      if (res.data.message == 'SUCCESS') {
        wx.showToast({
          title: "添加成功", //提示的内容,
          icon: "success", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            wx.navigateBack({
              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          }
        });
      }
    },
    wxaddress () {
      var _this = this;
      wx.chooseAddress({
        success: function (res) {
          _this.userName = res.userName;
          _this.telNumber = res.telNumber;
          _this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`;
          _this.detailadress = res.detailInfo;
        }
      });
    }
  }
};

</script>

<style lang='less' scoped>
.addaddress {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  .item {
    width: 690rpx;
    height: 70rpx;
    line-height: 70rpx;
    margin: 0 auto;
    padding: 10rpx 0;
    border-bottom: 1rpx solid #f4f4f4;
    input {
      width: 100%;
      height: 100%;
    }
  }
  .itemend {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    border: none;
    div:nth-child(2) {
      color: green;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    background: #b4282d;
    color: #fff;
    font-size: 32rpx;
  }
}
</style>
