<template>
	<view class="container background">
		<view class="workroom page">
			<view class="tit" style="display: flex;align-items: flex-end;">3D工作室</view>
			<view>
				<swiper style="height:100%;" class="pic flex_j_a_c" previous-margin="50px" next-margin='50px' :indicator-dots="true" circular>
					<swiper-item v-for='(item,index) in [1,2,3]' :key="index">
						<view class="pict" @click="toggle('3d工作室')">
							<image src="/static/workroom.png" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="teach_video page">
			<view class="tit grows">
				<view>教学视频</view>
				<view class="getall" style="font-size:17px;">
					全部
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="flex_j_a_c pic grows">
				<view class="videos">
					<view v-for="(item,index) in [0,1,2,3]" :key="index">
						<video enable-danmu danmu-btn :danmu-list='danmulist' :poster="'https://www.mynameisczy.asia/antique/videos/source'+item+'.jpg'" enable-play-gesture='true' :src="'https://www.mynameisczy.asia/antique/videos/source'+item+'.mp4'" ></video>
					</view>
				</view>
			</view>
		</view>
		<view class="community page">
			<view class="tit">社区</view>
			<view class="pic flex_c grows" @click="toggle('community')">
				<view class="title">
					社区热搜
				</view>
				<view class="content grows">
					<view class="flex_j_a_c grows">
						<view class="flex_j_a_r grows" v-for="(item,index) in [1,2,3,4,5,6]">
							<view class="news">{{item}},contentcontentcontentcontentcontentcontent</view>
							<view class="hot flex_j_a_c">热</view>
						</view>
					</view>
					<view class="right flex_j_a_c grows">
						<view class="flex_j_a_r grows" v-for="(item,index) in [1,2,3,4,5]">
							<view class="news">{{item}},contentcontentcontentcontentcontentcontent</view>
							<view class="hot flex_j_a_c">热</view>
						</view>
						<view class="flex_j_a_r grows" style="justify-content: flex-start">
							更多热搜
						<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ref,reactive} from 'vue'
	export default {
		setup() {	
			function toggle(title){
				uni.showToast({
					title:title+'暂未开放',
					icon:'none'
				})
			}
			let base_url=ref(uni.current_this.baseURL)
			let danmulist=reactive([{
                    text: '太好看了',
                    color: '#ff0000',
                    time: 1
                },{
                    text: '下次多发一点',
                    color: '#ff0000',
                    time: 2
                },{
                    text: '快点更新',
                    color: '#ff0000',
                    time: 1
                },{
                    text: '博主大大真帅',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '简无与伦比',
                    color: '#ff00ff',
                    time: 3
                },{
                    text: '博主大大真帅',
                    color: '#ff0000',
                    time: 4
                },{
                    text: '博主大大真帅',
                    color: '#ff0000',
                    time: 7
                }])
			return {toggle,base_url,danmulist}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/uni.scss';
	@import './index.scss';
	.container {
		overflow: auto;
		box-sizing: border-box;
		padding: 20px 0;
		&>view{
			padding: 10px 20px;
			box-sizing: border-box;
		}
	}
</style>
