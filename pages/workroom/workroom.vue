<template>
	<view class="flex_j_a_r pub" @click="show_add=true">
		<!-- <view class='ad flex_j_a_c'> -->
			<!-- <uni-icons type="plusempty" size="25" color="white"></uni-icons> -->
		<image class='ad' style="background-color: rgba(0,0,0,0);" src="../../static/Add to.svg" mode=""></image>
		<!-- </view> -->
		<view :class="show_add?'add show_add flex_j_a_c':'add flex_j_a_c'" @click.prevent="publish_moment">
			<image style="transform: scale(.7);" src="../../static/Message2.svg" mode=""></image>
		</view>
		<view :class="show_add?'add show_add2 flex_j_a_c':'add flex_j_a_c'" @click.prevent="publish_moment2">
			<image style="transform: scale(.7);" src="../../static/Camera.svg" mode=""></image>
		</view>
		<view :class="show_add?'add show_add3 flex_j_a_c':'add flex_j_a_c'"  @click.prevent="reload">
			<image src="../../static/Puzzle.svg" mode=""  style="transform: scale(.7);"></image>
		</view>
	</view>
  <scroll-view @touchstart="show_add=false" @scroll="show_add=false" scroll-y="true" class="c" @scrolltolower="lower" @scrolltoupper="upper" lower-threshold="20">
	  <view  class="containe">
	<!-- <view class="show_head head_tit">非遗社区</view> -->
      <view class="head">
      	<view class="pic">
			<image src="/static/community_hot_search.svg" mode=""></image>
		</view>
      </view>
      	<view class="tit1">
			<input @click="toggleSearchPage" type="text" disabled placeholder="热搜卫星,搜寻你期待的热点...">
			<!-- <view class="flex_j_a_r" @click="publish_moment">
				<uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			</view> -->
		</view>
	  <view class="hot">
		  <!-- <view v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙','和我们一起畅游非遗吧']" :key="index" class="font_color">{{index+1}}.{{item}}<view>热</view> -->
		  <view v-for="(item,index) in hotList" :key="index"   @click="detail(item.uuid)" class="font_color">{{index+1}}.{{item.title.length >= 15 ? item.title.substring(0,15) + '...' :item.title}}
		  <view v-if="index < 3" style="background: none;">
			  <image src="../../static/hot.svg" style="width: 30rpx;height: 30rpx;background: rgba(0,0,0,0);transform: scale(1.5);" mode=""></image>
		  </view>
		  </view>
	  </view>
	  <view class="passage font_color">
		<view  v-for="(item,index) in moment" :key="index"  @click="detail(item.uuid)">
			<view class="person">
				<view class="avatar" @click.prevent="user_info(item)">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view>
					<view>{{item.name}}</view>
					<view style="color: gray;font-size: 13px;">{{item.place}}</view>
				</view>
			</view>
			<view class="content">
				<text style="width:100%;height:100%;" selectable="true">
				{{item.content.length>=100?item.content.substring(0,100)+'...':item.content}}
				</text>
			</view>
			<view class="pic" v-if="item.type=='v'">
				<video :src="item.src" enable-progress-gesture :poster="item.mask" @click.prevent="()=>{}"></video>
			</view>
			<view :class="item.src.length>1?'pic':'pic2'" v-if="item.src[0]!=null&&item.type=='p'" >
				<image @click.prevent="check_pict(item.src,index)" :src="item2" v-for="(item2,index) in item.src" :key="index" mode="aspectFill"></image>
			</view>
			<view class="other flex_j_a_r">
				<view class="flex_j_a_r" style="gap:10rpx">
					<!-- <uni-icons type="heart" size="25"></uni-icons>0 -->
					<!-- <uni-icons type="eye" size="25"></uni-icons>{{item.browse}} -->
					<image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../static/Heart.svg" mode=""></image> 0
					<image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../static/Eye.svg" mode=""></image> {{item.browse}}
					<!-- &ensp; -->
					<image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../static/Message2.svg" mode=""></image> {{item.moment_count}}
					<!-- &ensp; -->
					<!-- <uni-icons type="chat" size="25"></uni-icons>{{item.moment_count}} -->
					<!-- <uni-icons type="paperplane" size="25"></uni-icons>0 -->
					<!-- <image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../static/Message2.svg" mode=""></image> {{item.moment_count}} -->
				</view>
				<view class="time">{{item.send_date}}</view>
			</view>
		</view>
	  </view>
	  <view class="bottom">{{content}}</view>
	  </view>
  </scroll-view>
</template>

