<template>
		<loading :show_loading="show_loading"></loading>
	<view class="container font_color">
		<AICover keytext="home"></AICover>
		<swiper class="swiper" indicator-color='gray' indicator-active-color='#ffffff' circular autoplay interval='2500' :indicator-dots="true">
			<swiper-item v-for="(item,index) in head_img" :key="index">
				<view class="swiper_item">
					<image :src="item"></image>
				</view>
			</swiper-item>
		</swiper>
		<scroll-view class="other background" scroll-y="true" scroll-with-animation="true" @scrolltolower="lower">
			<view class="box">			
			<view class="museums flex_c">
				<view class="museum_title">
					<view>博物馆展览</view>
					<view @click="more('all')">全部<uni-icons color="rgb(95,78,86)" type="right"></uni-icons>
					</view>
				</view>
				<swiper class="museums_" circular previous-margin="40rpx" next-margin="40rpx">
					<swiper-item @click="museum(item.id)" class="museums_one flex_j_a_c" v-for="(item,index) in museums" :key="index">
						<view class="img">
							<image :src="item.avatar" mode=""></image>
						</view>
						<view class="">
							{{item.name}}
						</view>
					</swiper-item>
				</swiper>
		<!-- 		<view class="museums_">
					<view @click="museum(item.id)" class="museums_one flex_j_a_c" v-for="(item,index) in museums" :key="index">
						<view class="img">
							<image :src="item.avatar" mode=""></image>
						</view>
						<view class="">
							{{item.name}}
						</view>
					</view>
				</view> -->
			</view>
<!-- 			<view class="storys flex_c">
				<view class="story_title">
					<view>非遗故事</view>
					<view @click="more('more_category')">更多分类<uni-icons color="rgb(59,92,130)" type="right"></uni-icons>
					</view>
				</view>
				<view class="story_books">
					<view class="story_book" @click="story(item)" v-for="(item,index) in [1,2,3]" :key="index">
						<image :src="base_url+'/image/antique/story'+item+'.jpg'" mode=""></image>
					</view>
				</view>
			</view> -->
			<view class="works">
				<view class="story_title">
					<view>推荐视频</view>
					<view @click="search_page">更多视频<uni-icons color="rgb(95,78,86)" type="right"></uni-icons>
					</view>
				</view>
				<view class="work">
					<!-- <view class="w" v-for="(item,index) in video" @click="inter(item)">	
						<view class="mask">
							<image :src="item.mask" mode="aspectFill"></image>
						</view>
						<view class="tit">
							<view class="avatar">
								<image :src="item.avatar"></image>
							</view>
							<view>
								{{item.name}}
							</view>
						</view>
					</view> -->
					<view class="w" v-for="(item,index) in video" @click="inter(item)">
						<view class="mask">
							<image :src="item.mask" mode="widthFix"></image>
						</view>
						<view class="tit">
							<view class="avatar">
								<image :src="item.avatar"></image>
							</view>
							<view>
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		<view class="bottom">已经滑到底了</view>
		</view>
		</scroll-view>
		<!-- <button @click="loading" type="primary">加载动画</button> -->
	</view>
</template>

<script>
	import request from '@/request/request.js'
	import {ref,reactive} from 'vue'
	import loading from '@/pages/loading/loading.vue'
	export default {
				onShareAppMessage() {
				    return {
				        title: '博学苑', //分享的名称
				        path: '/pages/home/home',
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
		components:{
			loading
		},
		onTabItemTap() {
			// 重置
			this.reqs.skip = 0
			this.video.splice(0,this.video.length)
			this.lower()
		},
		mounted() {
			uni.current_this.inter=this.inter;
			this.lower()
		},
		setup(){
			let other=reactive([{
				name:"地图导览",
				pic:'/static/map.svg'
			},{
				name:"文物库",
				pic:'/static/storehouse.svg'
			},{
				name:"焦点新闻",
				pic:'/static/news.svg'
			},{
				name:"线下体验馆",
				pic:'/static/feelhouse.svg'
			}])
			let show_loading=ref(false)
			let reqs=reactive({state:false,skip:0})
			let base_url=ref(uni.current_this.baseURL)
			function loading(){
				show_loading.value=true
				setTimeout(()=>{
					show_loading.value=false
					uni.showToast({
						icon:'none',
						title:'该博物馆尚未开放'
					})
				},1000*Math.random()*10)
			}
			function toggle_other(item){
				if(item.name=='文物库'){
					uni.navigateTo({
						url:'/pages/home/other_page/antique_repository/antique_repository'
					})
				return
				}
				uni.showToast({
					icon:'none',
					title:item.name+'暂未开放'
				})
			}
			function more(name){
				if(name=='all'){
					uni.navigateTo({
						url:'/pages/home/other_page/all_museum/all_museum'
					})
					return
				}
			}
			const museums = reactive([])
			const loadMuseums = () => {
						  uni.showLoading({
						  	title:'加载中'
						  })
				request.get("/Antique/GetAntiqueRandom").then(res => {
					console.log(res,'res');
					museums.splice(0,museums.length,...res)
				}).catch(err => {
					console.log(err,'err');
				}).finally(() => {
			  uni.hideLoading()
		  })
			}
			loadMuseums()
			function museum(id){
				uni.navigateTo({
					url:`./other_page/museum/museum?id=${id}`
				})
				
			}
			function story(name){
				uni.showToast({
					icon:'none',
					title:'非遗故事'+name+'暂时未开放'
				})
			}
						function inter(item){
							uni.request({
								url:uni.current_this.baseURL+':5001/get_video',
								method:"POST",
								data:{
									uuid:item.uuid
								},
								success(res) {
									if(uni.current_this.check_res_state(res)){
										return
									}
									console.log(res,'inter');
									if(!res.data.data.arr.length){
										uni.showToast({
											title:'该作品集为空',
											icon:'none'
										})
										return
									}
									uni.navigateTo({
										url:`/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data.arr)}&title=${res.data.data.arr[0].title}&avatar=${res.data.data.avatar}&name=${res.data.data.name}&openid=${res.data.data.openid}`
									})
								}
							})
						}
			let video=reactive([])
			let head_img=reactive(['https://www.mengzhiyuan.email/image/antique/home_top/title1.jpg',
			'https://www.mengzhiyuan.email/image/antique/home_top/title2.jpg',
			'https://www.mengzhiyuan.email/image/antique/home_top/title3.jpg'])
			function lower(e){
				if(reqs.state)
					return
				reqs.state=true
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				uni.request({
					url:uni.current_this.baseURL+':5001/get_hottest_video',
					method:"GET",
					data:{
						skip:reqs.skip
					},
					success(res) {
						if(uni.current_this.check_res_state(res)){
							return
						}
						if(res.data.data.length<=0){
							uni.showToast({
								title:'已经滑到底了'
							})
							return
						}
						video.push(...res.data.data) 
						reqs.skip+=res.data.data.length
					},complete() {
						setTimeout(()=>{
							// 首页视频最多20
							if(video.push.length>=20)
								return
							reqs.state=false
						},1000)
						uni.hideLoading()
					}
				})
			}
			function search_page(){
				uni.navigateTo({
					url:'/pages/workroom/other_page/search_video/search_video'
				})
			}
			const toggleAi = () => {
				uni.navigateTo({
					url:'/pages/AI/AI'
				})
			}
			return{head_img,search_page,reqs,loading,inter,video,story,more,museum,museums,show_loading,base_url,other,toggle_other,lower,toggleAi}
		}
	}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '/uni.scss';
</style>
