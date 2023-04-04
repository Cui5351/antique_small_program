<template>
	<view class="container">
		<view class="pics">
			<view class="back" @click="back">
				<uni-icons type="left" color="white"></uni-icons>
				返回
			</view>
			<swiper class="swiper" autoplay circular>
				<swiper-item>
					<view class="pic">
						<image src="../../../../static/background.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="pic">
						<image src="../../../../static/background.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="pic">
						<image src="../../../../static/background.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="info grows">
			<view class="description flex_c">
				<view class="title">{{data.name}}</view>
				<view v-for="(item,index) in data.description" :key="index">
					&emsp;&emsp;{{item}}
				</view>
			</view>
			<view class="suggest flex_c grows">
				<view class="flex_c_b">
					<view class="title_1">展览展品</view>
					<view>
						全部
						<uni-icons color='rgb(59,92,130)' type="right"></uni-icons>
					</view>
				</view>
				<view>
					<view class="museums_one flex_j_a_c" v-for="(item,index) in data.antique" :key="index">
						<view class="img">
							<image :src="item.src" mode=""></image>
						</view>
						<view class="">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="full flex_c grows">
				<view class="title_1">展览全景</view>
				<view class="full_ flex_j_a_r">
					<view class="cont"  @click="full_screen">
						<view class="full_btn">
							点击观看全景
						</view>
						<image class="max_image" :src="data.full_src" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="share grows">
			<view class="flex_j_a_c">
				<!-- <view>1</view> -->
				<button class="bt" plain>
					收藏
				</button>
			</view>
			<view class="flex_j_a_c">
				<!-- <view>1</view> -->
				<button open-type="share" class="bt" plain>
					分享
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {reactive} from 'vue'
	export default {
		onLoad(args) {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"]
			})
			let arg=JSON.parse(args.data)
			Object.keys(this.data).forEach(item=>{
				if(typeof item[item] == 'array'){
					this.data[item].push(...arg[item])
					return
				}
				this.data[item]=arg[item]
			})
		},
				onShareAppMessage(res) {
					if (res.from === 'button') {// 来自页面内分享按钮
							uni.showToast({
							icon:'none',
							title:'分享成功'
						})
					    }
				    return {
						imageUrl:this.data.full_src,
				        title: this.data.name, //分享的名称
				        path: `/pages/home/other_page/museum/museum?data=${JSON.stringify(this.data)}`,
						// desc:this.data.description[0].substring(0,15)+'...'
				        // mpId:'' //此处配置微信小程序的AppId
				    }
				},
				//分享到朋友圈
				onShareTimeline() {
				    return {
				        title: '博学苑',
				        type: 0,
				    }
				},
		setup() {
			let data=reactive({
				name:'',
				description:'',
				antique:[],
				full_src:''
			})
			function back(){
				uni.current_this.back()
			}
			function share(){
				uni.showShareMenu({
					title:data.name,
					path:'/pages/home/other_page/museum',
					success() {
						uni.showToast({
							icon:'none',
							title:'分享成功'
						})
					},fail() {
						uni.showToast({
							icon:'none',
							title:'您取消了分享'
						})
					}
				})
			}
			function full_screen(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
				})
			}
			return {
				data,back,full_screen
			}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
