<template>
	<view class="container">
		<loading :show_loading="show_loading"></loading>
		<!-- <image src="../../static/logo.png" id='container' mode=""></image> -->
		<div id='container2'></div>
	</view>
</template>

<script>
	import loading from '@/pages/loading/loading.vue'
	import {ref} from 'vue'
	import animate from '@/static/animate.json'
	import lottie from 'lottie-web'
	export default {
		components:{
			loading
		},
		mounted(){
			lottie.loadAnimation({
			  container: document.getElementById('container2'), // the dom element that will contain the animation
			  renderer: 'svg',
			  loop: true,
			  autoplay: true,
			  animationData:animate  // the path to the animation json
			});
		},
		setup() {
			let show_loading=ref(false)
			// setInterval(()=>{
				// show_loading.value=!show_loading.value
			// },5000)
			return {show_loading}
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	.container2{
		height:200px;
		width:200px;
	}
</style>
