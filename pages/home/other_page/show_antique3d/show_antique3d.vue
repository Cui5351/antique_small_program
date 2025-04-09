<template>
  <view class="container">
	<image class="background_antique" src="/static/show_antique_background.svg" mode=""></image>
	<view class="head_two" style="background-color: rgba(0,0,0,0);z-index: 9999999;">
		<uni-icons type="left" size="25" color="rgb(200,200,186)" @click="back"></uni-icons>
	</view>
	<AICover :keytext="location + ',' + static_data[current].name + '文物解读'"></AICover>
	<swiper vertical="true" class="swiper" @change="changeSwiper" :circular="end">
		<swiper-item v-for="(item,index) in static_data" :key="index"  @click.stop="detail_info(item)">
			<view class="antique flex_j_a_c grows">
				<view class="born flex_j_a_c grows">
					<view class="bor" style="font-size: 30px;">{{item.product_date}}</view>
					<view class="tip flex_j_a_c">
						<view class="arrow">
							<uni-icons type="top" color="rgb(200,200,186)"></uni-icons>
						</view>
						<view style="font-size:15px;">
							上下滑动查看更多文物
						</view>
					</view>
				</view>
				<view class="pic .flex_j_a_c">
					<view class="anti">
						<image style="background-color: rgba(0,0,0,0)" :src="item.src" mode="aspectFill"></image>
						<!-- <view class="btn flex_j_a_r" @click="tip('3D')">
							3D<uni-icons type="right"></uni-icons>
						</view> -->
					</view>
				</view>
				<view class="name">
					<view class="flex_j_a_c">
						<!-- <view class="audio"  @click="tip('语音讲解')">
							语音讲解
						</view> -->
						<view class="name flex_j_a_r">
							{{item.name}}
						<!-- 	<view class="right ">
								<uni-icons type="right"></uni-icons>
							</view> -->
						</view>
						<view class="museum">
							<uni-icons color="background-color: rgba(0,0,0,0)" type="location"></uni-icons>
							{{location}}</view>
					</view>
				</view>
			</view>
		</swiper-item>
	</swiper>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import request from '@/request/request.js'
export default{
  name:'',
  onLoad(res) {
	  this.id = res.id
	  this.location = res.location
  	this.loadData()
  },
  setup(){
	  const id = ref(null)
	  let static_data=reactive([])
	  const page = ref(1)
	  const location = ref('')
	  const current = ref(0)
	  const end = ref(false)
	  const changeSwiper = (e) => {
		  console.log(e.detail.current,'value');
		  current.value = e.detail.current
		  if(current.value == static_data.length - 1){
			  if(end.value == true)
			  return
			  loadData()
		  }
		  // 加载新项
		  
	  }
	  
	  let loadData = () => {
		  uni.showLoading({
		  	title:'加载中'
		  })
		  request.get("/Antique/GetAntiqueCollect",{
		  	antique_id:id.value,
		  	page:page.value,
		  	pageSize:3
		  }).then(res => {
			  if(res.list.length <= 0){
				  end.value = true
				  uni.showToast({
				  	title:'已经没有更多了',
					icon:'none'
				  })
				  return
			  }
			  uni.hideLoading()
		  	static_data.push(...res.list)
			page.value += 1
		  	console.log(res,'res');
		  }).catch(err => {
			  // console.log();
			  uni.showToast({
			  	title:'加载失败',
			  	icon:'error'
			  })
		  })
		  .finally(() => {
			  // uni.hideLoading()
		  })
	  }
	  
	 function detail_info(item){
		 uni.navigateTo({
			url:`/pages/home/other_page/show_antique3d/antique/antique?data=${JSON.stringify(item)}`
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
    return{static_data,detail_info,back,tip,loadData,id,location,changeSwiper,end,current}
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
