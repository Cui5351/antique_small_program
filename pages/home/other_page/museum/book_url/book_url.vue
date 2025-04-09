<template>
  <view class="container">
      <web-view :src="src"></web-view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res) {
		this.src = res.src
  },
  setup(){
	const src = ref('')
    return{src}
  }
}
</script>

<style scoped lang=''>

</style>
