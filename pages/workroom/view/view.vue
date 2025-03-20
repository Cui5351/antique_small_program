<template>
  <view class="container" style="background-color: black;">
	<!-- <image class="background_antique" src="/static/show_antique_background.svg" mode=""></image> -->
	<view class="head_two" style="background-color: rgba(0,0,0,0);">
		<uni-icons type="left" size="25" color="rgb(200,200,186)" @click="back"></uni-icons>
	</view>
	<swiper vertical="true" class="swiper" @change="swiperChange">
		<swiper-item v-for="(item,index) in moment" :key="index">
			<view class="antique grows">
			<!-- 	<view class="born flex_j_a_c grows">
					<view class="tip flex_j_a_c">
						<view class="arrow">
							<uni-icons type="top" color="rgb(200,200,186)"></uni-icons>
						</view>
						<view style="font-size:15px;">
						</view>
					</view>
				</view> -->
				<view class="pic .flex_j_a_c" @click.prevent="detail_info(item)">
						<view class="pic" v-if="item.type=='v'"  style="width: 100%;height: 80%;">
							<video :autoplay="index == 0" :id="index" auto-pause-if-navigate="true" :loop="index == swiperIndex" :src="item.src" enable-progress-gesture :poster="item.mask" @click.prevent="()=>{}" style="width: 100%;height: 100%;"></video>
						</view>
						<swiper autoplay  interval="3000"  indicator-color="gray" circular indicator-active-color="white" :indicator-dots="item.src.length > 1" :class="item.src.length>1?'pic':'pic2'" v-if="item.src[0]!=null&&item.type=='p'" style="width: 100%;height: 100%;">
							<swiper-item v-for="(item2,index) in item.src" :key="index" style="display: flex;justify-content: center;align-items: center;">
								<image :src="item2" mode="widthFix" style="width: 100%;height: 100%"></image>
							</swiper-item>
						</swiper>
						<!-- <view class="btn flex_j_a_r" @click="tip('3D')">
							3D<uni-icons type="right"></uni-icons>
						</view> -->
				</view>
				<view class="name" @click.prevent="detail_info(item)">
					<view style="margin-top: 10rpx;">
						<text>：
							{{ item.content.length >= 50 ? item.content.substring(0,50) + '...' : item.content}}
						</text>
					</view>
					<view>
					<view class=".flex_c_b" style="gap:20rpx;margin-top: 10rpx;">
						<view class="flex_j_a_r" style="gap:20rpx" @click.prevent="user_info(item)">
							<image style="width: 100rpx;height:100rpx;border-radius: 50%;" :src="item.avatar" mode=""></image>
							{{item.name}}
						</view>
					</view>
					<view style="margin-top: 15rpx;">发布时间：{{item.send_date}}</view>
						<view class="museum" style="max-width: 90%;">
							<uni-icons color="background-color: rgba(0,0,0,0)" type="location"></uni-icons>
							{{ item.place.length >= 20 ? item.place.substring(0,20) + '...' : item.place}}
						</view>
					</view>
				</view>
			</view>
		</swiper-item>
	</swiper>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onLoad(res) {
	  // 首先加载自己，再加载其他的
	this.getInfo(res.uuid);
  	this.get_moments(res.uuid)
  },
  methods:{
	  swiperChange(e){
		 if(this.moment[e.detail.current].src[0].substring(this.moment[e.detail.current].src[0].length-3)=='mp4'){
			 console.log('mp4',this.swiperIndex);
			 this.pauseVideo(this.swiperIndex,e.detail.current)
		 }else if(this.moment[this.swiperIndex].src[0].substring(this.moment[this.swiperIndex].src[0].length-3)=='mp4'){
			 // 停止上一个
			 this.pauseVideoOne(this.swiperIndex)
		 }
		  this.swiperIndex = e.detail.current
	  	 if(e.detail.current == this.moment.length - 1){
	  		 // 加载新的项
	  		 this.get_moments(this.moment[this.swiperIndex].uuid)
	  	 }
	  },
	  pauseVideoOne(id) {
	              // 获取 video 组件的上下文
	              const videoContext = uni.createVideoContext(id +'', this);
	              videoContext.pause();
	          },
	  pauseVideo(id,id2) {
	              // 获取 video 组件的上下文
	              const videoContext = uni.createVideoContext(id +'', this);
	              const videoContext2 = uni.createVideoContext(id2 +'', this);
	              // 调用 pause 方法暂停视频播放
	              videoContext.pause();
	              videoContext2.play();
	          },
	getInfo(uuid)  {
		let that = this
		uni.request({
			url:uni.current_this.baseURL+':5001/get_community_moments_info',
			data:{
				uuid:uuid,
			},method:"GET",
			success(res) {
				console.log(res,'ress');
				if(uni.current_this.check_res_state(res))
					return
					res.data.data.forEach(item=>{
						if(item.hasOwnProperty("src")){
							if(item.src[0]){
								if(item.src[0].substring(item.src[0].length-3)=='mp4')
									item.type='v'
								else
									item.type='p'
							}
						}else{
							item.src=[]
						}
						item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
					})
					that.moment.unshift(...res.data.data)
					// this.reqs.skip+=res.data.data.length
			},complete() {
				setTimeout(()=>{
					that.reqs.state=false
				},1000)
				uni.hideLoading()
			},fail(err) {
				console.log(err,'err');
			}
		})
	}
  },
  setup(){
 function detail_info(item){
	 uni.navigateTo({
		url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
	 })
 }
 let back= () => {
	 uni.navigateBack()
 }
 function tip(title){
	 uni.showToast({
	 	title:title+'功能暂未开放',
		icon:'none'
	 })
 }
 const reqs = reactive({
	 stsate:false,
	 skip:0
 })
 const moment = reactive([])
 function get_moments(uuid){
 	reqs.state=true
 	uni.request({
 		url:uni.current_this.baseURL+':5001/get_community_moments_next',
 		method:'GET',
 		data:{
 			uuid:uuid
 		},
 		success(res) {
 			if(uni.current_this.check_res_state(res))
 				return
 				res.data.data.forEach(item=>{
 					if(item.hasOwnProperty("src")){
 						if(item.src[0]){
 							if(item.src[0].substring(item.src[0].length-3)=='mp4')
 								item.type='v'
 							else
 								item.type='p'
 						}
 					}else{
 						item.src=[]
 					}
 					item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
 				})
 				moment.push(...res.data.data)
 				reqs.skip+=res.data.data.length
 		},complete() {
 			setTimeout(()=>{
 				reqs.state=false
 			},1000)
 			uni.hideLoading()
 		},fail(err) {
 			console.log(err,'err');
 		}
 	})
 }
 function user_info(item){
 	uni.navigateTo({
 		url:`/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
 			avatar:item.avatar,
 			name:item.name,
 			openid:item.openid
 		})}`
 	})
 }
 const swiperIndex = ref(0)
    return{detail_info,back,tip,get_moments,moment,user_info,reqs,swiperIndex}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
.container{
	color: rgb(200,200,186);
	position: absolute;
	z-index:99;
	&>view{
		position: relative;
		z-index:200;
	}
}
</style>
