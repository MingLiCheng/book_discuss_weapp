<template>
  <section class="shop-wrap">
    <!-- 商城首页 -->
    <div v-show="isShowHome" class="shop-home-wrap">
      <wux-search-bar clear maxlength="8"/>
      <div class="goods-box">
        <BookCardForShop
          v-for="(goodsItem, goodsIndex) in goodsList"
          :key="goodsIndex"
          :goods="goodsItem"
        ></BookCardForShop>
      </div>
    </div>
    <!-- 购物车页面  -->
    <div v-show="isShowCart" class="shop-cart-wrap">
      <h1>这是购物车页面</h1>
      <GoodsCart></GoodsCart>
    </div>
    <!--我的订单页面  -->
    <div v-show="isShowOrder" class="shop-order-wrap">
      <h1>我的订单页面</h1>
    </div>

    <!-- 浮动按钮 -->
    <div>
      <wux-fab-button
        @iclick="onClick($event)"
        defaultVisible="true"
        position="bottomRight"
        direction="vertical"
        theme="assertive"
        :reverse="reverse"
        spaceBetween="10"
        sAngle="0"
        eAngle="360"
        :buttons="buttons"
      />
    </div>
  </section>
</template>
<script>
import BookCardForShop from '@/components/BookCardForShop.vue'
import GoodsCart from "../../components/shop/GoodsCart.vue";
import * as Api from '../../utils/request.js'

const homeIcon = 'data:image/png;base64,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'
const cartIcon = 'data:image/png;base64,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'
const orderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAFmUlEQVR4Xu2cS4gcVRSG/1OvBEJ8homZTLXEZHq6M2IMPhBFjLhRREUXCSSIW934CGYhGtS4yUId3YhZuBB8LAYURQQ3RsEgESIJOnZ1JjGxagYmjuL4CHFuddeRap1M9ziPvlW3J7f11vrc//zn61O3i7q3LsFcuQlQbgUjAANRQRMYiAaiAgIKJEwnGogKCCiQUNKJlfUoku3eCeBGZrqBCEUF3joiwYxRIv6KExwGx5+Ux3E8b6JcEBlwqr7zFBPtJZCb18xyj2dwTMz7BqLafgJqWfNnhniyD/0xucMg2pI1uTbjmI9xEm/P2pWZII4Anl3wjgEoaQMiv5FKPRTXDgJCVioTxIrvvkxET7QkY04Y9AGYPyXmESawrJlOxxODmGiQiO4A+F4QWc05mfmlchQ/KetDGmKl17mZbPoCROfHMviIA3qoPxQjsgYuVHzQ510D4jdAdP15D8wp5ltLYe2QjC9piIHvvg2inbNJ+FdnOi5uOoMfZRLrEPt9D9aKlW4VoIubQL5TiuJdMv6kIVYK7tcE2jqThJh3D0TxkExSnWKDgvsYQK/MeErvqnIYz3ZnG2azQJwmkDejbdV5a3E8PtpGLi1DRgve5jrQNA3xdCmMV8qYlYJYWY/LyfZ+ak4wEAqbgEQmqU6xDFjVgldv+YOpizXlcfzcrk8piNVerGHHm2wWL4VCSqNdY8sZFxS8licJW4ie/gm01LmYHykABuL8KA1EAKYTFdz3BqKBqICAAgnTiQaiAgIKJEwnGogKCCiQMJ34f4A4sRarfvOc6+qMlhegCmpfUsImJBeJ2pErzuDsYsFad2LV93Yw8ZsArViy4o4F8DRAD5ZCMbxQCq0hBr73MQh3dYxPm8IMfFQOxT3dCbHgvgrQo23W2rEwZh4qR/Hu7oTooxfwHgHxLXwB5kQi1MF0aMWf4rUNk5joSogday3FwlrPiYpr7ZicgagArYFoICogoEBC605MV9IC39thEYoJln9/uAUwGEExEsOLrUhqDTHw3SEQPa6gWXJJLLXHRmuIFd/7gQiFXATUDD5VCsVVXfmcOO/uMTVQpFS6uhMZsAPf227mxKbf3Czez38DmMV7s3gvNTUuGKz1v7OaEjuvYiAqYKw1xOPr7bsTyz4A4tPM2b8TmY+TBZwixuvFsfhwXo7aQmw83hTcSQJdmrfIhcanX0eVI5H76y2dITqB704R0aqOQQTHThiv7gem8+TQFmJaVLXgPcvAc3kKXHQs84FSFD+cV19riGlxQS8G2HLW5S107niHayf6xzGmQld7iCqK7LSGgaiAsIFoICogoEDCdKKBqICAAgnTiQaiAgIKJEwnGogKCCiQMJ3YbRCjPlx21vJavgMeCIVF6U6DLr0YoGrBa/leu35OrB6cxB/tliS1UNV4oVBwfwHokpkETiL6N43hRLsJdYtrnO9jebOnNDHGSpHwZXzKQ/TdgyDaNpOEGTvLkXhXJqlOsUGftwsW3jrvifFhKRL3yXiUhvivXQ2M8RW/i6s3TGFKJrEOsY3pibxvQOm26L8vBp4vh0LqHag0xLT9heV+23yYBoO/XHkufmCxfdE6QGv28N2VWEeJ+x4R3TTbhXyO43hzeQKnZfxKQ2zMi77zDMh6oSUR8yQTDxGsk5wk2p6RQ5bVw0g2ArRn7voPc7KnHNVelAGYxmaCmJ5WF/juUSIalE2oazwzj5SieAsBLSeTtOM3E8RUuHFbk/v+fwFkCtDj+P6NYxhtB9rcmMwQ/5mE3arv7QX46bmHl2Uxs9xjmLlGoP0DkdhHQJw1fy6IM0nTQ4dssm9jy9qWMG4nYLD5QLas5pSP4/REtcZpTJ/ZnBysc/1zmUOEFvKjBKLyYrtM0EBU8IMZiAaiAgIKJEwnGogKCCiQMJ2oAOJffXmvf0eHPhYAAAAASUVORK5CYII='

