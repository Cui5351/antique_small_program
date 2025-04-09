<template>
  <view class="container">
      <view v-for="item in stores" :key="item.id" class="store" @click="enterStore(item)">
		  <swiper style="height: 380rpx;" autoplay circular indicator-dots>
			  <swiper-item v-for="i in item.carousel" :key="i.id">
				  <image :src="i.src" style="width: 100%;height: 100%"></image>
			  </swiper-item>
		  </swiper>
		  <view class="info">
			  <view class="avatar">
				  <image :src="item.src" mode="aspectFill"></image>
			  </view>
			  <view>{{ item.name }}</view>
			  <view> </view>
		  </view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import request from '@/request/request.js'
export default{
  name:'',
  onLoad(data) {
  	this.id = data.museumId
	console.log(this.id,'id');
	// GetMuseumBindStoreById
	uni.showLoading({
		title:'加载店铺中'
	})
	request.get("/Antique/GetMuseumBindStoreById",{
		id:this.id
	}).then(res => {
		console.log(res,'res');
		this.stores.push(...res)
	}).finally(() =>uni.hideLoading())
  },
  setup(){
	const id = ref(null)
	const stores = reactive([])
	const enterStore = (item) => {
			uni.navigateTo({
				url:'/pages/store/other_page/storeDetail/storeDetail?id=' + item.id
			})
	}
    return{ id, stores, enterStore}
  }
}
</script>

<style scoped lang='scss'>
.container{
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	overflow-y: auto;
	display: block;
}
.avatar{
	width: 100rpx;
	border-radius: 50%;
	overflow: hidden;
	height: 100rpx;
	margin-right: 20rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.store{
	background-color: white;
	border-radius: 30rpx;
	overflow: hidden;
	margin-bottom: 30rpx;
}
.info{
	padding: 10rpx 20rpx;
	display: flex;
	align-items: center;
}
</style>
