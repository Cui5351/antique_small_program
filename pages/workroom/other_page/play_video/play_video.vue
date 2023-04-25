<template>
  <view class="container">
      <view class="video">
		  <video enable-danmu='true' @timeupdate='timeupdate' show-mute-btn='true' :poster="current_video.mask" :src="current_video.src"></video>
	  </view>
      <view class="introduce">
		  <view class="intro">{{current_video.name}}</view>
		  <view class="author flex_j_a_r">
			  <view class="flex_j_a_r">
				  <view class="avatar">
					  <image src="../../../../static/icons/home_active.png" mode=""></image>
				  </view>
				  <view>成都大师</view>
			  </view>
			  <view class="icon">
				  <uni-icons type="heart" size="25"></uni-icons>0
				  <uni-icons type="star" size="25"></uni-icons>0
				  <uni-icons size="25" type="paperplane"></uni-icons>0
			  </view>
		  </view>
	  </view>
	  <view class="videos">
		  <view class="flex_j_a_r">
			  <view>选集</view>
			  <view>
				  全{{video.length}}集
				  <uni-icons type="right" size="20"></uni-icons>
			  </view>
		  </view>
		  <view class="vi">
			<view class="vide" v-for="(item,index) in video" :key="index">
				<image :src="item.mask" mode=""></image>
			</view>
		</view>
		  </view>
      <view class="damu flex_c">
		  <view class="title">评论</view>
		  <view class="dan" v-for="(item,index) in current_video.danmu" :key="index">
			  <view class="person grows">
				  <view class="left">
					  <view class="avatar">
						  <image :src="item.user_avatar" mode=""></image>
					  </view>
					  <view class="flex_j_a_c">
						  <view style="font-size:14px;">{{item.user_name}}</view>
						  <view>{{item.danmu}}</view>
					  </view>
				  </view>
				  <view class="right flex_j_a_r">
					  <uni-icons size="20" type="chat"></uni-icons>
					  <uni-icons size="20" type="heart"></uni-icons>
					  <uni-icons size="20" type="paperplane"></uni-icons>
				  </view>
			  </view>
		  </view>
	  </view>
	  <view class="send_damu flex_j_a_r grows" :class="state?'middle':''">
		  <view>
			  <uni-icons type="location" size="30"></uni-icons>
		  </view>
		  <view class="input">
			  <input type="text" @blur="unfocu" @focus="fouc" maxlength="15">
		  </view>
		  <view class="flex_j_a_c">发送</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res){
	  this.video.push(...JSON.parse(res.video))
		if(this.video.length>0)
			Object.keys(this.current_video).forEach(item=>{
				if(this.video[0][item]==undefined){
					return
				}
				this.current_video[item]=this.video[0][item]
			})
	  let that=this
	  uni.request({
	  	url:uni.current_this.baseURL+':5001/get_danmu',
		method:'POST',
		data:{
			video_id:that.current_video.video_id
		},success(res) {
			if(uni.current_this.check_res_state(res)){
				return
			}
			console.log(res.data.data);
			that.current_video.danmu.push(...res.data.data)
			console.log(that.current_video);
		}
	  })
  },
  setup(){
	let video=reactive([])
	let current_video=reactive({
		name:'',
		mask:'',
		src:'',
		video_id:'',
		danmu:[],
		time:0
	})
	let state=ref(false);
	function fouc(){
		state.value=true
	}
	function unfocu(){
		state.value=false
	}
	function timeupdate(e){
		current_video.time=Number.parseInt(e.detail.currentTime)
	}
    return{video,current_video,state,fouc,unfocu,timeupdate}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
