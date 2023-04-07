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
			<view class="description flex_c" :style="{minHeight:data_height.height}">
				<view class="title">
					<uni-icons type="location" size="30" color="rgb(59,92,130)"></uni-icons>
					{{data.name}}
				</view>
				<view class="data" ref="data" :style="{overflow:data_height.state?'auto':'hidden'}">
					<view v-for="(item,index) in data.description" :key="index">
						&emsp;&emsp;{{item}}
					</view>
				</view>
				<view class="flex_j_a_r show_all" @click="show_all">
					{{data_height.state?'隐藏':'展开'}}<uni-icons type="bottom" size="20" color="rgb(59,92,130)"></uni-icons>
				</view>
			</view>
			<view class="suggest flex_c grows">
				<view class="flex_c_b">
					<view class="title_1">展览展品</view>
					<view @click="all_antique">
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
				<button class="bt" plain @click="subscribe">
					预约门票
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
	import {reactive,ref} from 'vue'
	export default {
		mounted() {
			let query=uni.createSelectorQuery();
			let doms=query.select('.data')
			uni.current_this1=this
			doms.boundingClientRect(function(res){
				// uni.current_this1.data_height.height=res.height+100+'px'
				uni.current_this1.data_height.height=150+'px'
				uni.current_this1.data_height.min=150+'px'
				uni.current_this1.data_height.max=res.height+100+'px'
			}).exec(function(){
				//上述布局位置信息获取成功后执行的回调函数
			})
		},
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
			function all_antique(){
				uni.navigateTo({
					url:'/pages/home/other_page/all_anitique/all_anitique'
				})
			}
			function show_all(){
				data_height.state=!data_height.state
				// 40+
				if(data_height.state){
					data_height.height=data_height.max
				}else
					data_height.height=data_height.min
			}
			let data_height=reactive({
				height:'50%',
				min:'50%',
				max:'50%',
				state:false
			})
			function subscribe(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
				})
			}
			return {
				subscribe,data_height,data,back,full_screen,all_antique,show_all
			}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
