<template>
  <view class="container">
      <view class="head_two">
		  <view @click="back">
			<uni-icons type="left"></uni-icons>
			展览展品
		  </view>
	  </view>
	  <view class="info">
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  	<view class=""></view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  setup(){
	let back=uni.current_this.back
    return{back}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
