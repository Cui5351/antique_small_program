<template>
	<div class="ai" :style="{transform: `translateX(${isShow ? '-130%' : '-50%'});`}" @click="toggleAi" @touchstart="startTouch" @touchmove="moveTouch">
		<image src="../../../static/ai.jpg" mode=""></image>
	</div>
</template>

<script>
export default {
	props:["keytext"],
	data(){
		return{
			isShow:false,
			timer:''
			}
	},
	methods:{
		toggleAi(){
			if(this.timer != '')
				clearTimeout(this.timer)
			setTimeout(() => {
				this.isShow = false
			},3000)
			if(this.isShow)
				uni.navigateTo({
					url:'/pages/AI/AI?keytext=' + this.$props.keytext
				})
			this.isShow = true
		},
		startTouch(event){
			// console.log(event,'start')
		},
		moveTouch(event){
			// console.log(event,'move');
		}
	}
}
</script>

<style lang="scss" scoped>
.ai{
	position: absolute;
	z-index: 999999;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	overflow: hidden;
	top:60%;
	transition: 0.2s ease;
	left: 100%;
	image{
		width: 100%;
		height: 100%;
	}
}
</style>