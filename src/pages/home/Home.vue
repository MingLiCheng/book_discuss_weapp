<template>
  <h1>这是首页</h1>
</template>
<script>
import config from '../../config.js'
import * as Api  from '../../utils/request.js'
export default {
  created() {
    Api.getRequest('/test').then(res => {
      console.log('res', res)
    })
  },
}
</script>
<style>
</style>
