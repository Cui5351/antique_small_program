<template>
	<view class="container" v-if="show_loading">
		<view class="vessel">
			<image src="https://www.mynameisczy.asia/image/antique/loading.gif"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show_loading:{
				default:false,
				type:Boolean
			}
		},
		setup() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	height:100%;
	width:100%;
	background-color: rgba(0,0,0,.1);
	position: fixed;
	z-index:999;
	display: flex;
	justify-content: center;
	align-items: center;
}
.vessel{
	// background-color: orangered;
	height:300px;
	position: absolute;
	// width:450px;
	width:100%;
	top:30%;
	display: flex;
	justify-content: center;
	align-items: center;
	&>image{
		// transform: scale(1.5);
		height:100%;
		width:100%;
	}
}
</style>
