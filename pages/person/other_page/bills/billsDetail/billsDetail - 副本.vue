<template>
  <view class="containerA">
    <!-- Header Section -->
    <view class="header">
		<view style="display: flex;align-items: center;justify-content: space-between;width: 60%;transform: translateX(-30%);margin-bottom: 20rpx;">
			<view @click="back">
				<uni-icons type="left" color="white" size="30"></uni-icons>
			</view>
			<view class="status-text">订单详情</view>
		</view>
		<!-- <text class="status-text">订单已完成</text> -->
        <text class="sub-text">{{orderInfo.state2}}</text>
    </view>

    <!-- Restaurant Info -->
    <view class="restaurant-info" @click="innerStore">
      <view class="restaurant-name">
		  <image :src="orderInfo.avatar_src" mode=""></image>
      </view>
      <view class="restaurant-address" style="max-width: 40%;">
        {{orderInfo.store}}
      </view>
	  <view class="restaurant-address" style="color: rgba(0,0,0,.5);">
	    进店看看
	  </view>
    </view>

    <!-- Order Details -->
    <view class="order-details">
      <view class="order-item">
        <image class="item-image" :src="orderInfo.src" mode="aspectFill"></image>
        <view class="item-info">
          <view class="item-name" style="margin-bottom: 10rpx;">{{orderInfo.name}}</view>
          <!-- <view class="item-desc">温热/三分糖</view> -->
          <view class="item-quantity" style="margin-bottom: 10rpx;">x {{orderInfo.count}}</view>
        <text class="item-price" style="margin-bottom: 10rpx;">¥ {{orderInfo.money}}</text>
        </view>
      </view>
      <view class="total-amount">
        <text>运输费</text>
        <text class="price">¥ {{orderInfo.transport_money}}</text>
      </view>
      <!-- Total Amount -->
      <view class="total-amount">
        <text>共{{orderInfo.count}}件，合计</text>
        <text class="price">¥ {{(orderInfo.transport_money + orderInfo.money * orderInfo.count)}}</text>
      </view>
    </view>
	<view class="order-info">
		<view class="info">
			<view class="title">订单单号：</view>
			<view>{{orderInfo.uuid}}</view>
		</view>
		<view class="info">
			<view class="title">下单时间：</view>
			<view>{{orderInfo.date}}</view>
		</view>
		<view class="info">
			<view class="title">收货人：</view>
			<view>{{orderInfo.realName}}</view>
		</view>
		<view class="info">
			<view class="title">收货人电话：</view>
			<view>{{orderInfo.tel}}</view>
		</view>
		<view class="info">
			<view class="title">收货人地址：</view>
			<view>{{orderInfo.address}}</view>
		</view>
	</view>

    <!-- Bottom Button -->
    <view class="bottom-btn">
      <button class="reorder-btn" @click="again_bought">再来一单</button>
    </view>
  </view>
</template>

<script>
import { ref, reactive } from 'vue'
import request from '@/request/request.js'
export default {
  name: 'BillsDetail',
  onLoad(res) {
	  const uuid = res.uuid
	  uni.showLoading({
	  	title:'加载订单中'
	  })
  	request.get('/StoreItem/GetBuyGoodsAll',{
		      uuid:uuid,
		      page:1,
		      pageSize:1,
	}).then(res => {
		console.log(res,'res');
		const list = res.list
		if(list.length <= 0){
			uni.showToast({
			title:'加载失败',
			icon:'none'
			})
			return
		}
		Object.keys(this.orderInfo).forEach(item => {
			this.orderInfo[item] = list[0][item]
		})
		
		uni.hideLoading()
	}).catch(() => {
		uni.showToast({
			title:'加载失败',
			icon:'none'
		})
	})
  },
  setup() {
    const orderInfo = reactive({
		address: "",
		avatar_src: "",
		count: 1,
		date: "",
		id: 0,
		goods_id:0,
		money: 0,
		name: "",
		realName: "",
		src: "",
		state2: "",
		store: "",
		tel: "",
		transport_money: 9,
		user: "",
		uuid: "",
    })
	const innerStore = () => {
		uni.navigateTo({
			url:'/pages/store/other_page/storeDetail/storeDetail?name=' + orderInfo.store
		})
	}
	const back = () => {
		uni.navigateBack()
	}
	function again_bought(){
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${orderInfo.goods_id}`
		})
	}
    return {
		again_bought,
      orderInfo,
	  back,
	  innerStore
    }
  }
}
</script>

<style scoped lang="scss">
.containerA {
  background-color: #f5f5f5;
  height: 100vh;
  overflow-y: auto;
}
.item-info{
	text-align: end;
	color: rgba(0,0,0,.5);
	.item-name{
		font-size: 35rpx;
		color: black;
	}
}
.total-amount{
	text-align: end;
	margin: 20rpx 0;
}
.restaurant-info{
	padding: 20rpx;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.restaurant-name{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
.header {
  background: linear-gradient(to right, #ff6b6b, #ff8e8e);
  padding: 50rpx 30rpx;
  padding-top: 120rpx;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .status-text {
    font-size: 36rpx;
    font-weight: bold;
  }
  
  .sub-text {
    font-size: 40rpx;
    margin: 50rpx 0;
  }
}
.order-info{
	margin: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: white;
	border-radius: 12rpx;
	.info{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.title{
			min-width: fit-content;
			color: rgba(0,0,0,.5);
		}
	}
}
.promo-section {
  background: #fff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 12rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-details {
  background: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
  
  .order-item {
    display: flex;
    align-items: center;
	justify-content: space-between;
    padding: 20rpx 0;
    
    .item-image {
      width: 200rpx;
	  border-radius: 10rpx;
      height: 200rpx;
      margin-right: 20rpx;
    }
  }
}

.bottom-btn {
  position: fixed;
  bottom: 40rpx;
  width: 100%;
  display: flex;
  justify-content: center;
  
  .reorder-btn {
    background: #ff6b6b;
    color: #fff;
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
  }
}
</style>