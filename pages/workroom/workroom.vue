<template>
	<view class="flex_j_a_r pub" @click="show_add=true">
		<view class='ad flex_j_a_c'>
			<uni-icons type="plusempty" size="25" color="white"></uni-icons>
		</view>
		<view :class="show_add?'add show_add flex_j_a_c':'add flex_j_a_c'">
		</view>
		<view :class="show_add?'add show_add2 flex_j_a_c':'add flex_j_a_c'" @click.prevent="publish_moment">
			<uni-icons type="chatbubble-filled" size="25"></uni-icons>
		</view>
		<view :class="show_add?'add show_add3 flex_j_a_c':'add flex_j_a_c'"  @click.prevent="publish_moment2">
			<uni-icons type="videocam-filled" size='25'></uni-icons>
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
			<input type="text" placeholder="热搜卫星,搜寻你期待的热点...">
			<!-- <view class="flex_j_a_r" @click="publish_moment">
				<uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			</view> -->
		</view>
	  <view class="hot">
		  <view v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙','和我们一起畅游非遗吧']" :key="index" class="font_color">{{index+1}}.{{item}}<view>热</view>
		  </view>
	  </view>
	  <view class="passage">
		<view  v-for="(item,index) in moment" :key="index"  @click="detail(item)">
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
				{{item.content}}
				</text>
			</view>
			<view class="pic" v-if="item.type=='v'">
				<video :src="item.src" :poster="item.mask" @click.prevent="()=>{}"></video>
			</view>
			<view class="pic" v-if="item.src[0]!=null&&item.type=='p'" >
				<image @click.prevent="check_pict(item.src,index)" :src="item2" v-for="(item2,index) in item.src" :key="index" mode="aspectFill"></image>
			</view>
			<view class="other flex_j_a_r">
				<view class="flex_j_a_r">
					<uni-icons type="heart" size="25"></uni-icons>0
					<uni-icons type="eye" size="25"></uni-icons>{{item.browse}}
					<uni-icons type="chat" size="25"></uni-icons>{{item.moment_count}}
					<uni-icons type="paperplane" size="25"></uni-icons>0
				</view>
				<view class="time">{{item.send_date}}</view>
			</view>
		</view>
	  </view>
	  <view class="bottom">已经滑到底部了</view>
	  </view>
  </scroll-view>
</template>

<script>
import {ref,reactive,computed} from 'vue'
export default{
  mounted() {
	uni.showLoading({
		title:'加载中',
		mask:true
	})
	this.get_moments()
  },
  setup(){
	  let show_add=ref(false)
	let reqs=reactive({
		state:false,
		skip:0,
	})
	let moment=computed(()=>uni.current_this.store.getters.moments)
	let back=uni.current_this.back
	function publish_moment(){
		if(uni.current_this.check_login_state()){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
			return
		}
		uni.chooseImage({
			// count:9默认为9
			success(res) {
				let paths=res.tempFilePaths
				// 跳转
				uni.navigateTo({
					url:`/pages/workroom/other_page/public_moment/public_moment?paths=${JSON.stringify(paths)}`
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
					url:`/pages/workroom/other_page/public_moment/public_moment_v?path=${JSON.stringify(paths)}`
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
	function detail(item){
		uni.navigateTo({
			url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
		})
	}
	function lower(){
		if(reqs.state){
			return
		}
		get_moments()
	}
	function get_moments(){
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
					res.data.data.forEach(item=>{
						if(item.src[0]){
							if(item.src[0].substring(item.src[0].length-3)=='mp4')
								item.type='v'
							else
								item.type='p'
						}
						item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
					})
					console.log(res.data);
					uni.current_this.store.state.moments.push(...res.data.data)
					reqs.skip+=res.data.data.length
			},complete() {
				setTimeout(()=>{
					reqs.state=false
				},1000)
				uni.hideLoading()
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
					uuid:uni.current_this.store.state.moments[0].uuid
				},
				success(res) {
					if(uni.current_this.check_res_state(res))
						return
					if(res.data.data.length<=0){
						uni.showToast({
							title:'没有更多了'
						})
						return
					}
					res.data.data.forEach(item=>{
						item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
					})
					uni.current_this.store.state.moments.unshift(...res.data.data)
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
		// if(item.openid==uni.current_this.store.getters.openid){
		// 	uni.switchTab({
		// 		url:'/pages/person/person'
		// 	})
		// 	return
		// }
		uni.navigateTo({
			url:`/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
				avatar:item.avatar,
				name:item.name,
				openid:item.openid
			})}`
		})
	}
    return{back,show_add,moment,user_info,upper,publish_moment2,publish_moment,get_moments,reqs,check_pict,detail,lower}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
