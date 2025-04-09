<template>
  <view class="container font_color">
	  <scroll-view class="scrollView" scroll-y @scrolltolower="loadData">
		<view class="scroll">
			<view class="store flex_j_a_c grows" v-for="(item,index) in shops" :key="index" @click.stop="Detail(item)">
				<view class="flex_j_a_r" style="padding: 20rpx;" @click.stop="innerStore(item.store_id)">
					<view style="font-weight:bold;">{{item.store}}
					<uni-icons type="right" color="gray"></uni-icons>
					</view>
				</view>
				<view class="pics flex_j_a_r grows" style="align-items: flex-start;margin-top: 15rpx;">
					<view class="pic flex_j_a_r">
						<image :src="item.url" mode='aspectFill'></image>
					</view>
					<view class="info flex_j_a_c grows">
						<view>
							<view class="flex_j_a_r two_size">
								<view class="name">{{item.name}}</view>
								<!-- <view>¥ {{item.money.toFixed(2)}}</view> -->
							</view>
							<view>
								<view class="count">
									{{item.description.length >= 25 ? item.description.substring(0,25) + '...' :item.description}}</view>
								<view class="b three_size" style="margin: 10rpx 0;">
									<view>如假包换</view>
								</view>
								<!-- <view class="send_time flex_j_a_c" v-if='state==1'>在{{item.date}}前发货</view> -->
								<view class="done_pay" style="text-align: end;">
									运输费：
									¥ {{item.transport_money.toFixed(2)}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="money" style="padding: 20rpx 30rpx;display: flex;justify-content: space-between;" @click.stop="check(item)">
					<view>
						<radio-group>
							<radio :value="item.id" color="rgb(95,78,86)" :checked="item.isChecked"></radio>
						</radio-group>
						<!-- <label> -->
							<!-- <checkbox :value="item.id"  /><text></text> -->
						<!-- </label> -->
					</view>
					<view>
					价格
					<text style="color: red;">
						¥ {{item.money.toFixed(2)}}
					</text>
					</view>
					</view>
			</view>
		</view>
	  </scroll-view>
	  <view class="button">
		  <view style="display: flex;gap: 40rpx;align-items: center;">
			  <view>
			  合计
			  <text style="color: red;font-size: 35rpx;">
			  	¥{{balance}}
			  </text>
			  </view>
			  <text style="color: rgba(0,0,0,.5);">已选择{{count}}件</text>
		  </view>
		  <view class="pay" @click="pay" :style="{background:count <= 0 ? 'rgba(255,165,0,.7)' :'orange'}">去结算</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import request from '@/request/request.js'
export default{
  name:'',
  mounted() {
  	this.loadData()
  },
  computed:{
	balance()  {
		// 遍历
		let result = 0
		this.shops.forEach((item) => {
			if(item.isChecked){
				result += (item.money + item.transport_money)
			}
		})
		return result.toFixed(2)
	},
	count()  {
		// 遍历
		let result = 0
		this.shops.forEach((item) => {
			if(item.isChecked){
				result ++
			}
		})
		return result
	}
  },
  methods:{
	loadData()  {
		// GetMyShops
		uni.showLoading({
			title:'加载购物车中'
		})
		request.get("/StoreItem/GetMyShops",{
			...this.page,
			openid:uni.current_this.store.getters.openid
		}).then(res => {
			if(res.list.length <= 0){
				uni.showToast({
					title:'没有更多了',
					icon:'none'
				})
				return
			}
			this.shops.push(...res.list.map(item => ({...item,isChecked:false,count:1})))
			this.page.page ++
		}).catch(() => {
			console.log('err');
		}).finally(() => uni.hideLoading())
	},
	pay(){
		if(this.count <= 0)
			return
		const list = []
		// 把选中的数据都拿过去
		this.shops.forEach((item) => {
			if(item.isChecked)
				list.push(item)
		})
		uni.navigateTo({
			url:`/pages/person/other_page/shops/order/order?shops=${JSON.stringify(list)}`
		})
	}
  },
  setup(){
	const page = reactive({
		page:1,
		pageSize:10
	})
	const shops = reactive([])
	const Detail = (item) => {
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${item.id}`
		})
	}
	const innerStore = (id) => {
		uni.navigateTo({
			url:'/pages/store/other_page/storeDetail/storeDetail?id=' + id
		})
	}
	const check = (item) => {
		item.isChecked = !item.isChecked
	}
    return{ page, shops, Detail, innerStore, check}
  }
}
</script>

<style scoped lang='scss'>
	@import '@/uni.scss';
.scrollView{
	height: 90vh;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.button{
	height: 10vh;
	background: white;
	display: flex;
	justify-content: space-between;
	padding: 0 30rpx;
	box-sizing: border-box;
	align-items: center;
	.pay{
		padding: 15rpx 25rpx;
		font-size: 35rpx;
		background-color: orange;
		color: white;
		border-radius: 40rpx;
	}
}
.scroll{
	padding: 20rpx 0;
}
		.store{
			width:100%;
			border-radius:10px;
			margin-top:10px;
			background-color: white;
			padding:5px 20rpx;
			box-sizing: border-box;
			/* // @include height(270px); */
			/* min-height: 520rpx; */
			&>view{
				width:100%;
			}
			&>view:first-child{
				justify-content: space-between;
				/* @include height(15%); */
				.title{
					color: #6E79E2;
				}
			}
			&>.pics{
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
								/* text-align: end; */
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
					.money{
						/* @include height(20%); */
						display: flex;
						padding: 20rpx 0;
						justify-content: flex-end;
						align-items: center;
					}
				}
			}
			&>.btns{
				@include height(13%);
				margin:10rpx 0;
				justify-content: space-between;
				&>view{
					height:100%;
					width:100%;
					justify-content: space-around;
					&>view{
						width: 150rpx;
						text-align: center;
						margin-right: 10px;
						&:active{
							background-color: rgba(0,0,0,.1);
							color: white;
						}
						border:1px solid rgba(0,0,0,.1);
						border-radius:10px;
						    padding: 10rpx 15rpx;
						// box-sizing: border-box;
					}
				}
			}
		}
</style>
