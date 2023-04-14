<template>
	<view class="container">
		<view class="head_two" >
			<view class=".flex_j_a_r" @click="back">
				<uni-icons type="left"></uni-icons>
				返回
			</view>
		</view>
		<view class="">
			<qf-image-cropper :width="500" :height="500" :radius="30" areaScale='0.8' maxScale='1.5' @crop="handleCrop" ></qf-image-cropper>
		</view>
	</view>
</template>

<script>
import {reactive} from 'vue'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'
	export default {
		components:{
			QfImageCropper
		},
		setup() {
			function choosePortrait(e){
							uni.showLoading({
								title:'修改中'
							})
							let image_path=e.tempFilePath
							let url='https://www.mynameisczy.asia:5001/upload_avatar'
							uni.uploadFile({
								url:url,
								filePath:image_path,
								name:'avatar',
								formData:{
									openid:uni.current_this.store.state.user_info.openid
								},
								success(e) {
									// 返回
									uni.navigateBack()
									uni.hideLoading()
									let data=JSON.parse(e.data)
									if(data.error){
										uni.showToast({
											icon:'error',
											title:'修改失败'
										})
										return
									}
									uni.current_this.store.state.user_info.avatar=data.value
										uni.showToast({
											icon:'success',
											title:'修改成功'
										})									
								},fail(e) {
									uni.hideLoading()
								}
							})
			}
			let back=uni.current_this.back
			return{choosePortrait,back}
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
