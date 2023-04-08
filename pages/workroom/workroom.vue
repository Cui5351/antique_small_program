<template>
	<view class="container background">
		<view class="workroom page">
			<view class="tit">3D工作室</view>
			<view class="pic flex_j_a_c" @click="toggle('workroom')">
				<view>
					<image :src="base_url+'/image/antique/workroom.jpg'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="community page">
			<view class="tit">非遗社区</view>
			<view class="pic" @click="toggle('community')">
				<view>
					<image :src="base_url+'/image/antique/community.jpg'"  mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ref} from 'vue'
	export default {
		setup() {	
			function toggle(title){
				uni.showToast({
					title:title+'暂未开放',
					icon:'none'
				})
			}
			let base_url=ref(uni.current_this.baseURL)
			return {toggle,base_url}
		}
	}
</script>

<style lang="scss" scoped>
	@import '/uni.scss';
	@import './index.scss';
	.container {
		overflow: auto;
		box-sizing: border-box;
		padding: 10px 0;
		&>view{
			padding: 10px 20px;
			box-sizing: border-box;
		}
	}
</style>