const buttons = [{
  className: 'fubtn_one',
  icon: orderIcon
},
{
  className: 'fubtn_two',
  icon: cartIcon
},
{
  className: 'fubtn_three',
  icon: homeIcon
}
]
export default {
  components: { BookCardForShop, GoodsCart },
  data() {
    return {
      goodsList: [],
      buttons,
      isShowHome: true,
      isShowCart: false,
      isShowOrder: false
    }
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    onClick(e) {
      console.log('e', e.mp.detail)
      if (e.mp.detail.index === 2) {
        console.log('首页')
        this.isShowHome = true
        this.isShowCart = false
        this.isShowOrder = false
      }
      if (e.mp.detail.index === 1) {
        console.log('购物车')
        this.isShowHome = false
        this.isShowCart = true
        this.isShowOrder = false
      }
      if (e.mp.detail.index === 0) {
        console.log('订单')
        this.isShowHome = false
        this.isShowCart = false
        this.isShowOrder = true
      }
    },
    async getGoodsList() {
      const list = await Api.getRequest('/booklist')
      this.goodsList = list.data.list
    }
  },
  mounted() {
    this.getGoodsList()
  },

}
</script>
<style lang="less">
.goods-box {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
}
.fubtn_one {
  // background: #000 !important;
  // background-image: url("https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3426693439,1368089707&fm=173&app=49&f=JPEG?w=218&h=146&s=F922851855787E27354885C3030060B9") !important;
}
.wux-fab-button__icon {
  width: 60rpx !important;
  height: 60rpx !important;
}
.wux-fab-button--bottomRight {
  right: 5rpx !important;
  bottom: 100rpx !important;
}
.shop-wrap {
}
</style>
