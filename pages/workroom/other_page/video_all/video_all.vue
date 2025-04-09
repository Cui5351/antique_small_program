<template>
  <view class="container">
	  <scroll-view class="video_set" scroll-y>
	  <view class="noContent" v-if="!video.length">暂无内容</view>
      <view class="item" v-for="(item,index) in video" :key="index" v-else @click="togglePage(index)" :style="{background:current == index ? 'rgba(0,0,0,0.05)':''}">
      			  <view class="mask">
      				  <view class="duration">{{item.duration}}</view>
      				  <image :src="item.mask" mode="aspectFill"></image>
					  <image v-if="current == index" style="background-color: rgba(0,0,0,0);position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="/static/Suspend.svg"></image>
					  <image v-else style="background-color: rgba(0,0,0,0);position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="/static/Play.svg"></image>
      			  </view>
      			  <view class="right_menu">
      				  <view class="video_tit">{{item.title.length>=10?(item.title.substring(0,9)+'...'):item.title}}</view>
      				  <view>
      					<view class="video_tit_small">
      						<view>
								{{item.name}}
      						</view>
      					</view>
      					<!-- <view class="user_name">up:{{item.user_name}}</view> -->
      					<view class="user_name">{{item.publish_date}}</view>
      					
      				  </view>
      			  </view>
      </view>
      </scroll-view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res) {
  	console.log(res,'res');
	this.channel = this.getOpenerEventChannel()
	this.video.push(...(JSON.parse(res.video)))
	this.current = res.current
  },
  data(){
  	return {
		channel:null,
  		video:[],
		current:'0'
  	}
  },
  methods:{
  	togglePage(index){
		if(index == this.current)
			return
		this.channel.emit('togglePage',index)
		uni.navigateBack()
  	}
  }
}
</script>

<style scoped lang='scss'>
.video_set{
	padding:0 15px;
	box-sizing: border-box;
	height:100vh;
	.noContent{
		margin-top:100px;
		text-align: center;
	}
	.item{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		height:110px;
		width:100%;
		display: flex;
		align-items: center;
		.mask{
			height:90px;
			width:150px;
			margin-right:10px;
			position: relative;
			.duration{
				top:100%;
				left:100%;
				transform: translate(-100%,-100%);
				background-color: rgba(0,0,0,.3);
				padding:1px 3px;
				border-radius: 5px;
				color: white;
				// color: rgba(0,0,0,.5);
				position:absolute;
			}
			image{
				border-radius: 5px;
				height:100%;
				width:100%;
			}
		}
		.right_menu{
			color: gray;
			width:55%;
			height:90px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.video_tit{
				display: block;
				font-size:20px;
				color: black;
				height:40px;
			}
			.video_tit_small{
					.high{
						color: red;
					}
			}
		}
	}
}
</style>
