<template>
  <view class="container">
	  <view class="head_two" @click.stop="back">
	  	<uni-icons type="left"></uni-icons>
		订单列表
	  </view>
	  <view class="search flex_j_a_c">
			<view class="flex_j_a_r" @click.stop="no_develop('搜索订单')">
				<uni-icons type="search" color='gray' style='margin-right: 5px;'></uni-icons>
				搜索订单
			</view>
	  </view>
	  <view class="content flex_j_a_c grows">
			<view class="title flex_j_a_r grows" style="width: 100%;overflow-y: auto;">
				<view style="width: fit-content;" :class="state==index?'hig':''" v-for="(item,index) in ['全部','待发货','待收货','已完成','已取消']" :key="index" @click.stop="toggle_category(index)">{{item}}</view>
			</view>
			<view class="bill">
				<view class=".flex_j_a_r" style="color: gray;" v-if="stores[Object.keys(stores)[state]].length?false:true">暂无商品</view>
				<view class="store flex_j_a_c grows" v-for="(item,index) in stores[Object.keys(stores)[state]]" :key="index" @click.stop="Detail(item)">
					<view class="flex_j_a_r" @click.stop="innerStore(item.store_id)">
						<view style="font-weight:bold;">{{item.store}}
						<uni-icons type="right" color="gray"></uni-icons>
						</view>
						<view class="title one_size">
							<!-- 交易成功 -->
							{{ item.state2 }}
							</view>
					</view>
					<view class="pics flex_j_a_r grows">
						<view class="pic flex_j_a_r">
							<image :src="item.src" mode='aspectFill'></image>
						</view>
						<view class="info flex_j_a_c grows">
							<view>
								<view class="flex_j_a_r two_size">
									<view class="name">{{item.name}}</view>
									<view>¥ {{item.money.toFixed(2)}}</view>
								</view>
								<view>
									<view class="count">
										<!-- <uni-icons color="gray" style='margin-right:-5px;' type="closeempty"></uni-icons> -->
										×
										{{item.count}}</view>
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
					<view class="money">
						<view class="done_pay">{{item.date}}</view>
						合计 
						<text style="color: red;">
							¥{{(item.count*item.money + item.transport_money).toFixed(2)}}
						</text>
						</view>
					<view class="btns flex_j_a_r">
						<view class='flex_j_a_r' style="justify-content: flex-end">
							<view @click.stop="again_bought(item)">再次购买</view>
							<view v-if='item.state2 == "已完成"' @click.stop="delete_store(item,index)">删除订单</view>
							<template v-if='item.state2 == "待发货"'>
								<view @click.stop="no_develop('催发货')">催发货</view>
							</template>
								<view v-if='item.state2 == "待收货"' @click.stop="receive_store(item,'已完成')">确定收货</view>
								<view v-if='item.state2 == "待发货"' @click.stop="receive_store(item,'已取消')">取消订单</view>
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
import request from '@/request/request.js'
export default{
  mounted() {
	  this.loadData()
  },
  setup(){
	let back=uni.current_this.back
	let state=ref(0)
	let stores=reactive({
		all:[],
		wait_send:[],
		wait_receive:[],
		// isReach:[],
		isDone:[],
		cancel:[]
	})
	const innerStore = (id) => {
		uni.navigateTo({
			url:'/pages/store/other_page/storeDetail/storeDetail?id=' + id
		})
	}
	const loadData = () => {
		uni.request({
			url:uni.current_this.baseURL+':5001/get_bills',
			method:'POST',
			data:{
				openid:uni.current_this.store.getters.openid
			},success(res) {
				console.log(res,'res');
				if(uni.current_this.check_res_state(res))
					return
					
				res.data.data.map(item=>{
					item.date=format(new Date(item.date))
				})
				function format(date){
					let month=date.getMonth()==12?1:date.getMonth()+1
					let day=date.getDate()
					let now=new Date()
					return `${date.getFullYear()}年${month<10?'0'+month:month}月${day<10?'0'+day:day}日`
				}	
				Object.keys(stores).forEach(item => {
					stores[item].splice(0,stores[item].length)
				})
				stores.all.push(...(res.data.data.reverse()))
				res.data.data.forEach(item=>{
					if(item.state2=='待发货'){
						stores.wait_send.push(item)
					}
					if(item.state2=='待收货'){
						stores.wait_receive.push(item)
					}
					// if(item.state2 == '已到达'){
						// that.stores.isReach.push(item)
					// }
					if(item.state2 == '已完成'){
						stores.isDone.push(item)
					}
					if(item.state2 == '已取消'){
						stores.cancel.push(item)
					}
				})
			}
		})
	}
	function delete_store(item,index){
		uni.showModal({
			content:'是否删除该订单',
			success({cancel}) {
				if(cancel)
					return
					uni.request({
						url:uni.current_this.baseURL+':5001/hid_bill',
						method:'POST',
						data:{
							uuid:item.uuid
						},success(res) {
							if(uni.current_this.check_res_state(res))
								return
							stores.all.splice(index,1)
						}
					})
				// uni.current_this.store.dispatch('deleteBill',JSON.stringify(item))
				// stores[Object.keys(stores)[state.value]].splice(item,1)
			}
		})
	}
	function no_develop(title){
		if(title == '催发货'){
			setTimeout(() => {
				uni.showModal({
					title:"系统提示",
					content:'您的催促已送达,请您耐心等候',
					showCancel:false
				})
			},100)
			return
		}
		uni.showToast({
			title:title+'暂未开放',
			icon:'none'
		})
	}
	function toggle_category(index){
		state.value=index
	}
	function again_bought(item){
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${item.goods_id}`
		})
		return
		uni.request({
			url:uni.current_this.baseURL+':5001/getStoreInfo',
			method:'POST',
			data:{
				name:item.name
			},success(res) {
				if(res.data.state!=1){
					uni.showToast({
						title:'发生了未知的错误',
						icon:'error'
					})
					return
				}
				let info={
					name:'',
					money:0,
					sale:0,
					depository:0,
					src:'',
					description:'',
					store:'',
					pic:[],
					transport_money:0
				}
				info.pic.push(...res.data.data.pic.map(item=>item.src))
				Object.keys(info).forEach(item=>{
					if(item=='pic'||item=='bought_log'||item=='comment')
						return
					info[item]=res.data.data.info[item]
				})
				uni.navigateTo({
					url:`/pages/store/other_page/store_page/store_page?info=${JSON.stringify(info)}`
				})
			}
		})
	}
	function receive_store(item,State){
		uni.showModal({
			title:'系统提示',
			content: State == '已完成' ? '是否已收到包裹' : '是否取消该订单',
			success(res) {
				if(res.confirm){
					console.log(item,'收');
					// 74abe59c-1300-4329-9a03-3006da8515c3
					// /StoreItem/editBuyGoodsState2
					uni.showLoading({
						title:'加载中',
						mask:true
					})
					request.put("/StoreItem/editBuyGoodsState2",{
						state2:State,
						uuid:item.uuid
					}).then(() => {
						if(State == '已完成'){	
						uni.showToast({
							title:'收货成功',
							icon:'none'
						})
							state.value = 3
						}
						else{
							uni.showToast({
								title:'订单已取消',
								icon:'none'
							})
							state.value = 4
						}
						loadData()
					}).finally(() => {uni.hideLoading()})
				}
			}
		})
	}
	const Detail = (item) => {
		uni.navigateTo({
			url:'/pages/person/other_page/bills/billsDetail/billsDetail?uuid=' + item.uuid
		})
	}
    return{back,again_bought,stores,delete_store,no_develop,state,toggle_category,receive_store,innerStore,loadData,Detail}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
</style>
