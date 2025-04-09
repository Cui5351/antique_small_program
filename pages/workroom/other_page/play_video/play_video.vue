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
				  <!-- <uni-icons :type="current_video.stars>0?'heart-filled':'heart'" :color="current_video.stars>0?'red':''" size="25" @click="increment('stars')"></uni-icons>{{current_video.stars}} -->
				  	<image style="width: 40rpx;height: 40rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Heart.svg" mode=""></image>{{current_video.stars}}
				  <!-- <uni-icons :type="current_video.collection>0?'star-filled':'star'" :color="current_video.collection>0?'gold':''" size="25" @click="increment('collection')"></uni-icons>{{current_video.collection}} -->
				  	<image style="width: 40rpx;height: 40rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Pentagram.svg" mode=""></image>{{current_video.collection}}
				  <button open-type="share" plain > 
				  		  <!-- <image style="width: 50rpx;height: 50rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Message2.svg" mode=""></image> -->
					<!-- <uni-icons size="25" :type="current_video.share>0?'paperplane-filled':'paperplane'" :color="current_video.share>0?'yellowgreen':''"></uni-icons> -->
				  </button>
					<!-- {{current_video.share}} -->
			  </view>
		  </view>
	  </view>
	  <view class="videos">
		  <view class="flex_j_a_r">
			  <view>选集</view>
			  <view @click="moreVideo">
				  全{{video.length}}集
				  <uni-icons type="right" size="20"></uni-icons>
			  </view>
		  </view>
		  <view class="vi">
			<view class="vide" v-for="(item,index) in video" :key="index"  @click="toggle(index)"  style="position: relative;">
				<view class="view_duration">{{item.duration}}</view>
				<image :src="item.mask" mode="aspectFill"></image>
				<image v-if="current_video.src == item.src" style="background-color: rgba(0,0,0,0);position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="/static/Suspend.svg"></image>
				<image v-else style="background-color: rgba(0,0,0,0);position: absolute;z-index:9999;transform: translateX(-100%) scale(.5);" src="/static/Play.svg"></image>
				<view class="view_name">{{item.name}}</view>
			</view>
		</view>
		  </view>
      <view class="damu flex_c">
		  <view class="title">评论</view>
		  <view class="dan" v-for="(item,index) in current_video.danmu" :key="index">
			  <view class="person grows">
				  <view class="left">
					  <view class="avatar">
						  <image :src="item.user_avatar" mode="aspectFill"></image>
					  </view>
					  <view class="flex_j_a_c" @longpress="delComment(item)">
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
		  <!-- <view style="display: flex;justify-content: center;align-items: center;"> -->
			  <!-- <uni-icons type="location" size="30"></uni-icons> -->
			  <!-- <image style="width: 60rpx;height: 60rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Message2.svg" mode=""></image> -->
		  <!-- </view> -->
		  <view class="input">
			  <input type="text" @confirm="send" confirm-type="send" v-model="danmu" maxlength="15" placeholder="发送一条弹幕吧">
		  </view>
		  <view class="flex_j_a_c" @click="send">
			  <image style="width: 60rpx;height: 60rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Message2.svg" mode=""></image>
		  </view>
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
		this.getDanmu()
		this.timer = setInterval(async() => {
			if(this.load){
				return
			}
			try{
				await this.getDanmu()
			}catch(err) {
				
			}
		},7000)
  },
  onUnload() {
  	clearInterval(this.timer)
  },
  methods:{
	  	  delComment(comment){
			  console.log(comment,'comment');
	  		if(comment.openid != uni.current_this.store.getters.openid)
	  			return
			console.log(comment,'pass');
	  			let that = this
	  		uni.showModal({
	  			title:'是否删除该评论',
	  			success(confirm) {
	  				if(!confirm.confirm)
	  					return
	  				uni.request({
	  					url:uni.current_this.baseURL+':5001/del_video_comment',
	  					method:'GET',
	  					data:{
	  						id:comment.id,
	  						openid:uni.current_this.store.getters.openid
	  					},
	  					success(res) {
							uni.showToast({
								title:'删除成功',
								icon:'none'
							})
							if(that.load){
								return
							}
	  					that.getDanmu();
	  					}
	  				})
	  			}
	  	    })
	  	  }
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
	let timer = ref('')
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
	let load = ref(false)
	let danmu=ref('')
	let state=ref(true);
	function timeupdate(e){
		current_video.time=Number.parseFloat(e.detail.currentTime).toFixed(2)
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
				if(load.value){
					return
				}
				getDanmu().catch(err => {
					uni.showToast({
							title:err,
							icon:'none'
						})
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
		uni.showLoading({
			title:'发送中',
			mask:true
		})
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
				if(load.value){
					return
				}
				// if(uni.current_this.check_res_state(res))
				// 	return
					// 重新加载弹幕
					getDanmu().catch(err => {
						uni.showToast({
								title:err,
								icon:'none'
							})
					})
			},
			complete() {
				setTimeout(()=>{
					uni.hideLoading()
					danmu.value=''
					state.value=true
				},Math.random()*800)
			}
		})
	}
	const getDanmu = () =>{
		load.value = true
			  return new Promise((resolve,reject) => {
			  // 弹幕每5s更新一次
			  uni.request({
			  	url:uni.current_this.baseURL+':5001/get_danmu',
			  		method:'POST',
			  		data:{
			  			video_id:current_video.video_id
			  		},success(res) {
						resolve()
			  			// if(uni.current_this.check_res_state(res)){
			  			// 	return
			  			// }
						// 更新弹幕
						current_video.danmu.splice(0,current_video.danmu.length)
			  			current_video.danmu.push(...(res.data.data.map(item=>{
			  				item.send_date=uni.current_this.dateformat(new Date(item.send_date))
			  				return {
			  					text:item.danmu,
			  					time:item.video_time,
			  					user_name:item.user_name,
			  					user_avatar:item.user_avatar,
			  					color:'white',
			  					date:item.send_date,
								openid:item.openid,
								id:item.id,
			  					stars:0
			  				}
			  			})))
			  		},
					fail() {
						reject("加载失败")
					},
					complete() {
						load.value = false
					}
			  })
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
	function moreVideo(){
		// 查询当前播放视频的index
		let index=video.findIndex(item=>item.video_id==current_video.video_id)
		// 跳转到下一个视频
		uni.navigateTo({
			url:`/pages/workroom/other_page/video_all/video_all?video=${JSON.stringify(video)}&current=${index}`,
			events:{
				togglePage(data){
					toggle(data)
				}
			}
		})
	}
    return{user_info,video,current_video,person,title,state,timeupdate,danmu,send,toggle,no_develop,increment,getDanmu,timer,load,moreVideo}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
