<template>
  <view class="container2">
	  <view class="form-item" @click="chooseLocation">
	    <view class="label" style="margin-bottom: 20rpx;">
	  	  <view class="highLight">*</view>
	  	  收货地址
	  	  </view>
	    <view class="address-item" style="margin-left: 15rpx;border-bottom: 1px solid rgba(0,0,0,.1);color: rgba(0,0,0,.5);">
	  	<uni-icons size="25" type="location" style="margin-right: 10rpx;"></uni-icons>
	  	<view class="address" v-if="Address.tel.trim().length > 0">
	  		<view>{{ Address.realName }} {{ Address.tel }}</view>
	  		<view>{{Address.address}}</view>
	  	</view>
	  	<view v-else>{{ Address.address}}</view>
	  	<uni-icons type="right"></uni-icons>
	    </view>
	  </view>
      <view class="order-details">
      				<view class="pics flex_j_a_r grows" v-for="(item,index) in list" :key="list.id">
      					<view class="pic flex_j_a_r">
      						<image :src="item.url" mode='aspectFill'></image>
      					</view>
      					<view class="info flex_j_a_c grows">
      						<view>
      							<view class="flex_j_a_r two_size">
      								<view class="name">{{item.name}}</view>
      							</view>
								<view style="color: red;text-align: start;">¥ {{item.money.toFixed(2)}}</view>
								<view class="done_pay" style="text-align: start;">
									运输费：¥ {{item.transport_money.toFixed(2)}}
								</view>
								<view class="goods-count">
								   <text class="minus" :style="{background:item.count == 1 ? 'rgba(0,0,0,.1);':''}" @click="updateCount(item,index,-1)">-</text>
								   <text class="count">{{ item.count }}</text>
								   <text class="plus" @click="updateCount(item,index,1)">+</text>
								 </view>
      							<view>
      								<!-- <view class="count"> -->
      									<!-- <uni-icons color="gray" style='margin-right:-5px;' type="closeempty"></uni-icons> -->
      									<!-- × -->
      									<!-- {{item.count}}</view> -->
      							<!-- 	<view class="b three_size" style="margin: 10rpx 0;">
      									<view>如假包换</view>
      								</view> -->
      								<!-- <view class="send_time flex_j_a_c" v-if='state==1'>在{{item.date}}前发货</view> -->
      								
      							</view>
      						</view>
      					</view>
      				</view>
        <!-- Total Amount -->
        <view class="total-amount">
          <text>共{{count}}件，合计：</text>
          <text class="price">¥{{balance}}</text>
        </view>
      </view>
	<view class="form-item" style="margin-bottom: 150rpx;color: rgba(0,0,0,.5);">
	  <view class="label2">下单须知</view>
	  <view class="label2"> ①:收货信息：请准确填写收货地址及联系方式，因信息错误导致商品无法送达或丢失，责任自负。</view>
	  <view class="label2"> ②:商品特性：非遗商品为手工制作，可能存在细微差异，不属质量问题</view>
	  <view class="label2"> ③:商品价格已明示，运费按标准收取，下单即视为接受价格构成</view>
	  <view class="label2"> ④:若非商品质量问题，退货需承担来回运费，且保持商品完整</view>
	  <view class="label2"> ⑤:因部分非遗商品制作工序复杂，发货时间可能稍有延迟，会在3个工作日内发出</view>
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
import {ref,reactive} from 'vue'
import request from '@/request/request.js'
export default{
  name:'',
	onLoad(res) {
		const list = JSON.parse(res.shops)
		console.log(list,'list');
		this.list.push(...list)
	},
	computed:{
		balance()  {
			// 遍历
			let result = 0
			this.list.forEach((item) => {
				if(item.isChecked){
					result += (item.money * item.count + item.transport_money)
				}
			})
			return result.toFixed(2)
		},
		count()  {
			// 遍历
			let result = 0
			this.list.forEach((item) => {
				if(item.isChecked){
					result += item.count
				}
			})
			return result
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
				},fail(err) {
					console.log(err,'err');
				}
			})
		}
	},
  setup(){
	const list = reactive([])
	const Address = reactive({
			realName:'',
			tel:'',
			address:'请选择下单地址',
	})
	const updateCount = (item,index,step) => {
	  const newCount = item.count + step
	  if(newCount > list[index].depository){
		  uni.showModal({
		  	title:'没有更多的库存了，亲!',
			showCancel:false
		  })
		  return
	  }
	  console.log(item.count);
	  if (newCount >= 1) {
	    item.count = newCount
	  }
	}
	const submitOrder = () => {
		if (!Address.address || Address.address == '请选择下单地址') {
		  uni.showToast({ title: '请选择下单地址', icon: 'none' })
		  return
		}
		// 传两个参数
		let data = [...list.map(item => ({
			...item,
			src:item.url,
			address:Address,
			openid:uni.current_this.store.getters.openid
		}))]
		console.log(data,'list');
		// 下单
		uni.showLoading({
			title:'下单中'
		})
		request.post("/StoreItem/ShopsOrder",{orders:data}).then(res => {
			uni.showToast({
				title:'下单成功',
				icon:'none'
			})
			uni.redirectTo({
				url:'/pages/person/other_page/bills/bills'
			})
		}).catch(err => {
			console.log(err,'fail');
		}).finally(()=>uni.hideLoading())
	}
    return{ list, Address, updateCount, submitOrder}
  }
}
</script>

<style scoped lang='scss'>
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
	.highLight{
		color: red;
		display: inline-block;
	}
	.total-amount{
		text-align: end;
		margin-top: 30rpx;
		padding-top: 20rpx;
		.price{
			color: red;
			font-size: 37rpx;
		}
	}
	.container2{
		height:100vh;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		overflow-y: auto;
	}
	.pics{
		border-bottom: 1px dashed rgba(0,0,0,.2);
		padding: 30rpx 0 30rpx 0;
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
						@include width(90%);
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
							color: #6E79E2;
							border:1px solid #6E79E2;
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
.order-details {
  background: #fff;
  margin-top: 20rpx;
  /* margin-bottom: 200rpx; */
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
.form-item {
  background: #fff;
  padding: 30rpx 20rpx;
  margin-top: 20rpx;
  border-radius: 12rpx;

  .label2 {
    margin-bottom: 10rpx;
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
.submit-btn {
  position: fixed;
  bottom: 40rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 100;
  height: 88rpx;
  line-height: 88rpx;
  background: rgb(95,78,86);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}
  .goods-count {
    display: flex;
	justify-content: flex-end;
    align-items: center;
	margin-top: 10rpx;
    text {
      width: 50rpx;
	  background-color: rgb(95,78,86);
	  color: white;
      height: 50rpx;
      line-height: 50rpx;
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
</style>
