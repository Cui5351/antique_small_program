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
    <view class="restaurant-info">
		<view style="display: flex;align-items: center;gap: 30rpx;width: 70%;" @click="innerStore">
      <view class="restaurant-name">
		  <image :src="orderInfo.avatar_src" mode="aspectFill"></image>
      </view>
      <view class="restaurant-address" style="max-width: 70%;">
        {{orderInfo.store}}
      </view>
	  </view>
	  <view class="restaurant-address" style="color: rgba(0,0,0,.5);" @click="relation">
		  <uni-icons size="25" type="phone"></uni-icons>
	  </view>
    </view>

    <!-- Order Details -->
    <view class="order-details">
					<view class="pics flex_j_a_r grows">
						<view class="pic flex_j_a_r">
							<image :src="orderInfo.src" mode='aspectFill'></image>
						</view>
						<view class="info flex_j_a_c grows">
							<view>
								<view class="flex_j_a_r two_size">
									<view class="name">{{orderInfo.name}}</view>
									<view>¥ {{orderInfo.money.toFixed(2)}}</view>
								</view>
								<view>
									<view class="count">
										<!-- <uni-icons color="gray" style='margin-right:-5px;' type="closeempty"></uni-icons> -->
										×
										{{orderInfo.count}}</view>
									<view class="b three_size" style="margin: 10rpx 0;">
										<view>如假包换</view>
									</view>
									<!-- <view class="send_time flex_j_a_c" v-if='state==1'>在{{item.date}}前发货</view> -->
									<view class="done_pay" style="text-align: end;">
										运输费：¥ {{orderInfo.transport_money.toFixed(2)}}
									</view>
								</view>
							</view>
						</view>
					</view>
      <!-- Total Amount -->
      <view class="total-amount">
        <text>共{{orderInfo.count}}件，合计：</text>
        <text class="price">¥ {{(orderInfo.transport_money + orderInfo.money * orderInfo.count).toFixed(2)}}</text>
      </view>
    </view>
	<view class="order-info">
		<view class="info">
			<view class="title">订单单号：</view>
			<view>{{orderInfo.uuid}}
			<text @click="copy" style="color: rgb(95,78,86);margin-left: 5rpx;">复制</text>
			</view>
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
	  	title:'加载订单中',
		mask:true
	  })
  	request.get('/StoreItem/GetGoodsBills',{
		      uuid:uuid,
			  openid:uni.current_this.store.getters.openid
	}).then(res => {
		Object.keys(this.orderInfo).forEach(item => {
			this.orderInfo[item] = res[item]
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
		store_id:'',
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
		storeTel:""
    })
	const innerStore = () => {
		uni.navigateTo({
			url:'/pages/store/other_page/storeDetail/storeDetail?id=' + orderInfo.store_id
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
	const copy = () => {
		uni.setClipboardData({
			data:orderInfo.uuid,
			success() {
				uni.showToast({
					title:'复制成功',
					icon:'none'
				})
			}
		})
	}
	const relation = () => {
		uni.makePhoneCall({
			phoneNumber:orderInfo.storeTel
		})
	}
    return {
		again_bought,
      orderInfo,
	  back,
	  innerStore,
	  copy,
	  relation
    }
  }
}
</script>

<style scoped lang="scss">
	.pics{
		&>view{
			width:100%;
			height:70%;
		}
		&>.pic{
			@include width(35%);
			height: 200rpx;
			align-items: flex-start;
			image{
				border-radius:10px;
				width:90%;
				height:100%;
			}
		}
		&>.info{
			padding:5px;
			box-sizing: border-box;
			&>view{
				width:100%;
			}
			&>view:first-child{
				// background-color: red;
				&>view:first-child{
					justify-content: space-between;
					.name{
						@include width(50%);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				&>view:last-child{
					&>.count{
						width:100%;
						text-align: end;
						color: gray;
					}
					&>.send_time{
						padding:5px 10px;
						box-sizing: border-box;
						border-radius:10px;
						margin-top:25px;
						background-color: rgba(0,0,0,.05);
					}
					&>.b{
						display: flex;
						view{
							padding: 2px;
							color: orangered;
							border:1px solid orangered;
						}
					}
				}
			}
			&>.money{
				@include height(20%);
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}
	}
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
	border-top: 1px dashed rgba(0,0,0,.2);
	text-align: end;
	margin-top: 50rpx;
	padding-top: 20rpx;
	.price{
		color: red;
	}
}
.restaurant-info{
	padding: 20rpx 40rpx;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
  background: linear-gradient(to right, #5f5b5d, #5f4e56);
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
    background: rgb(95,78,86);
    color: #fff;
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
  }
}
</style>