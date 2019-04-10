<template>
  <div>
    <wux-cell hover-class="none">
      <wux-input
        @change="onChange"
        placeholder="请输入标题"
        :controlled="true"
      />
      <wux-textarea
        @blur="onBlur"
        @focus="onFocus"
        hasCount
        rows="10"
        controlled
        cursorSpacing="80"
        placeholder="请输入内容"
      />
    </wux-cell>
    <wux-select id="wux-select2" />
    <view class="page__bd">
      <wux-cell-group>
        <wux-cell
          title="请选择相关书籍"
          :extra="bookName"
          @click="onClick2"
        ></wux-cell>
      </wux-cell-group>
    </view>
    <wux-button
      block
      type="assertive"
      @click="save"
    >保存</wux-button>

  </div>
</template>
<script>
import { $wuxSelect } from "../../../static/wux/index.js";
import { getRequest, postRequest } from "@/utils/request";
export default {
  data() {
    return {
      content: "",
      bookMapList: [],
      bookid: "",
      title: "",
      bookName: "",
      blurToken: false
    };
  },
  mounted() {
    this.getBookList();
  },
  methods: {
    async getBookList() {
      const res = await getRequest("/bookmap");
      console.log("res", res);
      this.bookMapList = res.data.list;
    },
    onClick2() {
      // 是否搜索
      $wuxSelect("#wux-select2").open({
        value: this.bookid,
        options: this.bookMapList,
        onConfirm: (value, index, options) => {
          console.log("onConfirm", value, index, options);
          if (index !== -1) {
            this.bookName = options[index].title;
            this.bookid = value;
          }
        }
      });
    },
    async save() {
      if (!this.blurToken) {
        return false;
      } else {
        // 判断是否登陆
        if(!wx.getStorageSync("userinfo").openId) {
          wx.showToast({
            title: "请登陆",
            icon: "none",
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/me/main'
          })
        }
        let params = {
          bookid: this.bookid,
          title: this.title,
          content: this.content,
          openid: wx.getStorageSync("userinfo").openId
        };
        console.log("NewComParams", params);
        const res = await postRequest("/issue/add", params);
        if (res.code == 0 && res.data.message === "SUCCESS") {
          wx.showToast({
            title: "新增成功",
            icon: "success",
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/comment/main'
          });
        } else {
          wx.showToast({
            title: "失败",
            icon: "none",
            duration: 2000
          });
        }
      }
    },
    onBlur(e) {
      this.content = e.mp.detail.value;
      this.blurToken = true;
    },
    onFocus(e) {
      this.blurToken = false;
    },
    onChange(e) {
      this.title = e.mp.detail.value;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
