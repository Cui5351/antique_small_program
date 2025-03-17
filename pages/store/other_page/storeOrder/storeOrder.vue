<template>
  <view class="containerVessel">
    <!-- 商品信息 -->
    <view class="goods-info">
      <image class="goods-img" :src="goodsInfo.pic[0]" mode="aspectFill"></image>
      <view class="goods-detail">
        <view class="goods-name">{{ goodsInfo.name }}</view>
        <view class="goods-price">¥{{ goodsInfo.money }}元</view>
      </view>
     <view class="goods-count">
        <text class="minus" :style="{background:count == 1 ? 'rgba(0,0,0,.1);':''}" @click="updateCount(-1)">-</text>
        <text class="count">{{ count }}</text>
        <text class="plus" @click="updateCount(1)">+</text>
      </view>
    </view>
    <view class="form-item">
      <view class="label" style="margin-bottom: 20rpx;">
		  <view class="highLight">*</view>
		  收货地址
		  </view>
      <view class="address-item" @click="chooseLocation" style="margin-left: 15rpx;border-bottom: 1px solid rgba(0,0,0,.1);color: rgba(0,0,0,.5);">
		<uni-icons size="25" type="location" style="margin-right: 10rpx;"></uni-icons>
		<view class="address" v-if="Address.tel.trim().length > 0">
			<view>{{ Address.realName }} {{ Address.tel }}</view>
			<view>{{Address.address}}</view>
		</view>
		<view v-else>{{ Address.address}}</view>
		<uni-icons type="right"></uni-icons>
      </view>
    </view>
	<view class="form-item between">
		<view class="label">
			  <!-- <view class="highLight">*</view> -->
			  运输费
			</view>
		<view> ¥ {{ goodsInfo.transport_money.toFixed(2) }}元</view>
	</view>
	<view class="form-item" style="color: rgba(0,0,0,.5);">
		<view class="label">
			<view style="display: inline;color: black;">商品描述</view>
			：{{ goodsInfo.description }}</view>
	</view>
	<view class="form-item" style="margin-bottom: 150rpx;color: rgba(0,0,0,.5);">
	  <view class="label">下单须知</view>
	  <view class="label"> ①:员工接单超出5分钟后取消订单，则不退回预支付费用</view>
	  <view class="label"> ②:下单后会预支付20%的费用，支付成功后等待员工接单上门</view>
	  <view class="label"> ③:若您填写的房间平米数与实际不符合，结算时员工会修改最终金额</view>
	  <view class="label"> ④:若您填写的房间平米数与实际不符合，结算时员工会修改最终金额</view>
	</view>

    <!-- 提交按钮 -->
    <button class="submit-btn" @click="submitOrder">
	<text style="color: red;">
	￥{{balance}}
	</text>
		下单
	</button>
  </view>
</template>

