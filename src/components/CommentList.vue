<template>
  <section class="comment-list-wrap">
    <CommentCard></CommentCard>
    <button @click="testForLoc($event)">获取地理位置的测试</button>
    <button>获取测试</button>
  </section>
</template>

<script>
import CommentCard from "./comment/CommentCard.vue";
export default {
  components: { CommentCard },
  data() {
    return {
      location:''
    }
  },
  methods: {
    testForLoc(e) {
      // Qelgt6dq77qc16qz9Szx8qcr5S5KkKPS
      // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
      const baidumapToken = 'Qelgt6dq77qc16qz9Szx8qcr5S5KkKPS'
      let url = ""
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          console.log('res', res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          console.log('位置纬度', latitude, '位置经度', longitude)
          wx.request({
            url: 'http://api.map.baidu.com/geocoder/v2/',
            data: {
              ak: baidumapToken,
              location: `${res.latitude},${res.longitude}`,
              output: 'json'
            },
            success: res => {
              console.log('res baidumap', res)
              if (res.data.status === 0) {
                this.location = res.data.result.addressComponent.city
              } else {
                this.location = '未知地点'
              }
              console.log('当前城市', this.location)
            }
          })
        }
      })
    }
  },

}
</script>

<style lang="less" scoped>
.comment-list-wrap {
  width: 100%;
}
</style>
