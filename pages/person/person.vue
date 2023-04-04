<template>
	<view class="container flex_c">
		<view class="top_img">
			<image src="../../static/my_head.png"></image>
		</view>
		<view class="info flex_c">
			<view class="top">
				<view class="avatar">
					<image src="../../static/background.jpg"></image>
				</view>
				<view class="avatar_right">
					<view>
						<view class="count flex_c">
							<view>{{person_info.counts[0]}}</view>
							<view>作品</view>
						</view>
						<view class="count flex_c">
							<view>{{person_info.counts[1]}}</view>
							<view>粉丝</view>
						</view>
						<view class="count flex_c">
							<view>{{person_info.counts[2]}}</view>
							<view>关注</view>
						</view>
					</view>
				</view>
			</view>
			<view class="person_info flex_c">
					<view class="name">{{person_info.name}}</view>
					<view class="id">ID:{{person_info.id}}</view>
					<view class="introduce">{{person_info.introduction}}</view>
			</view>
			<view class="other">
				<view >
					<view class="store">
							<view class="pic">
								<image src="" mode=""></image>
							</view>
						<view class="store_info">
							<view >
								集市
							</view>
							<view class="store_">
								非遗文创触手可得
							</view>
						</view>
					</view>
					<view class="bills">
						<view class="pic">
							<image src="" mode=""></image>
						</view>
						<view class="store_info">
							<view>
								订单
							</view>
							<view class="store_">
								查看全部订单
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="works flex_c">
			<view class="title">
				<view class="t1">
					<view @click="toggle(true)" class="ti">作品</view>
					<view @click="toggle(false)" class="ti">收藏</view>
				</view>
				<view class="t2">
					<view class="line" :style="{left:person_info.toggle?'0%':'50%'}"></view>
				</view>
			</view>
			<view class="two" v-if="!person_info.toggle" >
				<view>博物馆</view>
				<view>商品</view>
				<view>文物</view>
				<view>工作室</view>
			</view>
			<view class="work" >
				<view v-for="(item,index) in person_info.works" :key="index" v-show="person_info.toggle">
					<image :src="'https://www.mynameisczy.asia/image/antique/'+item+'.jpg'" mode="aspectFill"></image>
				</view>
					<view v-for="(item,index) in person_info.works2" :key="index" v-show="!person_info.toggle">
						<image :src="'https://www.mynameisczy.asia/image/antique/'+item+'.jpg'" mode="aspectFill"></image>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {reactive} from 'vue'
	export default {
		setup() {
			let person_info=reactive({
				name:'李四',
				id:'123321',
				introduction:'小四的简介',
				counts:[5,6,7],
				toggle:true,
				works:['one','two','three','four','five','six','seven','eight','nine','ten'],
				works2:['six','seven','eight','nine','ten']
			})
			function toggle(bool){
				person_info.toggle=bool
			}
			return {person_info,toggle}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
