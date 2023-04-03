<template>
	<view class="container" v-if="show_loading">
		<view class="vessel">
			<image src="../../static/loading/loading2.gif"></image>
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
	height:150px;
	width:250px;
	&>image{
		height:100%;
		width:100%;
	}
}
</style>
