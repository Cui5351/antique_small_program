<template>
	<view class="flex_j_a_r pub" @click="publish_moment">
		<uni-icons type="plusempty" size="25" color="white"></uni-icons>
	</view>
  <scroll-view scroll-y="true" class="c" @scrolltolower="lower" lower-threshold="20">
	  <view  class="containe">
	<!-- <view class="show_head head_tit">非遗社区</view> -->
      <view class="head">
      	<view class="pic">
			<image src="/static/community_hot_search.svg" mode=""></image>
		</view>
      </view>
      	<view class="tit1">
			<input type="text" placeholder="热搜1卫星,搜寻你期待的热点...">
			<!-- <view class="flex_j_a_r" @click="publish_moment">
				<uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			</view> -->
		</view>
	  <view class="hot">
		  <view v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙','和我们一起畅游非遗吧']" :key="index" class="font_color">{{index+1}}.{{item}}<view>热</view>
		  </view>
	  </view>
	  <view class="passage">
		<view  v-for="(item,index) in moment" :key="index" @click="detail(item)">
			<view class="person">
				<view class="avatar">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view>
					<view>{{item.name}}</view>
					<view style="color: gray;font-size: 13px;">{{item.place}}</view>
				</view>
			</view>
			<view class="content">{{item.content}}</view>
			<view class="pic" v-if="item.src[0]!=null">
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
  	onPullDownRefresh() {
  		console.log('refresh');
		// 拿到最新的数据
  		setTimeout(function () {
  			uni.stopPullDownRefresh();
  		}, 1000);
  	},
	onReachBottom() {
		console.log('bottom');
	},
  setup(){
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
	function detail(item){
		uni.navigateTo({
			url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
		})
	}
	function show_head(e){
		console.log(e.detail.scrollTop);
	}
	function lower(){
		if(reqs.state){
			console.log(reqs);
			return
		}
		get_moments()
		console.log('load more than');
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
						item.send_date=uni.current_this.dateformat_accuracy(new Date(item.send_date))
					})
					uni.current_this.store.state.moments.push(...res.data.data)
					reqs.skip+=res.data.data.length
			},complete() {
				reqs.state=false
				console.log(reqs,'complete');
				uni.hideLoading()
			}
		})
	}
    return{back,moment,publish_moment,get_moments,reqs,check_pict,detail,show_head,lower}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
