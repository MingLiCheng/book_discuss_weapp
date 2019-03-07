<template>
  <section class="myinfo-wrap">
    <div class="avatar-box-wrap">
      <div class="user-avatar">
        <img :src="userInfo.avatarUrl" alt>
      </div>
      <div class="user-nickname">
        <div>{{ userInfo.username }}</div>
      </div>
      <div class="user-qita"></div>
    </div>

    <div class="userinfo-box-wrap">
      <wux-cell-group v-if="!isEdit" title="个人信息">
        <van-cell icon="contact" title="姓名" :value="userInfo.username"/>
        <van-cell icon="user-circle-o" title="昵称" :value="userInfo.nickName"/>
        <van-cell icon="free-postage" title="邮箱" :value="userInfo.email"/>
        <van-cell icon="phone-o" title="电话" :value="userInfo.tel_num"/>
        <van-cell icon="location-o" title="收货地址" value="管理我的地址" is-link url="/pages/address/main"/>
      </wux-cell-group>
      <wux-cell-group v-if="isEdit" title="编辑个人信息">
        <van-field :value="userInfo.username" label="姓名" left-icon="contact" :border="false"/>
        <van-field :value="userInfo.nickName" label="昵称" disabled left-icon="user-circle-o" :border="false"/>
        <van-field :value="userInfo.email" label="邮箱" left-icon="free-postage" :border="false"/>
        <van-field :value="userInfo.tel_num" label="电话" left-icon="phone-o" :border="false"/>
        <!-- <van-field :value="userInfo.username" label="用户名" placeholder="location-o" error/> -->
        <!-- <van-field
          :value="userInfo.tel_num"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
          :border="false"
        />
        <van-field
          :value="userInfo.tel_num"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          :border="false"
          use-button-slot
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field> -->
      </wux-cell-group>
    </div>
    <div class="edit-box-wrap">
      <wux-button v-if="!isEdit" block outline type="assertive" @click="changeToEdit">编辑</wux-button>
      <wux-button v-if="isEdit" block outline type="assertive" @click="editUserInfo">提交</wux-button>
      <wux-button v-if="isEdit" block outline type="assertive" @click="isEdit = !isEdit">取消</wux-button>
    </div>
  </section>
</template>
<script>
import { postRequest } from '../../utils/request.js'
export default {
  data() {
    return {
      isEdit:false,
      userInfo: {},
    }
  },
  async mounted() {
    const isLogin = this.$store.getters.getIsLogin
    // 判断用户有没有登陆，没有登陆 提示用户登陆
    if (!isLogin) {
      // 没登陆跳转到我的页面--登陆
      wx.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        complete(res) {
          wx.switchTab({
            url: '/pages/me/main'
          })
        }
      })
    } else {
      this.userInfo = wx.getStorageSync('userinfo')

      await this.getUserInfoFromMy()


    }
  },
  methods: {
    async getUserInfoFromMy() {
      postRequest('/userinfo', { openId: this.userInfo.openId }).then(res => {
        console.log('res', res)
        this.userInfo = {
          ...this.userInfo,
          ...res.data.data.userinfo
        }
        console.log('userInfo', this.userInfo)
      })
    },
    changeToEdit(){
      this.isEdit = true
    }
  },
}
</script>
<style lang="less" scoped>
.myinfo-wrap {
  .avatar-box-wrap {
    height: 200rpx;
    width: 100%;
    background-color: rgb(231, 139, 139);
    display: flex;
    align-items: center;
    justify-content: space-around;
    .user-avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      background: #000;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-nickname {
      background: rgb(126, 113, 113);
    }
    .user-qita {
      min-width: 240rpx;
      height: 100%;
      // background-color: aqua;
    }
  }
  .userinfo-box-wrap {
    width: 100%;
  }
}
</style>
