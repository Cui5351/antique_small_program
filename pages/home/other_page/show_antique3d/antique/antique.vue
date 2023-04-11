<template>
  <view class="container">
      <image class="background_antique" src="/static/show_antique_background.svg" mode=""></image>
	  <view class="head_two" style="background-color: rgba(0,0,0,0);">
		<uni-icons type="left" size="25" color="rgb(200,200,186)" @click="back"></uni-icons>
	  </view>
	  <view class="introduct flex_j_a_c grows">
		  <view class="pic flex_j_a_c">
			  <image :src="info.src" mode=""></image>
		  </view>
		  <view class="des">
			  <image class="background_antique" src="/static/show_antique_background2.svg"></image>
			  <view class="flex_j_a_c title">
					<view style="font-size:35px;margin-bottom:5px;">{{info.name}}</view>
					<view class="flex_j_a_r">
					  <uni-icons type="location"></uni-icons>{{info.born}}
					</view>
			  </view>
			  <view class="desc">
				  <view class="one_size">文物介绍</view>
				  <view class="text">
					&emsp;&emsp;{{info.description}}
					</view>
			  </view>
		  </view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
	onLoad(res) {
		let data=JSON.parse(res.data)
		Object.keys(this.info).forEach(item=>{
			this.info[item]=data[item]
		})
	},
  setup(){
	let back=uni.current_this.back
	let info=reactive({
		src:'',
		born:'',
		date:'',
		name:'',
		description:''
	})
    return{back,info}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
.container{
	color: rgb(200,200,186);
	position: absolute;
	z-index:99;
}
</style>
