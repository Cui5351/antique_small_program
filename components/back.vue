<template>
	  <view class="head_two font_color" @click="back">
	  	<uni-icons type="left" size="23"></uni-icons>
	  		{{name}}
	  </view>
</template>

<script>
import {ref} from 'vue'
	export default {
		name:"back",
		props:['name'],
		setup(props) {
			let back=uni.current_this.back
			let name=ref(props.name)
			return {back,name}
		}
	}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
</style>