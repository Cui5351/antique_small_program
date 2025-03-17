<template>
	<back name='新帖子'></back>
  <view class="containe">
      <view class="description">
      	<textarea v-model="info.content" cols="50" placeholder="添加内容..." rows="7" maxlength="2000"></textarea>
      </view>
	  <view class="picture" v-if="info.path.length>0">
		  <view class="pic">
			<video :src="info.path" :poster='info.mask'></video>
			<view class="err flex_j_a_c">
				<uni-icons type="closeempty" @click="delPic" size="25" color="white"></uni-icons>
			</view>
		  </view>
	  </view>
	  <view class="place">
		  <view class="flex_j_a_r" >添加地点
		  <uni-icons type="location-filled" color="rgb(110,121,226)"></uni-icons>
		  </view>
		  <view @click="getLocation">{{info.place == '' ? '请选择地区':info.place}}</view>
		<!-- <input type="text" placeholder="请输入地区" v-model="info.place" maxlength="20"> -->
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
import {ref,reactive} from 'vue'
export default{
  async onLoad(res){
	  let path=JSON.parse(res.path)
	  this.info.mask=path.thumbTempFilePath
	  this.info.duration=''+path.duration
	  let duration=path.duration
	  // 计算出分和秒
	  if(((duration/60+'').split('.')[0])!=0){
		  // 有分拿分
		  let minute=(duration/60+'').split('.')[0]
		  let second=duration.toFixed()-minute*60
		  this.info.duration=(minute<10?`0${minute}:${second<10?`0${second}`:(second)}`:`${minute}:${second<10?`0${second}`:(second)}`)
	  }else{
		  // 没分上秒
			this.info.duration=duration.toFixed()<10?`00:0${duration.toFixed()}`:`00:${duration.toFixed()}`
	  }
	  this.info.path=path.tempFilePath
	  this.channel = this.getOpenerEventChannel()
  },
  components:{
	  back
  },
  setup(){
	  let channel = ref(null)
	  let info=reactive({
	  	content:'',
		duration:'0.0',
	  	show_work:true,
		place:'',
		path:'',
		mask:'',
		sus:[]
	  })    
	  let state=ref(false)
	  function develop(name){
	  	uni.showToast({
	  		icon:'none',
	  		title:name+'暂时未开放'
	  	})
	  }
	  const getLocation = () => {
	  		  uni.getLocation({
	  		  	success({latitude,longitude}) {
	  				  uni.chooseLocation({
	  					  latitude,longitude,
	  					success(res) {
	  						console.log(res,'res');
	  						info.place = res.name
	  					}
	  				  })
	  		  	}
	  		  })
	  }
	  async function publish(){
		  if(state.value)
			return
		if(uni.current_this.store.state.user_info.openid.length<=0){
			  uni.showToast({
			  	title:'请重新登录后尝试',
			  	icon:'none'
			  })
			  return
		  }
		  if(info.content.length<=0){
			  uni.showToast({
			  	title:'帖子内容不允许为空',
				icon:'none'
			  })
			  return
		  }
		  state.value=true
		  // 1上传多张图片
		  uni.showLoading({
		  	title:'上传中',
		  	mask:true
		  })
		  let p=[info.path,info.mask]
		  		  for(let i=0;i<p.length;i++){
		  			  try{ 
		  				  let url=await new Promise((resolve,reject)=>{
		  					  uni.uploadFile({
		  						  url:uni.current_this.baseURL+':5001/upload_moment_material',
		  						  filePath:p[i],
		  						  name:'moment',
		  						  success(res) {
		  							  let data=JSON.parse(res.data)
		  							  if(data.state!=1){
		  								  reject()
		  								  return
		  							  }
		  							  resolve(data.data)
		  						  },fail(e) {
		  							reject()
		  						  }
		  					  })
		  				  })
		  				info.sus.push(url)
		  			  }catch(e){
		  				info.sus.push(0)
		  			  }
		  		  }	 
				   let count=0
		  			for(let i=0;i<info.sus.length;i++)
		  			  	if(info.sus[i]==0){
		  					info.sus.splice(i,1)
		  					count++
		  					i--
		  				}
		  			if(count){
		  				uni.showToast({
		  					icon:'error',
		  					title:`上传失败`
		  				})
						// 删除所有
						let i=info.sus.length
						for(let k=0;k<i;k++)
							info.sus.pop()
						return
					}
				uni.showLoading({
					title:'发布作品中',
					mask:true
				})
		  // 2上传帖子
		uni.request({
					url:uni.current_this.baseURL+':5001/upload_moment',
					method:'POST',
					data:{
						paths:[info.sus[0]],
						openid:uni.current_this.store.state.user_info.openid,
						show_work:info.show_work?'show':'hid',
						place:info.place,
						content:info.content,
						mask:info.sus[1],
						duration:info.duration
					},
					success(res) {
						if(uni.current_this.check_res_state(res))
							return
						// uni.current_this.store.dispatch('addmoment',JSON.stringify({
						// 	avatar:uni.current_this.store.state.user_info.avatar,
						// 	openid:uni.current_this.store.state.user_info.openid,
						// 	name:uni.current_this.store.state.user_info.name,
						// 	type:'v',
						// 	src:info.sus[0],
						// 	mask:[info.sus[1]],
						// 	content:info.content,
						// 	place:info.place.length?info.place:'火星',
						// 	send_date:uni.current_this.dateformat_accuracy(new Date()),
						// 	browser:0,
						// 	uuid:res.data.data.uuid,
						// 	moment_count:0,
						// }))
						channel.value.emit('loadData')
						uni.navigateBack()
						uni.showToast({
							title:'发布成功',
							icon:'success'
						})
					},
					complete() {
						state.value=false
						uni.hideLoading()
					}
	})
	}
	function delPic(){
		uni.showModal({
			title:'是否删除该视频',
			success(res) {
				if(res.cancel)
					return
				info.path=''
			}
		})
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
	const public_work = (e) => {
		info.show_work = e.detail
	}
    return{info,develop,publish,state,check_pict,delPic,getLocation,public_work,channel}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
