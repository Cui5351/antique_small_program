<template>
	<view class="container">
		<view class="head head_tit">
			文创集市
		</view>
		<scroll-view scroll-y class="body font_color" @scrolltolower="loadData">
			<view class="flex_c">
				<swiper class="swi" circular indicator-dots indicator-active-color="white">
					<swiper-item v-for="(item,index) in carousel" :key="index">
						<view class="pic">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view style="padding: 20rpx;40rpx;background-color: white;" @click="toggleSearchPage">
					<view style="padding: 15rpx 30rpx;background-color:rgba(180,170,156,0.3);border-radius: 40rpx;width: 100%;height: 100%;box-sizing: border-box;color: gray;display: flex;justify-content: space-between;align-items: center;">
						<text style="color: rgb(180,170,156);">输入您想要的商品</text>
					<image style="width: 45rpx;height: 45rpx;background-color: rgba(0,0,0,0);" src="../../static/search.svg" mode=""></image>
					</view>
				</view>
				<view style="width: 100%;display: flex;padding: 20rpx 20rpx;box-sizing: border-box;background-color: white;justify-content: space-around;">
					<view @click="toggleSearch('all')" :class="searchType.all ? 'highTxt':''">最新</view>
					<view @click="toggleSearch('price')" :class="searchType.price != '' ? 'highTxt':''">
						价格
						<uni-icons :color="searchType.price == 'desc' ? 'rgb(180,170,156)' :''" v-if="searchType.price == 'desc'" type="bottom"></uni-icons>
						<uni-icons :color="searchType.price == 'asc' ? 'rgb(180,170,156)' :''" v-else type="top"></uni-icons>
					</view>
					<view @click="toggleSearch('sale')" :class="searchType.sale ? 'highTxt':''">销量</view>
				</view>
				<view class="service-list">
				<view class="service-item" v-for="(item, index) in [...services]" :key="index" @click="enterService(item)">
				   <image :src="item.url" mode="aspectFill" class="service-pic"></image>
				   <view class="service-info">
				     <view class="service-name">{{ item.name }}</view>
				     <view class="service-desc">商品描述：{{ item.description.length >= 10 ? (item.description.substring(0,10) + '...') :item.description }}</view>
				   </view>
				     <view class="service-price">¥{{item.money?.toFixed(2)}}元</view>
						  <view style="display: flex;justify-content: space-between;padding: 0 10rpx;color:rgba(0,0,0,.5);margin: 10rpx 0;">
							  <view>销量：{{item.sale}}</view>
							  <view>库存：{{item.depository}}</view>
						  </view>
				 </view>
<!-- 				<view class="store" v-for="item in info" :key="item.id" @click="innerStore(item)">
					<view class="avatar">
						<image style="border-radius: 20rpx;" :src="item.src" mode="aspectFill"></image>
					</view>
					<view class="other">
						<view class="name">{{item.name}}</view>
						<view class="description">{{ item.description.length >= 25 ? item.description.substring(0,25) + '...' :item.description }}
						</view>
					</view>
					<view class="other2" style="min-width: fit-content;color:rgba(0,0,0,.5)">
						<view class="name">
							<uni-icons type="right" size="30" color="rgba(0,0,0,.5)"> </uni-icons>
						</view>
					</view>
				</view> -->
			</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {reactive,ref} from 'vue'
	import request from "@/request/request.js"
	export default {
		onTabItemTap() {
			this.search.page = 1
			this.info.splice(0,this.info.length)
			this.services.splice(0,this.services.length)
			this.loadData()
		},
		methods:{
			loadData(){
				uni.showLoading({
					title:'加载商品中',
					mask:true
				})
				// GetGoodsBySale
				request.get("/StoreItem/GetGoodsBySale",{
					...this.search,
					...this.searchType
				}).then(res => {
					if(res.list.length <= 0){
						uni.showToast({
							title:'已经没有更多了',
							icon:'none'
						})
						return
					}
					this.services.push(...res.list)
					this.search.page = res.pageNum + 1
					return
				}).catch(err => {
					console.log(err,'err');
				}).finally(() =>{uni.hideLoading()})
			}
		},
		setup() {
			const carousel = reactive([
				'https://www.mengzhiyuan.email/antique/storeCarousel/carousel1.png',
				'https://www.mengzhiyuan.email/antique/storeCarousel/carousel2.png',
				'https://www.mengzhiyuan.email/antique/storeCarousel/carousel3.png'
			])
			const search = reactive({
				page:1,
				pageSize:10
			})
			const innerStore = (item) => {
				uni.navigateTo({
					url:'/pages/store/other_page/storeDetail/storeDetail?id=' + item.id
				})
			}
			let info=reactive([])
			let show_store=reactive({
				main:'',
				store:[]
			})
			const services = reactive([])
			let active=ref('非遗制品');
			function toggle_active(item){
				if(active.value!=item.title){
					active.value=item.title
					show_store.main=item.main
					let c=show_store.store.length
					for(let i=0;i<c;i++)
						show_store.store.shift()
					show_store.store.push(...item.picture)
				}
			}
			function toggle_page(name){
				uni.showToast({
					icon:'none',
					title:name+'功能暂时未开放'
				})
			}
			info.forEach(item=>{
				if(item.title==active.value){
					show_store.main=item.main
					show_store.store.push(...item.picture)
				}
			})
			function enter(item){
				if(!uni.current_this.store.getters.login_state){
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});
					return
				}
					uni.request({
						url:uni.current_this.baseURL+':5001/getStoreInfo',
						method:'POST',
						data:{
							name:item.name
						},success(res) {
							console.log(res,'res');
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
								url:`/pages/store/other_page/store_page/store_page?info=${JSON.stringify(info)}&state=0`
							})
						}
					})
					return
				uni.showToast({
					icon:'none',
					title:item.name+'暂时还不能看'
				})
			}
			const enterService = (item) => {
				// 根据id获取详情数据
				uni.navigateTo({
					url:`/pages/store/other_page/store_page/store_page?id=${item.id}&store_id=${item.store_id}`
					// url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
				})
			}
			const searchType = reactive({
				sale:0,
				all:1,
				price:''
			})
			const toggleSearch = (type) => {
				if(type == 'all'){
					searchType.all = 1
					// 清除所有
					searchType.sale = 0
					searchType.price = ''
				}else if(type == 'price'){
					// 判断是否存在，如果存在即切换type
					searchType.all = 0
					searchType.sale = 0
					if(searchType.price == 'asc' || searchType.price == 'desc'){
						searchType.price = searchType.price == 'asc' ? 'desc' : 'asc'
					}else{
						searchType.price = 'asc'
					}
				}else if(type == 'sale'){
					searchType.all = 0
					searchType.price = ''
					searchType.sale = searchType.sale == 0 ? 1:0
				}
				search.page = 1
				uni.showLoading({
					title:'加载商品中',
					mask:true
				})
				request.get("/StoreItem/GetGoodsBySale",{
					...search,
					...searchType
				}).then(res => {
					if(res.list.length <= 0){
						uni.showToast({
							title:'已经没有更多了',
							icon:'none'
						})
						return
					}
					services.splice(0,services.length)
					services.push(...res.list)
					search.page = res.pageNum + 1
				}).catch(err => {
					console.log(err,'err');
				}).finally(() =>{uni.hideLoading()})
			}
			const toggleSearchPage = () => {
				uni.navigateTo({
					url:'/pages/store/other_page/store_search/store_search'
				})
			}
			return {enter,searchType,show_store,info,active,toggle_active,toggle_page,innerStore,search,carousel,services,enterService,toggleSearch,toggleSearchPage}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
