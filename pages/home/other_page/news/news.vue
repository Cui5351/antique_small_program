<template>
  <view class="containe">
      <view class="head">
      	<view class="pic">
			<view class="head_two font_color" @click="back" style="position: absolute;background-color:rgba(0,0,0,0);font-weight: bold;">
				<uni-icons type="left" size="23"></uni-icons>
				返回
			</view>
			<image src="/static/community_hot_search.svg" mode=""></image>
		</view>
      	<view class="tit">
			热搜卫星,搜寻你期待的热点
		</view>
      </view>
	  <view class="hot">
		  <view v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙','和我们一起畅游非遗吧']" :key="index" class="font_color">{{index+1}}.{{item}}<view>热</view>
		  </view>
	  </view>
	  <view class="passage">
		<view  v-for="(item,index) in [1,2,3,4,5,6]" :key="index">
			<view class="person">
				<view class="avatar">
					<image src="../../../../static/icons/antique.png" mode=""></image>
				</view>
				<view>
					<view>张大师</view>
					<view>湖北</view>
				</view>
			</view>
			<view class="content">好喜欢这把琴</view>
			<view class="pic">
				<image src="/static/feelhouse.svg" v-for="(item,index) in item" :key="index" mode=""></image>
			</view>
			<view class="other flex_j_a_r">
				<view class="flex_j_a_r">
					<uni-icons type="heart" size="25"></uni-icons>12
					<uni-icons type="star" size="25"></uni-icons>12
					<uni-icons type="chat" size="25"></uni-icons>99
					<uni-icons type="paperplane" size="25"></uni-icons>100
				</view>
				<view class="time">2023-5-9:17:06</view>
			</view>
		</view>
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
	@import "/uni.scss";
	@import "./index.scss";
</style>
