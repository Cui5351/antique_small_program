<template>
  <view class="container">
	  <view class="head_two" @click="back">
	  	<uni-icons type="left"></uni-icons>非遗集市
	  </view>
	<view class="store_info">
		<view class="store_name">
			<view></view>
			小七的店</view>
		<view class="picture">
			<swiper class="swi" circular indicator-dots indicator-active-color="white">
				<swiper-item v-for="(item,index) in [1,2,3]" :key="index">
					<view class="pic">
						<image src="https://www.mynameisczy.asia/image/antique/fan.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="description flex_j_a_r">
			<view class="des flex_j_a_c">
				<view class="money">￥777</view>
				<view>
					山城记忆夏布团扇 非遗夏布+竹 手绘 每
					件独品
				</view>
			</view>
			<view class="share flex_j_a_c">
				<uni-icons type="redo" size="20"></uni-icons>
				分享
			</view>
		</view>
		<view class="rank flex_j_a_r">
			<view class="tit">排行榜</view>
			<view class="flex_j_a_r">店铺商品热榜第
				<view style="color:#6E79E2">
					7
				</view>
			名</view>
		</view>
		<view class="transport flex_j_a_r">
			<view class="flex_j_a_r">运费
			<view class="money">￥7.00</view>
			</view>
			<view>已售17|剩余17</view>
		</view>
		<view class="bought_person_count">bought_person_count</view>
		<view class="comment">comment</view>
		<view class="store_other">store_other</view>
		
	</view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onload(res){
	console.log(res,'res');  
  },
  setup(){
	let info=reactive({
		pic:''
	})
	let back=uni.current_this.back
    return{back,info}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