<script>
import { ref, reactive } from 'vue'
import request from '@/request/request.js'
export default {
  name: 'Order',
  computed:{
	balance()  {
			  return (this.count * this.goodsInfo.money + this.goodsInfo.transport_money)?.toFixed(2)
	}
  },
  methods:{
	chooseLocation(type) {
		let that = this
		uni.chooseAddress({
			success(res) {
				that.Address.realName = res.userName
				that.Address.tel = res.telNumber
				that.Address.address = `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
				console.log(res,'res');
			}
		})
	}
  },
  onLoad(res) {
	  const goods = JSON.parse(res.info)
		Object.keys(this.goodsInfo).forEach(item => {
			this.goodsInfo[item] = goods[item]
		})
  },
  setup() {
    // 商品信息
    const goodsInfo = reactive({
		name:'',
		money:0,
		sale:0,
		depository:0,
		description:'',
		id:'',
		store:'',
		pic:[],
		uuid:'',
		transport_money:0
    })
	const Address = reactive({
			realName:'',
			tel:'',
			address:'请选择下单地址',
	})
    // 商品数量
    const count = ref(1)

    // 更新商品数量
    const updateCount = (step) => {
      const newCount = count.value + step
	  if(newCount > goodsInfo.depository){
		  uni.showModal({
		  	title:'没有更多的库存了，亲!',
			showCancel:false
		  })
		  return
	  }
      if (newCount >= 1) {
        count.value = newCount
      }
    }
    // 提交订单
    const submitOrder = async () => {
      if (!Address.address || Address.address == '请选择下单地址') {
        uni.showToast({ title: '请选择下单地址', icon: 'none' })
        return
      }
	  let data = {
		  address:Address,
		  ...goodsInfo,
		  openid:uni.current_this.store.getters.openid,
		  money:(count.value * goodsInfo.money + goodsInfo.transport_money)?.toFixed(2),
		  src:goodsInfo.pic[0],
		  count:count.value
	  }
	  console.log(data,'data');
	  uni.showLoading({
	  	title:'下单中'
	  })
	  request.post("/StoreItem/order",{
		  ...data
	  }).then(res => {
		  uni.showToast({
		  	title:'下单成功'
		  })
	  }).catch(err => {
		  
	  }).finally(() => {
		  uni.hideLoading()
		  uni.redirectTo({
			url:'/pages/person/other_page/bills/bills'
		  })
	  })
    }
	
    return {
      goodsInfo,
      count,
      updateCount,
      submitOrder,
	  Address
    }
  }
}
</script>

<style scoped lang="scss">
.containerVessel {
  height: 100vh;
  padding: 20rpx;
}

.highLight{
	color: red;
	display: inline-block;
}
.goods-info {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;

  .goods-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 8rpx;
  }

  .goods-detail {
    flex: 1;
    padding: 0 20rpx;

    .goods-name {
      font-size: 28rpx;
    }

    .goods-price {
      color: #ff4400;
      font-size: 32rpx;
      font-weight: bold;
      margin-top: 10rpx;
    }
  }

  .goods-count {
    display: flex;
    align-items: center;

    text {
      width: 60rpx;
	  background-color: #1989fa;
	  color: white;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
    }

    .minus, .plus {
		&:active{
			background: rgba(0,0,0,.1);
		}
      border-radius: 4rpx;
    }

    .count {
      margin: 0 20rpx;
    }
  }
}
.bottom-section {
	margin-bottom: 50rpx;
	transform: translateY(-90rpx);
  padding: 10rpx 30rpx;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10rpx;
  
  .delivery-options {
    .option {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
      border-bottom: 1px solid #eee;	
	  .Selected{
		color: red;  
	  }
	  .Selected2{
		  color: black;
	  }
	  .c{
		  color: rgba(0,0,0,.5);
	  }
	  .uni-input{
		  text-align: center;
	  }
    }
	.time{
		width:20vh;
		height: 40rpx;
	}
  }
  
}
.between{
	display: flex;
	justify-content: space-between;
}
.form-item {
  background: #fff;
  padding: 30rpx 20rpx;
  margin-top: 20rpx;
  border-radius: 12rpx;

  .label {
    // margin-bottom: 20rpx;
  }

  input, .picker-value {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
  }

.problem-desc {
  position: relative;
  margin-bottom: 30rpx;
  input{
	  background: #f5f5f5;
	  padding:0 20rpx;
	  border-radius: 10rpx;
	  box-sizing: border-box;
  }
  .desc-textarea {
    width: 94%;
    height: 200rpx;
    background: #f5f5f5;
    padding: 20rpx;
    border-radius: 10rpx;
  }
  
  .word-count {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    color: #999;
    font-size: 24rpx;
  }
}
}
  .upload-list {
    display: flex;
    flex-wrap: wrap;
	gap:30rpx;
    
    .upload-item {
      width: 150rpx;
      height: 150rpx;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      
      .plus {
        font-size: 60rpx;
        color: #999;
      }
    }
    
    .image-item {
      position: relative;
      width: 150rpx;
      height: 150rpx;
      margin-right: 20rpx;
      
      image {
        width: 100%;
        height: 100%;
      }
      
      .delete-btn {
        position: absolute;
        right: -10rpx;
        top: -10rpx;
        width: 40rpx;
        height: 40rpx;
        background: rgba(0,0,0,0.5);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
.upload-box {
      width: 150rpx;
      height: 150rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
  color: #999;
}

.preview-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
}

.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 100;
  height: 88rpx;
  line-height: 88rpx;
  background: #1989fa;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}

.address-item{
	min-height: 80rpx;
	line-height: 80rpx;
	display: flex;
    &>.address{
		display: flex;
		flex-direction: column;
		color: black;
		padding:10rpx 0;
		&>view{
			min-height: 50rpx;
			line-height: 50rpx;
			width: 40vh;
			overflow:hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	}
</style>