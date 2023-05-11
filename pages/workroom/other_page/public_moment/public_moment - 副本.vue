<template>
	<back name='新帖子'></back>
  <view class="containe">
      <view class="description">
      	<textarea v-model="info.content" cols="50" placeholder="添加内容..." rows="7" maxlength="150"></textarea>
      </view>
	  <view class="picture">
		  <image :src="item" v-for="(item,index) in info.paths" :key="index" mode=""></image>
	  </view>
	  <view class="place">
		  <view class="flex_j_a_r" >添加地点
		  <uni-icons type="location-filled" color="rgb(110,121,226)"></uni-icons>
		  </view>
		<input type="text" placeholder="请输入地区" v-model="info.place" maxlength="5">
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
onLoad(res){
	  let paths=JSON.parse(res.paths)
	  let that=this
		  for(let i=0;i<paths.length;i++){
					  uni.uploadFile({
						  url:uni.current_this.baseURL+':5001/upload_moment_material',
						  filePath:paths[i],
						  name:'moment',
						  success(res) {
							  let data=JSON.parse(res.data)
							  if(data.state==1){
								  that.info.paths.push(data.data)
							  }
						  }
					  })
		  }	  
  },
  components:{
	  back
  },
  setup(){
	  let info=reactive({
	  	content:'',
	  	show_work:true,
		place:'',
		paths:[]
	  })    
	  let state=ref(0)
	  function develop(name){
	  	uni.showToast({
	  		icon:'none',
	  		title:name+'暂时未开放'
	  	})
	  }
	  async function publish(){
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
		  // 1上传多张图片
		  // 2上传帖子
		  console.log(info,'info');
			uni.request({
						url:uni.current_this.baseURL+':5001/upload_moment',
						method:'POST',
						data:{
							paths:info.paths,
							openid:uni.current_this.store.state.user_info.openid,
							show_work:info.show_work?'show':'hid',
							place:info.place,
							content:info.content
						},
						success(res) {
							console.log(res,'res');
						}
		})
	}
		function add_pic(){
			
		}
    return{info,develop,publish,state}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
