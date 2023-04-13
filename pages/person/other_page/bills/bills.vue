<template>
  <view class="container">
	  <view class="head_two" @click="back">
	  	<uni-icons type="left"></uni-icons>
		订单列表
	  </view>
	  <view class="search flex_j_a_c">
			<view class="flex_j_a_r" @click="no_develop('搜索订单')">
				<uni-icons type="search" color='gray' style='margin-right: 5px;'></uni-icons>
				搜索订单
			</view>
	  </view>
	  <view class="content flex_j_a_c grows">
			<view class="title flex_j_a_r grows">
				<view :class="state==index?'hig':''" v-for="(item,index) in ['全部','待支付','待发货','待评价']" :key="index" @click="toggle_category(index)">{{item}}</view>
			</view>
			<view class="bill">
				<view class=".flex_j_a_r" style="color: gray;" v-if="stores[Object.keys(stores)[state]].length?false:true">暂无商品</view>
				<view class="store flex_j_a_c grows" v-for="(item,index) in stores[Object.keys(stores)[state]]" :key="index">
					<view class="flex_j_a_r">
						<view style="font-weight:bold;">店铺{{item.store_name}}
						<uni-icons type="right" color="gray"></uni-icons>
						</view>
						<view class="title one_size">交易成功</view>
					</view>
					<view class="pics flex_j_a_r grows">
						<view class="pic flex_j_a_r">
							<image :src="item.src" mode=""></image>
						</view>
						<view class="info flex_j_a_c grows">
							<view>
								<view class="flex_j_a_r two_size">
									<view>{{item.name}}</view>
									<view>￥{{item.money.toFixed(2)}}</view>
								</view>
								<view>
									<view class="count">
										<uni-icons color="gray" style='margin-right:-5px;' type="closeempty"></uni-icons>
										{{item.count}}</view>
									<view class="b three_size">
										<view>如假包换</view>
									</view>
								</view>
							</view>
							<view class="money">合计￥{{(item.count*item.money).toFixed(2)}}</view>
						</view>
					</view>
					<view class="btns flex_j_a_r">
						<view class='flex_j_a_r'>
							<view @click="delete_store(item)">删除订单</view>
							<view @click="no_develop('再次购买')">再次购买</view>
							<view @click="no_develop('评价')">评价</view>
						</view>
					</view>
				</view>
			</view>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import {useStore} from 'vuex'
export default{
  name:'',
  setup(){
	let back=uni.current_this.back
	let state=ref(0)
	let stores=reactive({
		all:[...uni.current_this.store.state.cars],
		cars:[...uni.current_this.store.state.cars],
		await_pay:[],
		comment:[]
	})
	function delete_store(item){
		uni.showModal({
			content:'是否删除该订单',
			success({cancel}) {
				if(cancel)
					return
				uni.current_this.store.dispatch('deleteBill',JSON.stringify(item))
				stores[Object.keys(stores)[state.value]].splice(item,1)
			}
		})
	}
	function no_develop(title){
		uni.showToast({
			title:title+'暂未开放',
			icon:'none'
		})
	}
	function toggle_category(index){
		state.value=index
	}
    return{back,stores,delete_store,no_develop,state,toggle_category}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
</style>
