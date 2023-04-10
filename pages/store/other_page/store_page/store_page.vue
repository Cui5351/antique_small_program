<template>
  <view class="head_two" @click="back">
	<uni-icons type="left"></uni-icons>非遗集市
  </view>
  <view class="container">
	<view class="store_info">
		<!-- <view class="store_name"> -->
			<!-- <view></view> -->
			<!-- 小七的店</view> -->
		<view class="picture">
			<swiper class="swi" circular indicator-dots indicator-active-color="white">
				<swiper-item v-for="(item,index) in [1,2,3]" :key="index">
					<view class="pic">
						<image src="https://www.mynameisczy.asia/image/antique/fan.jpg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="description flex_j_a_r">
			<view class="des flex_j_a_c">
				<view class="money">￥777</view>
				<view>
					山城记忆夏布团扇 非遗夏布+竹 手绘 每
					件独品
				</view>
			</view>
			<button open-type="share" plain class="three_size flex_j_a_c share">
			<!-- <view class="three_size flex_j_a_c"> -->
				<uni-icons type="redo" style='height:30px;' size="20"></uni-icons>分享
			<!-- </view> -->
			</button>
		</view>
		<view class="rank flex_j_a_r">
			<view class="tit two_size">排行榜</view>
			<view class="flex_j_a_r three_size">店铺商品热榜第
				<view style="color:#6E79E2">
					7
				</view>
			名</view>
		</view>
		<view class="transport flex_j_a_r three_size">
			<view class="flex_j_a_r" style="color: gray;">运费
			<view class="money" style="color: black;">￥7.00</view>
			</view>
			<view style="color: gray;">已售17 | 剩余17</view>
		</view>
		<view class="bought_person_count flex_j_a_c">
			<view class="tit">
				<view class="">7人已购买</view>
				<view class="small_title">查看全部
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="all flex_j_a_c three_size">
				<view class="user"  v-for="(item,index) in [1,2]" :key="index">
					<view class="flex_j_a_r">
						<view class="avatar">
							<image src="../../../../static/background.jpg" mode=""></image>
						</view>
						哈***哈
					</view>
					<view class="right three_size flex_j_a_r ">
						<view>3月17日买了1件</view>
						<view class="go_buy">去下单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="comment">comment</view>
		<view class="store_other">store_other</view>
		
	</view>
  </view>
  <view class="bottom flex_j_a_r">
	  <view class="other flex_j_a_r">
			<view class="flex_j_a_c"  @click="show_all">
				<view class="pic">
					<image src="/static/store_page/info_server.svg"  style="background-color: white;" mode=""></image>
				</view>
					客服
			</view>
			<view class="flex_j_a_c"   @click="show_all">
				<view class="pic">
					<image style="background-color: white;" src="/static/store_page/store.svg" mode=""></image>
				</view>
				店铺</view>
			<view class="flex_j_a_c"  @click="show_all">
				<view class="pic">
					<image style="background-color: white;" src="/static/store_page/shop_car.svg" mode=""></image>
				</view>
				购物车</view>
	  </view>
	  <view class="btn flex_j_a_r three_size">
	  	<view class="flex_j_a_r background1" @click="join_car">加入购物车</view>
	  	<view class="flex_j_a_r" @click="show_all">查看全部</view>
	  </view>
	</view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  onload(res){
	console.log(res,'res');  
  },
  onShareAppMessage(res) {
      return {
  		imageUrl:this.info.pic[0],
          title: this.info.name, //分享的名称
          path: `/pages/store/other_page/store_page/store_page`,
  		// desc:this.data.description[0].substring(0,15)+'...'
          // mpId:'' //此处配置微信小程序的AppId
      }
  },
  //分享到朋友圈
  onShareTimeline() {
      return {
  		imageUrl:this.info.pic[0],
  		title: this.info.name, //分享的名称
          type: 0,
      }
  },
  setup(){
	let info=reactive({
		pic:['https://www.mynameisczy.asia/image/antique/fan.jpg'],
		name:'团扇'
	})
	let back=uni.current_this.back
	function join_car(){
		uni.showToast({
			title:'暂未开放',
			icon:'none'
		})
	}
	function show_all(){
		uni.showToast({
			title:'暂未开放',
			icon:'none'
		})
	}
    return{back,info,join_car,show_all}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
