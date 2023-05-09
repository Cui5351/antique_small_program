<template>
	<view class="contain">
		<canvas id='lottie_demo'  type="2d" style="display: inline-block; width: 300px; height: 300px;"></canvas>
	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	export default {
		name:"loading",
		mounted() {
			console.log(this,'lottie');
			this.createSelectorQuery()
							.select('#lottie_demo')
							.node(res => {
								console.log(res,'canvas'); // 节点对应的 Canvas 实例。
								// const canvas = res.node;
								// const context = canvas.getContext('2d');
								// canvas.width = 300;
								// canvas.height = 300;
								// lottie.setup(canvas);
								// ani = lottie.loadAnimation({
								// 	loop: true,
								// 	autoplay: true,
								// 	animationData: require('../static/loading.json'),
								// 	rendererSettings: {
								// 		context
								// 	}
								// });
								// this.inited = true;
							})
							.exec();
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
@import '/uni.scss';
.contain{
	position: absolute;	
	@include height(300px);
	@include width(300px);
	left: 50%;
	top:50%;
	transform: translate(-50%,-50%);
	background-color: red;
}
</style>