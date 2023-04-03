<template>
		<loading :show_loading="show_loading"></loading>
	<view class="container">
		<swiper class="swiper" indicator-color='gray' indicator-active-color='#ffffff' circular autoplay interval='2500' :indicator-dots="true">
			<swiper-item>
				<view class="swiper_item">
					<image :src="base_url+'/image/antique/home_swiper1.jpg'"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper_item">
					<image :src="base_url+'/image/antique/home_swiper1.jpg'"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper_item">
					<image :src="base_url+'/image/antique/home_swiper1.jpg'"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="other">
			<view class="funs">
				<view class=".flex_j_a_c" @click="toggle_other(item)" v-for="(item,inex) in other" :key="index">
					<view class="icon">
						<image :src="item.pic" mode=""></image>
					</view>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="museums flex_c">
				<view class="museum_title">
					<view>博物馆展览</view>
					<view @click="more('all')">全部<uni-icons color="rgb(59,92,130)" type="right"></uni-icons>
					</view>
				</view>
				<view class="museums_">
					<view @click="museum(item)" class="museums_one flex_j_a_c" v-for='(item,index) in [1,2]' :key="index">
						<view class="img">
							<image :src="base_url+'/image/antique/museum'+item+'.jpg'" mode=""></image>
						</view>
						<view class="">
							荆州博物馆
						</view>
					</view>
				</view>
			</view>
			<view class="storys flex_c">
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
			</view>
		</view>
		<!-- <button @click="loading" type="primary">加载动画</button> -->
	</view>
</template>

<script>
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
		setup(){
			let other=reactive([{
				name:"地图导览",
				pic:'../../static/my_head.png'
			},{
				name:"文物库",
				pic:'../../static/my_head.png'
			},{
				name:"焦点新闻",
				pic:'../../static/my_head.png'
			},{
				name:"线下体验馆",
				pic:'../../static/my_head.png'
			}])
			let show_loading=ref(false)
			let base_url=ref(uni.current_this.baseURL)
			function loading(){
				show_loading.value=true
				setTimeout(()=>{
					show_loading.value=false
				},1000*Math.random()*10)
			}
			function toggle_other(item){
				console.log(item,'item');
				uni.showToast({
					icon:'none',
					title:item.name+'暂未开放'
				})
			}
			function more(name){
				uni.showToast({
					icon:'none',
					title:name+'暂时未开放'
				})
			}
			function museum(name){
				uni.showToast({
					icon:'none',
					title:'暂时未开放'
				})
			}
			function story(name){
				uni.showToast({
					icon:'none',
					title:'非遗故事'+name+'暂时未开放'
				})
			}
			return{loading,story,more,museum,show_loading,base_url,other,toggle_other}
		}
	}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '@/uni.scss';
</style>
