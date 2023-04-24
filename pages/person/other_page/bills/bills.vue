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
				<view :class="state==index?'hig':''" v-for="(item,index) in ['全部','待发货','待收货']" :key="index" @click="toggle_category(index)">{{item}}</view>
			</view>
			<view class="bill">
				<view class=".flex_j_a_r" style="color: gray;" v-if="stores[Object.keys(stores)[state]].length?false:true">暂无商品</view>
				<view class="store flex_j_a_c grows" v-for="(item,index) in stores[Object.keys(stores)[state]]" :key="index">
					<view class="flex_j_a_r">
						<view style="font-weight:bold;">{{item.store}}
						<uni-icons type="right" color="gray"></uni-icons>
						</view>
						<view class="title one_size">
							交易成功</view>
					</view>
					<view class="pics flex_j_a_r grows">
						<view class="pic flex_j_a_r">
							<image :src="item.src" mode='aspectFill'></image>
						</view>
						<view class="info flex_j_a_c grows">
							<view>
								<view class="flex_j_a_r two_size">
									<view class="name">{{item.name}}</view>
									<view>￥{{item.money.toFixed(2)}}</view>
								</view>
								<view>
									<view class="count">
										<uni-icons color="gray" style='margin-right:-5px;' type="closeempty"></uni-icons>
										{{item.count}}</view>
									<view class="b three_size">
										<view>如假包换</view>
									</view>
									<view class="send_time flex_j_a_c" v-if='state==1'>在{{item.date}}前发货</view>
									<!-- <view class="done_pay"> -->
										<!-- {{item.date}}完成支付 -->
									<!-- </view> -->
								</view>
							</view>
							<view class="money">
								<view class="done_pay">{{item.date}}</view>
								合计￥{{(item.count*item.money).toFixed(2)}}</view>
						</view>
					</view>
					<view class="btns flex_j_a_r">
						<view class='flex_j_a_r' style="justify-content: flex-end">
							<template v-if='state==0'>
								<view @click="delete_store(item,index)">删除订单</view>
								<view @click="again_bought(item)">再次购买</view>
								<view @click="no_develop('评价')">评价</view>
							</template>
							<template v-if='state==1'>
								<view @click="no_develop('催发货')">催发货</view>
							</template>
							<template v-if='state==2'>
								<view @click="no_develop('更多')">更多</view>
								<view @click="no_develop('查看物流')">查看物流</view>
								<view @click="no_develop('确定收货')">确定收货</view>
							</template>
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
  mounted() {
	 let that=this
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
			that.stores.all.push(...(res.data.data.reverse()))
			res.data.data.forEach(item=>{
				if(item.state2=='待发货'){
					that.stores.wait_send.push(item)
				}
				if(item.state2=='待收货'){
					that.stores.wait_receive.push(item)
				}
			})
		}
  	})
  },
  setup(){
	let back=uni.current_this.back
	let state=ref(0)
	let stores=reactive({
		all:[],
		wait_send:[],
		wait_receive:[]
	})
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
		uni.showToast({
			title:title+'暂未开放',
			icon:'none'
		})
	}
	function toggle_category(index){
		state.value=index
	}
	function again_bought(item){
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
    return{back,again_bought,stores,delete_store,no_develop,state,toggle_category}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
</style>
