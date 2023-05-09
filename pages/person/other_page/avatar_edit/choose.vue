<template>
	<view class="container">
		<view class="head_two" >
			<view class=".flex_j_a_r" @click="back">
				<uni-icons type="left"></uni-icons>
				返回
			</view>
		</view>
		<view class="">
			<qf-image-cropper :width="base.width" :height="base.height" areaScale='0.8' maxScale='1.5' @crop="handleCrop" ></qf-image-cropper>
		</view>
	</view>
</template>

<script>
import {reactive,ref} from 'vue'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'
	export default {
		components:{
			QfImageCropper
		},
		onLoad(res) {
			this.url=res.url
			this.base.height=res.height
			this.base.width=res.width
			this.base.name=res.name
			this.base.property=res.property
		},
		setup() {
			let url=ref('');
			let base=reactive({
				width:0,
				height:0,
				property:'',
				name:''
			})
			function choosePortrait(e){
				uni.showLoading({
					title:'修改中'
				})
				uni.current_this_publish_video.publish_work.mask_url=e.tempFilePath
				back()
			}
			let back=uni.current_this.back
			return{choosePortrait,back,url,base}
		},
		methods: {
			handleCrop(e) {
				// 保存到相册
				this.choosePortrait(e)
			}
		}
	}
</script>

<style scoped lang="scss">
@import '/uni.scss';
.head_two{
	background-color: white;
	position: relative;
	z-index: 1000;
}
</style>
