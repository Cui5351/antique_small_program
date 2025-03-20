<template>
  <view class="container">
      <view class="video">
		  <video enable-danmu='true' autoplay :danmu-list='current_video.danmu' @timeupdate='timeupdate' show-mute-btn='true' :poster="current_video.mask" :src="current_video.src"></video>
	  </view>
      <view class="introduce">
		  <view class="intro">
			  <view class="tit">{{title}}</view>
		  &emsp;&emsp;{{current_video.name}}
		  <view style="text-align: end;">
			{{current_video.publish_date}}
		  </view>
		  </view>
		  <view class="author flex_j_a_r">
			  <view class="flex_j_a_r">
				  <view class="avatar" @click="user_info">
					  <image :src="person.avatar" mode=""></image>
				  </view>
				  <view>{{person.name}}</view>
			  </view>
			  <view class="icon">
				  <uni-icons :type="current_video.stars>0?'heart-filled':'heart'" :color="current_video.stars>0?'red':''" size="25" @click="increment('stars')"></uni-icons>{{current_video.stars}}
				  <uni-icons :type="current_video.collection>0?'star-filled':'star'" :color="current_video.collection>0?'gold':''" size="25" @click="increment('collection')"></uni-icons>{{current_video.collection}}
				  <button open-type="share" plain > 
					<uni-icons size="25" :type="current_video.share>0?'paperplane-filled':'paperplane'" :color="current_video.share>0?'yellowgreen':''"></uni-icons>
				  </button>
					{{current_video.share}}
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
			<view class="vide" v-for="(item,index) in video" :key="index"  @click="toggle(index)"  style="position: relative;">
				<image :src="item.mask"></image>
				<image style="background-color: rgba(0,0,0,0);position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="/play.svg"></image>
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
						  <view style="font-size:13px;color: gray;">{{item.user_name}}</view>
						  <view style="font-size:17px;margin:3px 0 4px 0;">{{item.text}}</view>
						  <view style="font-size:13px;color: gray;">{{item.date}}</view>
					  </view>
				  </view>
				  <view class="right flex_j_a_r">
					  <!-- <uni-icons size="20" type="chat"></uni-icons> -->
					  <uni-icons size="20"  :type="item.stars>0?'hand-up-filled':'hand-up'" :color="item.stars>0?'red':''"  @click="item.stars++"></uni-icons>
					  {{item.stars}}
					  <!-- <uni-icons size="20" type="paperplane"></uni-icons> -->
				  </view>
			  </view>
		  </view>
	  </view>
	  <view class="send_damu flex_j_a_r grows">
		  <view>
			  <uni-icons type="location" size="30"></uni-icons>
		  </view>
		  <view class="input">
			  <input type="text" @confirm="send" confirm-type="send" v-model="danmu" maxlength="15" placeholder="发送一条弹幕吧">
		  </view>
		  <view class="flex_j_a_c" @click="send">发送</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res){
	  this.person.name=res.name
	  this.person.avatar=res.avatar
	  this.person.openid=res.openid
	  let v=JSON.parse(res.video)
	  v.forEach(item=>{
				item.publish_date=uni.current_this.dateformat_accuracy(new Date(item.publish_date))
	  })
	  this.video.push(...v)
		if(this.video.length>0)
			Object.keys(this.current_video).forEach(item=>{
				if(this.video[0][item]==undefined){
					return
				}
				this.current_video[item]=this.video[0][item]
			})
		this.title=res.title
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
			that.current_video.danmu.push(...(res.data.data.map(item=>{
				item.send_date=uni.current_this.dateformat(new Date(item.send_date))
				return {
					text:item.danmu,
					time:item.video_time,
					user_name:item.user_name,
					user_avatar:item.user_avatar,
					color:'white',
					date:item.send_date,
					stars:0
				}
			})))
		}
	  })
  },
  onShareAppMessage() {
	this.current_video.share++
  	return {
  	    title: this.current_video.name, //分享的名称
		imageUrl:this.current_video.mask,
  	    path: `/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(this.video)}&title:${this.title}`
  	    // mpId:'' //此处配置微信小程序的AppId
  	}
  },
  setup(){
	let video=reactive([])
	let title=ref('')
	let current_video=reactive({
		name:'',
		mask:'',
		src:'',
		video_id:'',
		danmu:[],
		time:0,
		stars:0,
		share:0,
		collection:0,
		publish_date:''
	})
	let person=reactive({	
		avatar:'',
		name:'',
		openid:''
	})
	let danmu=ref('')
	let state=ref(true);
	function timeupdate(e){
		current_video.time=Number.parseInt(e.detail.currentTime)
	}
	let index=ref(0)
	function toggle(ind){
		if(ind==index.value)
			return
		uni.showLoading({
			title:'资源加载中',
			mask:true
		})
		Object.keys(current_video).forEach(item=>{
			if(item=='danmu'){
				let i=current_video[item].length
				for(let j=0;j<i;j++){
					current_video[item].pop()
				}
				uni.request({
					url:uni.current_this.baseURL+':5001/get_danmu',
						method:'POST',
						data:{
							video_id:current_video.video_id
						},success(res) {
							if(uni.current_this.check_res_state(res)){
								return
							}
							current_video.danmu.push(...(res.data.data.map(item=>{
								console.log(current_video.danmu,'danmu');
								return {
									text:item.danmu,
									time:item.video_time,
									date:uni.current_this.dateformat_accuracy(new Date(item.send_date)),
									user_name:item.user_name,
									user_avatar:item.user_avatar,
									color:'white'
								}
							})))
						}
				})
				return
			}
			if(video[ind][item]==undefined)
				return
			current_video[item]=video[ind][item]
		})
		index.value=ind
		setTimeout(()=>{
			uni.hideLoading()
		},300)
	}
	function send(){
		if(uni.current_this.store.state.user_info.openid.length<1){
			uni.showToast({
				title:'清先登录',
				icon:'none'
			})
			return
		}
		if(!state.value){
			uni.showToast({
				title:'您输入的速度太快了,休息一下吧',
				icon:'none'
			})
			return
		}
		if(danmu.value.length<=0){
			uni.showToast({
				title:'输入内容为空',
				icon:'error'
			})
			return
		}
		state.value=false
		uni.request({
			url:uni.current_this.baseURL+':5001/send_danmu',
			method:'POST',
			data:{
				video_id:current_video.video_id,
				message:danmu.value,
				openid:uni.current_this.store.state.user_info.openid,
				video_time:current_video.time
			},
			success(res) {
				if(uni.current_this.check_res_state(res))
					return
				current_video.danmu.push({
					user_avatar:uni.current_this.store.state.user_info.avatar,
					user_name:uni.current_this.store.state.user_info.name,
					text:danmu.value,
					time:current_video.time,
					color:'white',
					date:uni.current_this.dateformat_accuracy(new Date())
				})
			},
			complete() {
				setTimeout(()=>{
					danmu.value=''
					state.value=true
				},Math.random()*1000)
			}
		})
	}
	let no_develop=uni.current_this.no_develop
	function increment(pro){
		current_video[pro]++;
	}
	function user_info(){
		uni.navigateTo({
			url:`/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
				avatar:person.avatar,
				name:person.name,
				openid:person.openid
			})}`
		})
	}
    return{user_info,video,current_video,person,title,state,timeupdate,danmu,send,toggle,no_develop,increment}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
