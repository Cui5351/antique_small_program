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
		<view  v-for="(item,index) in moment" :key="index">
			<view class="person">
				<view class="avatar">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view>
					<view>{{item.name}}</view>
					<view>湖北</view>
				</view>
			</view>
			<view class="content">{{item.content}}</view>
			<view class="pic" v-if="item.src[0]!=null">
				<image :src="item" v-for="(item,index) in item.src" :key="index" mode=""></image>
			</view>
			<view class="other flex_j_a_r">
				<view class="flex_j_a_r">
					<uni-icons type="heart" size="25"></uni-icons>0
					<uni-icons type="star" size="25"></uni-icons>0
					<uni-icons type="chat" size="25"></uni-icons>0
					<uni-icons type="paperplane" size="25"></uni-icons>100
				</view>
				<view class="time">{{item.send_date}}</view>
			</view>
		</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  mounted() {
  	let that=this
	uni.request({
		url:uni.current_this.baseURL+':5001/get_community_moments',
		method:'GET',
		data:{
			skip:0
		},
		success(res) {
			console.log(res,'res');
			if(uni.current_this.check_res_state(res))
				return
				res.data.data.forEach(item=>{
					item.send_date=uni.current_this.dateformat(new Date(item.send_date))
				})
			that.moment.push(...res.data.data.reverse())
		}
	})
  },
  setup(){
	let moment=reactive([])
	let back=uni.current_this.back
    return{back,moment}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
