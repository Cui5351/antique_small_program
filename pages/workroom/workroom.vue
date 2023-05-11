<template>
  <view class="containe">
      <view class="head">
      	<view class="pic">
			<image src="/static/community_hot_search.svg" mode=""></image>
		</view>
      	<view class="tit">
			热搜卫星,搜寻你期待的热点
			<view class="flex_j_a_r" @click="publish_moment">
				<uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			</view>
		</view>
      </view>
	  <view class="hot">
		  <view v-for="(item,index) in ['传承非遗','工匠精神','习总书记说非遗','来自非遗工作室的秘密','非遗元宇宙','和我们一起畅游非遗吧']" :key="index" class="font_color">{{index+1}}.{{item}}<view>热</view>
		  </view>
	  </view>
	  <view class="passage">
		<view  v-for="(item,index) in moment" :key="index">
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
				<image :src="item" v-for="(item,index) in item.src" :key="index" mode="aspectFill"></image>
			</view>
			<view class="other flex_j_a_r">
				<view class="flex_j_a_r">
					<uni-icons type="heart" size="25"></uni-icons>0
					<uni-icons type="star" size="25"></uni-icons>0
					<uni-icons type="chat" size="25"></uni-icons>0
					<uni-icons type="paperplane" size="25"></uni-icons>0
				</view>
				<view class="time">{{item.send_date}}</view>
			</view>
		</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive,computed} from 'vue'
export default{
  mounted() {
  	let that=this
	uni.showLoading({
		title:'加载中',
		mask:true
	})
	uni.request({
		url:uni.current_this.baseURL+':5001/get_community_moments',
		method:'GET',
		data:{
			skip:0
		},
		success(res) {
			if(uni.current_this.check_res_state(res))
				return
				res.data.data.forEach(item=>{
					item.send_date=uni.current_this.dateformat(new Date(item.send_date))
				})
				uni.current_this.store.state.moments.push(...res.data.data.reverse())
		},complete() {
			uni.hideLoading()
		}
	})
  },
  setup(){
	let moment=computed(()=>uni.current_this.store.getters.moments)
	let back=uni.current_this.back
	function publish_moment(){
		if(uni.current_this.check_login_state()){
			uni.showToast({
				title:'清先登录',
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
    return{back,moment,publish_moment}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
