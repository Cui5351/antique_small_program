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
				<view class="getall" style="font-size:17px;" @click="no_develop('查看全部')">
					全部
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="flex_j_a_c pic grows">
				<view class="videos">
					<view  style="position: relative;" v-for="(item,index) in video" :key="index" @click="inter(item)">
						<image :src="item.mask"></image>
						<image style="background-color: rgba(0,0,0,0);;position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="../../play.svg"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="community page">
			<view class="tit">社区</view>
			<view class="pic flex_c grows">
				<view class="title">
					社区热搜
				</view>
				<view class="content grows">
					<view class="flex_j_a_c grows">
						<view class="flex_j_a_r grows"  @click="no_develop('非遗社区')" v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙']">
							<view class="news flex_j_a_c">{{index+1}},{{item}}</view>
							<view class="hot flex_j_a_c">热</view>
						</view>
					</view>
					<view class="right flex_j_a_c grows">
						<view class="flex_j_a_r grows"  @click="no_develop('非遗社区')" v-for="(item,index) in ['和我们一起畅游非遗吧']">
							<view class="news flex_j_a_c">{{index+6}},{{item}}</view>
							<view class="hot flex_j_a_c">热</view>
						</view>
						<view class="flex_j_a_r grows" style="justify-content: flex-start"  @click="no_develop('更多')" >
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
			uni.request({
				url:uni.current_this.baseURL+':5001/get_hottest_video',
				method:"GET",
				success(res) {
					if(uni.current_this.check_res_state(res)){
						return
					}
					video.push(...res.data.data)
				}
			})
			function toggle(title){
				uni.showToast({
					title:title+'暂未开放',
					icon:'none'
				})
			}
			let base_url=ref(uni.current_this.baseURL)
			let video=reactive([])
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
			function inter(item){
				console.log(item,'item');
				
				uni.request({
					url:uni.current_this.baseURL+':5001/get_video',
					method:"POST",
					data:{
						title:item.title,
						openid:item.openid
					},
					success(res) {
						if(uni.current_this.check_res_state(res)){
							return
						}
						uni.navigateTo({
							url:`/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data)}`
						})
					}
				})
			}
			let no_develop=uni.current_this.no_develop
			return {toggle,base_url,danmulist,video,inter,no_develop}
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
