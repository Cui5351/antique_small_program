<template>
	<back name='新帖子'></back>
  <view class="containe">
      <view class="description">
      	<textarea v-model="info.content" cols="50" placeholder="添加内容..." rows="7" maxlength="150"></textarea>
      </view>
	  <view class="picture">
		  <view class="pic2" v-for="(item,index) in info.paths" :key="index">
			<image :src="item" mode="aspectFill"  @click="check_pict(info.paths,index)"></image>
			<view class="err flex_j_a_c">
				<uni-icons type="closeempty" @click="delPic(index)" size="25" color="white"></uni-icons>
			</view>
		  </view>
	  </view>
	  <view class="place">
		  <view class="flex_j_a_r" >添加地点
		  <uni-icons type="location-filled" color="rgb(110,121,226)"></uni-icons>
		  </view>
		<input type="text" placeholder="请输入地区" v-model="info.place" maxlength="20">
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
	  let paths=JSON.parse(res.paths)
	  this.info.paths.push(...paths)
  },
  components:{
	  back
  },
  setup(){
	  let info=reactive({
	  	content:'',
	  	show_work:true,
		place:'',
		paths:[],
		sus:[]
	  })    
	  let state=ref(false)
	  function develop(name){
	  	uni.showToast({
	  		icon:'none',
	  		title:name+'暂时未开放'
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
		  let c=0
		  		  for(let i=0;i<info.paths.length;i++){
		  			  try{ 
		  				  let url=await new Promise((resolve,reject)=>{
		  					  uni.uploadFile({
		  						  url:uni.current_this.baseURL+':5001/upload_moment_material',
		  						  filePath:info.paths[i],
		  						  name:'moment',
		  						  success(res) {
		  							  let data=JSON.parse(res.data)
		  							  if(data.state!=1){
		  								  reject()
		  								  return
		  							  }
		  							  uni.showLoading({
		  							  	title:'上传中'+(++c),
		  							  	mask:true
		  							  })
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
		  					title:`有${count}张图片加载失败`
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
						paths:info.sus,
						openid:uni.current_this.store.state.user_info.openid,
						show_work:info.show_work?'show':'hid',
						place:info.place,
						content:info.content
					},
					success(res) {
						if(uni.current_this.check_res_state(res))
							return
						uni.current_this.store.dispatch('addmoment',JSON.stringify({
							avatar:uni.current_this.store.state.user_info.avatar,
							openid:uni.current_this.store.state.user_info.openid,
							name:uni.current_this.store.state.user_info.name,
							content:info.content,
							place:info.place.length?info.place:'火星',
							src:res.data.data.sus,
							type:'p',
							send_date:uni.current_this.dateformat_accuracy(new Date()),
							browser:0,
							uuid:res.data.data.uuid,
							moment_count:0
						}))
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
	function delPic(index){
		uni.showModal({
			title:'是否删除该图片',
			success(res) {
				if(res.cancel)
					return
				info.paths.splice(index,1)
			}
		})
		console.log(info.paths[index],'delete');
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
    return{info,develop,publish,state,check_pict,delPic}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
