<template>
  <view class="container">
	  <view class="head_two" @click="back">
	  	<uni-icons type="left"></uni-icons>
	  		视频上传
	  </view>
	  <view class="flex_j_a_c" style="justify-content: flex-start;">
		  <view class="upload_btn flex_j_a_c">
				<view class="upload flex_j_a_c" @click="uploadMask">
						新建作品集
				</view>
			</view>
			<view class="head_tit flex_j_a_r">作品集</view>
		  <view class="lists">
				<view class="flex_j_a_r grows work" v-for="(item,index) in works" :key="index">
					<view class="avatar">
						<image :src="item.mask" mode=""></image>
					</view>
					<view class="flex_j_a_c">{{item.title}}</view>
				</view>
		  </view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res) {
		uni.current_this_publish_video=this	
		this.works.push(...JSON.parse(res.works))
	},
  setup(){
	let works=reactive([])
	let back=uni.current_this.back
	let publish_work=reactive({
		title:'',
		mask_url:''
	})
	// upload mask
	function uploadMask(){
		uni.navigateTo({
			url:'/pages/person/other_page/avatar_edit/choose'
		})
	}
	function uploadVideo(){
		uni.chooseVideo({
			extension:'mp4',
			success(res){
				let {tempFilePath}=res
				uni.openVideoEditor({
					filePath:tempFilePath,
					minDuration:10,
					maxDuration:180,
					success(res2){
						let {tempFilePath}=res2
						uni.uploadFile({
							url:'https://www.mynameisczy.asia:5001/upload_material',
							filePath:tempFilePath,
							name:'files',
							formData:{openid:uni.current_this.store.state.user_info.openid},
							success(res){
								console.log(res);
							}
						})
					}
				})
			}
		})
	}
    return{back,uploadVideo,uploadMask,publish_work,works}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss'
</style>
