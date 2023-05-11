<template>
	<back name='新建作品集'></back>
  <view class="containe">
      <view class="title">
      	<input v-model="info.title" type="text" maxlength="15" placeholder="新建作品集">
      </view>
	  <view class="description">
	  	<textarea v-model="info.description" name="" id="" cols="30" placeholder="作品集简介......" rows="7" maxlength="50"></textarea>
	  </view>
	  <view class="change">
		  <view class="flex_j_a_r">更换封面</view>
		  <view class="flex_j_a_r">
			  <image :src="info.mask.length<=0?info.default_mask:info.mask"  @click="uploadMask" mode=""></image>
		  </view>
	  </view>
	  <view class="change">
	  		  <view class="flex_j_a_r">作品集置顶</view>
	  		  <view class="flex_j_a_r">
				  <switch :checked="info.top"  style="transform: scale(0.7);" color="rgb(110,121,226)"></switch>
	  		  </view>
	  </view>
	  <view class="range">
		  <view class="tit">选择分享范围</view>
		  <view class="chang" style="padding-left:10px;">
		  		  <view class="flex_j_a_r">公开</view>
		  		  <view class="flex_j_a_r">
		  				  <switch style="transform: scale(0.7);" @change="public_work" :checked="info.show_work" color="rgb(110,121,226)"></switch>
		  		  </view>
		  </view>
		  <view class="add">
			  <uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			  选择好友</view>
	  </view>
	  <view class="btn2" @click="publish">发布</view>
  </view>
</template>

<script>
import back from '/components/back.vue'
import {ref,reactive} from 'vue'
export default{
  name:'',
  components:{
  	  back
  },
  mounted() {
  	uni.current_this_publish_video=this
  },
  setup(){
	let info=reactive({
		title:'',
		description:'',
		mask:'',
		default_mask:'../../../../static/add.svg',
		show_work:true,
		top:false
	})    
	function publish(){
		let Info=Object.keys(info)
		for(let item of Info){
			if(typeof info[item]!=='boolean' && info[item].length<=0){
				uni.showToast({
					title:(item=='title'?'作品标题':item=='description'?'作品简介':item=='mask'?'作品封面':'')+'不能为空'
				})
				return
			}
		}
		// upload_mask
		uni.showLoading({
			mask:true
		})
			uni.uploadFile({
				url:uni.current_this.baseURL+':5001/upload_mask',
				filePath:info.mask,
				name:'mask',
				success(res) {
					let data=JSON.parse(res.data)
					if(data.error){
						uni.showToast({
							icon:'error',
							title:'修改失败'
						})
						uni.hideLoading()
						return
					}
					let src='https://www.mynameisczy.asia/antique/video_masks/'+data.data
					uni.request({
						url:uni.current_this.baseURL+':5001/new_work_collection',
						method:'POST',
						data:{
							openid:uni.current_this.store.state.user_info.openid,
							mask:src,
							title:info.title,
							description:info.description,
							show_work:info.show_work?'show':'hid'
						},
						success(res) {
							if(uni.current_this.check_res_state(res))
								return
							uni.showToast({
								title:'添加成功',
								icon:'none'
							})
							uni.current_this.store.state.user_info.works.push({
								title:info.title,
								mask:src,
								description:info.description,
								show_work:info.show_work?'show':'hid',
								score:0
							})
							uni.navigateBack()
						},
						complete() {
							uni.hideLoading()
						}
					})
				}
		})
		// 1上传图片
		// 2上传内容
	}
	function set_mask(){
		uni.current_this.no_develop('选择照片')
	}
	function uploadMask(){
		uni.navigateTo({
			url:'/pages/person/other_page/avatar_edit/choose'
		})
	}
	function public_work(e){
		info.show_work=e.detail.value
	}
	return{info,publish,set_mask,uploadMask,public_work}
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
