<template>
	<view class="container">
		<view class="head head_tit">
			非遗集市
		</view>
		<swiper class="swi" circular indicator-dots indicator-active-color="white">
			<swiper-item v-for="(item,index) in carousel" :key="index">
				<view class="pic">
					<image :src="item" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<scroll-view scroll-y class="body" @scrolltolower="loadData">
			<view class="flex_c">
				<view class="store" v-for="item in info" :key="item.id" @click="innerStore(item)">
					<view class="avatar">
						<image :src="item.src" mode="aspectFill"></image>
					</view>
					<view class="other">
						<view class="name">{{item.name}}</view>
						<view class="description">{{ item.description.length >= 25 ? item.description.substring(0,25) + '...' :item.description }}
						</view>
					</view>
					<view class="other2" style="min-width: fit-content;color:rgba(0,0,0,.5)">
						<view class="name">
							<!-- 进店 -->
							<uni-icons type="right" size="30" color="rgba(0,0,0,.5)"> </uni-icons>
						</view>
					</view>
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
			this.loadData()
		},
		methods:{
			loadData(){
				uni.showLoading({
					title:'加载店铺中',
					mask:true
				})
				request.get("/Store/getAllStore",{
					...this.search
				}).then(res => {
					if(res.list.length <= 0){
						uni.showToast({
							title:'已经没有更多了',
							icon:'none'
						})
						return
					}
					this.info.push(...res.list)
					this.search.page = res.pageNum + 1
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
			// 
			let info=reactive([])
			let show_store=reactive({
				main:'',
				store:[]
			})
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
			return {enter,show_store,info,active,toggle_active,toggle_page,innerStore,search,carousel}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