<script>
import {ref,reactive,computed} from 'vue'
import request from '@/request/request.js'
export default{
  mounted() {
	// uni.showLoading({
	// 	title:'加载中',
	// 	mask:true
	// })
	// this.get_moments()
  },
  onTabItemTap() {
	  uni.showLoading({
	  	title:'加载中',
	  	mask:true
	  })
  	this.moment.splice(0,this.moment.length)
	this.reqs.skip = 0
	this.reqs.state = false
	this.loadHot()
  },
  methods:{
	  loadHot(){
		  uni.showLoading({
		  	title:'加载中热门帖子中'
		  })
		request.get("/Community/GetCommunityHot").then(res => {
			this.hotList.splice(0,this.hotList.length)
			this.hotList.push(...res)
			uni.hideLoading()
		}).catch(err => {
			
		}).finally(() => {
			uni.hideLoading()
			this.get_moments()
		})
	  },
	reload()  {
		uni.showLoading({
			title:'加载中',
			mask:true
		})
		this.moment.splice(0,this.moment.length)
		this.reqs.skip = 0
		this.reqs.state = false
		this.get_moments()
	}
  },
  setup(){
	  let show_add=ref(false)
	let reqs=reactive({
		state:false,
		skip:0,
	})
	const hotList = reactive([])
	// let moment=computed(()=>uni.current_this.store.getters.moments)
	let moment = reactive([])
	let back=uni.current_this.back
	function publish_moment(){
		if(uni.current_this.check_login_state()){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
			return
		}
		uni.chooseMedia({
			// count:9默认为9
			sourceType: ['album'], //从相册选择
			mediaType:["image"],
			count:9,
			success(res) {
				let paths=res.tempFiles
				paths=paths.map(item=>{
					return item.tempFilePath
				})
				// 跳转
				uni.navigateTo({
					url:`/pages/workroom/other_page/public_moment/public_moment?paths=${JSON.stringify(paths)}`,
					events:{
						loadData(){
							moment.splice(0,moment.length)
							reqs.skip = 0
							reqs.state = false
							get_moments()
						}
					}
				})
			}
		})
	}
	function publish_moment2(){
		if(uni.current_this.check_login_state()){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
			return
		}
		uni.chooseMedia({
			count:1,
			mediaType:['video'],
			// count:9默认为9
			success(res) {
				let paths=res.tempFiles[0]
				if((paths.size/1024/1024)>=200){
					uni.showToast({
						title:'上传视频大小必须小于200Mb',
						icon:'none'
					})
					return
				}
				// 跳转
				uni.navigateTo({
					url:`/pages/workroom/other_page/public_moment/public_moment_v?path=${JSON.stringify(paths)}`,
					events:{
						loadData(){
							moment.splice(0,moment.length)
							reqs.skip = 0
							reqs.state = false
							get_moments()
						}
					}
				})
			},
			fail(e) {
				uni.showToast({
					title:'上传视频大小必须小于200Mb',
					icon:'none'
				})
			}
		})
	}
	function check_pict(path,index){
				uni.previewImage({
					urls:path,
					current:index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
					}
				});
	}
	function detail(uuid){
		uni.navigateTo({
			// url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
			url:'/pages/workroom/view/view?uuid=' + uuid
		})
	}
	function lower(){
		if(reqs.state){
			return
		}
		get_moments()
	}
	function get_moments(){
		uni.showLoading({
			title:'加载中',
			mask:true
		})
		reqs.state=true
		uni.request({
			url:uni.current_this.baseURL+':5001/get_community_moments',
			method:'GET',
			data:{
				skip:reqs.skip
			},
			success(res) {
				if(uni.current_this.check_res_state(res))
					return
					if(res.data.data.length <=0){
						content.value = '已经滑到底部了'
						uni.showToast({
							title:'没有更多了'
						})
						uni.hideLoading()
						return
					}
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
					// uni.current_this.store.state.moments.push(...res.data.data)
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
	function upper(){
		if(reqs.state){
			return
		}
		uni.showLoading({
			title:'加载中',
			mask:true
		})
		reqs.state=true
			uni.request({
				url:uni.current_this.baseURL+':5001/get_new_community_moments',
				method:'POST',
				data:{
					uuid:moment[0].uuid
				},
				success(res) {
					if(uni.current_this.check_res_state(res))
						return
					if(res.data.data.length<=0){
						content.value = '已经滑到底部了'
						uni.showToast({
							title:'没有更多了'
						})
						uni.hideLoading()
						return
					}
					res.data.data.forEach(item=>{
						item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
					})
					moment.unshift(...res.data.data)
				},
				complete() {
					setTimeout(()=>{
						reqs.state=false
					},1000)
					uni.hideLoading()
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
	const toggleSearchPage = () => {
		uni.navigateTo({
			url:'/pages/workroom/other_page/search_moment/search_moment'
		})
	}
	const content = ref('下滑加载更多')
    return{content,back,show_add,moment,reqs,user_info,upper,publish_moment2,publish_moment,get_moments,reqs,check_pict,detail,lower,hotList,toggleSearchPage}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
