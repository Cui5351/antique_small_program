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
			this.createSelectorQuery()
							.select('#lottie_demo')
							.node(res => {
								const canvas = res.node;
								const context = canvas.getContext('2d');
								canvas.width = 300;
								canvas.height = 300;
								lottie.setup(canvas);
								let ani = lottie.loadAnimation({
									loop: true,
									autoplay: true,
									animationData: require("../../../static/loading.js"),
									rendererSettings: {
										context
									}
								});
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