<template>
	<back name='新帖子'></back>
  <view class="containe">
	  <view class="place">
	  		  <view class="flex_j_a_r" >作品名
	  		  </view>
	  		<input type="text" placeholder="请输入作品名" v-model="info.name" maxlength="20">
	  </view>
		  <view class="picture">
			  <view>封面</view>
		  		<image :src="info.mask" mode="aspectFill"></image>
		  </view>
		  <view class="picture">
			  <view>作品</view>
		  		<video :src="info.path" mode="aspectFill"></video>
		  </view>
	  <view class="range">
	  		  <view class="tit">选择分享范围</view>
	  		  <view class="chang" style="padding-left:10px;">
	  		  		  <view class="flex_j_a_r">公开</view>
	  		  		  <view class="flex_j_a_r">
	  		  				  <switch style="transform: scale(0.7);" @change="public_work" :checked="info.show_work" color="rgb(110,121,226)"></switch>
	  		  		  </view>
	  		  </view>
	  		  <view class="add" @click="develop('选择好友')">
	  			  <uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
	  			  选择好友</view>
	  </view>
	  <view class="btn2" @click="publish">发布</view>
  </view>
</template>

<script>	
import back from '/components/back.vue'
import {ref,reactive,computed} from 'vue'
export default{
  async onLoad({path,uuid,mask,title}){
		if(path.length<=0||uuid.length<=0||mask.length<=0){
			uni.showToast({
				title:'加载错误',
				icon:'error'
			})
			uni.navigateBack()
		}
		this.info.path=path
		this.info.mask=mask
		this.info.uuid=uuid
		this.info.title=title
  },
  components:{
	  back
  },
  setup(){
	  let info=reactive({
	  	show_work:true,
		name:'',
		path:'',
		mask:'',
		uuid:'',
		title:'',
		su_path:'',
		su_mask:'',
		su_uuid:''
	  })    
	  let state=ref(0)
	  function develop(name){
	  	uni.showToast({
	  		icon:'none',
	  		title:name+'暂时未开放'
	  	})
	  }
	  async function publish(){
		  uni.showLoading({
			title:'发布中',
		  	mask:'true'
		  })
		if(uni.current_this.store.state.user_info.openid.length<=0){
			  uni.showToast({
			  	title:'请重新登录后尝试',
			  	icon:'none'
			  })
			  return
		  }
		  if(info.name.length<=0){
			  uni.showToast({
			  	title:'作品名不允许为空',
				icon:'none'
			  })
			  return
		  }
		  try{
			  await new Promise(async(resolve,reject)=>{  
				  if(info.su_path.length>0){
					  if(info.su_mask.length<=0){
						  try{
							 await new Promise((resolve1,reject1)=>{
								uni.uploadFile({
					  				  url:uni.current_this.baseURL+':5001/upload_mask',
					  				  filePath:info.mask,
					  				  name:'mask',
					  				  success(res2) {
										  res2.data=JSON.parse(res2.data)
										if(res2.data.state!==1){
												reject('封面上传失败')
												return
										}
										let {mask}=res2.data.data
										info.su_mask=mask	
										resolve1()
									}})
								})
								}catch(e){
									reject('封面上传失败')
								}
								}
										  uni.request({
										  			url:uni.current_this.baseURL+':5001/upload_work_info',
										  			method:'POST',
										  			data:{
										  				openid:uni.current_this.store.state.user_info.openid,
										  				show_work:info.show_work?'show':'hid',
														title:info.title,
														name:info.name,
														src:info.su_path,
														mask:info.su_mask,
														work_uuid:info.uuid,
														video_id:info.su_uuid
										  			},
										  			success(res3) {
														if(res3.data.state==1){
															uni.showToast({
																title:'发布成功'
															})
															uni.manage_work_this.info.works.push({
																avatar:computed(()=>uni.current_this.store.getters.avatar),
																mask:info.su_mask,
																name:computed(()=>uni.current_this.store.getters.name),
																uuid:info.su_uuid,
																title:info.name
															})
															uni.navigateBack()
														resolve()
														}else{
															reject('发布失败')
														}
													}
												})						
					  return
				  }
		  // 1上传视频
			  uni.uploadFile({
				  url:uni.current_this.baseURL+':5001/upload_work',
				  filePath:info.path,
				  name:'works',
				  success(res) {
					  res.data=JSON.parse(res.data)
					  if(res.data.state!==1){
						  reject('视频上传失败')
						  return
					  }
					  let {uuid,src}=res.data.data
					  info.su_path=src
					  info.su_uuid=uuid
					  uni.uploadFile({
					  				  url:uni.current_this.baseURL+':5001/upload_mask',
					  				  filePath:info.mask,
					  				  name:'mask',
					  				  success(res2) {
										  res2.data=JSON.parse(res2.data)
										if(res2.data.state!==1){
												reject('封面上传失败')
												return
										}
										let {mask}=res2.data.data
										info.su_mask=mask
										  // 上传内容
										  uni.request({
										  			url:uni.current_this.baseURL+':5001/upload_work_info',
										  			method:'POST',
										  			data:{
														openid:uni.current_this.store.state.user_info.openid,
														show_work:info.show_work?'show':'hid',
														title:info.title,
														name:info.name,
														src:info.su_path,
														mask:info.su_mask,
														work_uuid:info.uuid,
														video_id:info.su_uuid
										  			},
										  			success(res3) {
														console.log(res3,'res');;
														if(res3.data.state==1){
															uni.showToast({
																title:'发布成功'
															})
															uni.manage_work_this.info.works.push({
																avatar:computed(()=>uni.current_this.store.getters.avatar),
																mask:info.su_mask,
																name:computed(()=>uni.current_this.store.getters.name),
																uuid:info.su_uuid,
																title:info.name
															})
															uni.navigateBack()
															resolve()
														}else{
															reject()
														}
													}
													})
					  				  },
					  				  fail(err) {

					  				  	console.log(err);
					  				  }
					  })
				  },                            
				  fail(err) {
				  	console.log(err);
				  }
			  })
			  })
			  return
	}catch(e){
		  uni.showToast({
			title:err,
			icon:'error'
		  })				  
	}
	}
	function check_pict(path,index){
				uni.previewImage({
					urls:path,
					current:index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
	}
    return{info,develop,publish,state,check_pict}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
