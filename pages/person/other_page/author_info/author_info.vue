<template>
		<scroll-view class="container flex_c background" scroll-y="true" @scrolltolower="lower">
		<view class="head_title flex_j_a_r" :style="{minHeight:top+'px',opacity:opacity?'0%':'100%'}">{{info.name}}</view>
		<view class="top_img">
			<view class="back">
				<uni-icons @click='back' type="left" size="25" color="white"></uni-icons>
			</view>
			<image :src="info.background"></image>
		</view>
		<view class="info flex_c info2">
			<view class="top">
				<view class="avatar">
						<image :src="info.avatar"></image>
				</view>
				<view class="avatar_right">
					<view>
						<view class="count flex_c">
							<view>{{info.works.length}}</view>
							<view>作品</view>
						</view>
						<view class="count flex_c">
							<view>{{info.counts[1]}}</view>
							<view>粉丝</view>
						</view>
						<view class="count flex_c">
							<view>{{info.counts[2]}}</view>
							<view>关注</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex_c in">
					<view class="name">{{info.name}}&emsp;{{info.sex}}</view>
					<view class="id">ID:{{info.openid}}</view>
					<view class="introduce">简介:{{info.introduce}}</view>
			</view>
		</view>
		<view class="works flex_c">
			<view class="title2" :style="{top:top+'px'}">
				<view class="t1 background">
					<view @click="toggle(true)" class="ti">作品</view>
					<view @click="toggle(false)" class="ti">动态</view>
				</view>
				<view class="t2">
					<view class="line background1" :style="{left:info.toggle?'0%':'50%'}"></view>
				</view>
			</view>
			<view class="two" v-if="!info.toggle" >
				<!-- <view>博物馆</view> -->
				<!-- <view>商品</view> -->
				<!-- <view>文物</view> -->
				<!-- <view>工作室</view> -->
			</view>
			<view v-if="!info.toggle" >
				<view class="moment" @click="detail(item)" v-for="(item,index) in info.works2" :key="index" >
					<view class="date">
						<view class="d">{{item.send_date}}</view>
						<view class="place">{{item.place}}</view>
					</view>
					<view class="mpic" v-if="item.src.length&&item.type=='p'">
						<!-- {{item.src}} -->
						<image :src="item.src[0]" mode="aspectFill"></image>
					</view>
					<view class="mpic" v-if="item.type=='v'">
						<!-- {{item.type}} -->
						<view class="duration">{{item.duration[0]}}</view>
						<image :src="item.mask[0]" mode="aspectFill"></image>
					</view>
					<!-- <view class="mpic" v-if="item.src.length"> -->
						<!-- <image :src="item.src[0]" mode="aspectFill"></image> -->
					<!-- </view> -->
					<view class="mtxt">
						<view class="mtx">
							{{item.content.length>=20?item.content.substring(0,20)+'...':item.content}}
						</view>
						<view class="item" v-if="item.type=='p'">({{item.src.length}}张)</view>
						<view class="item" v-if="item.type=='v'">(视频)</view>
						</view>
				</view>
			<view class="line2 flex_j_a_r">
				<view class="lin"></view>
				<view class="dot"></view>
				<view class="lin"></view>
			</view>
			</view>
			<view class="work"  v-if="info.toggle" :class="(info.works.length<=0&&info.toggle)?'start_btn_cen':''" >
				<view class="start_btn" style="border: none !important;color: gray;" v-if="info.works.length<=0&&info.toggle">
					空空如也
				</view>
				<view @click="inter(item)" v-for="(item,index) in info.works" :key="index" v-show="info.toggle">
					<image :src="item.mask" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
	  onLoad(res){
		  let that=this
		  let inf=JSON.parse(res.info)
		  Object.keys(inf).forEach(item=>{
			  this.info[item]=inf[item]
		  })
		  this.reqmoment()
		  // 通过openid请求作者信息
		  uni.request({
		  	url:uni.current_this.baseURL+':5001/get_author_info',
			method:'POST',
			data:{
				openid:that.info.openid
			},
			success(res) {
		  		if(uni.current_this.check_res_state(res)){
		  			return
		  		}
				Object.keys(res.data.data).forEach(item=>{
					that.info[item]=res.data.data[item]
				})
			}
		  })
		  
		  // 作品
		  uni.request({
		  	url:uni.current_this.baseURL+':5001/get_workAll',
		  	method:"POST",
		  	data:{
		  		openid:that.info.openid
		  	},
		  	success(res) {
		  		if(uni.current_this.check_res_state(res)){
		  			return
		  		}
		  		that.info.works.push(...res.data.data)
		  	}
		  })
	  },
  setup(){
	let info=reactive({
		name:'',
		avatar:'',
		sex:'',
		openid:'',
		background:'',
		introduce:'',
		counts:[0,0,0],
		works:[],
		works2:[],
		toggle:true
	})
	function toggle(bool){
		info.toggle=bool
	}
	let opacity=ref(true)
	let top=ref(uni.getMenuButtonBoundingClientRect().height*2)
	let back=uni.current_this.back
	const reqs=reactive({
		state:false,
		skip:0
	})
	function lower(){
		if(info.toggle)
			return
		reqmoment()
	}
	function reqmoment(){
		if(reqs.state)
			return
		reqs.state=true
		uni.request({
			url:uni.current_this.baseURL+':5001/get_person_community_moments2',
			method:"POST",
			data:{
				openid:info.openid,
				skip:reqs.skip
			},success(res) {
				let w=res.data.data
				w.forEach(item=>{
					if(item.src[0]){
						if(item.src[0].substring(item.src[0].length-3)=='mp4')
							item.type='v'
						else
							item.type='p'
					}
					item.send_date=uni.current_this.dateformat(new Date(item.send_date))
				})
				reqs.skip+=w.length
				if(!w.length)
					return
				info.works2.push(...w)
			},
			fail(e) {
				console.log(e);
			},
			complete() {
				setTimeout(()=>{
					reqs.state=false
				},1000)
			}
		})
	}
	function detail(item){
		uni.navigateTo({
			url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
		})
	}
	function inter(item){
		uni.request({
			url:uni.current_this.baseURL+':5001/get_video',
			method:"POST",
			data:{
				uuid:item.uuid
			},
			success(res) {
				if(uni.current_this.check_res_state(res)){
					return
				}
				if(!res.data.data.arr.length){
					uni.showToast({
						title:'该作品集为空',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url:`/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data.arr)}&title=${item.title}&avatar=${info.avatar}&name=${info.name}&openid=${info.openid}`
				})
			}
		})
	}
    return{inter,info,detail,toggle,reqs,opacity,reqmoment,top,back,lower}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/pages/person/index.scss';
@import '/uni.scss';
</style>