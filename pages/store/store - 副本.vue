<template>
	<view class="container">
		<view class="head head_tit">
			非遗集市
		</view>
		<view class="body flex_c">
			<view class="search flex_j_a_r">
				<view class="background search_btn" @click="toggle_page('搜索')">
					<uni-icons color='gray' size='25' type='search'></uni-icons>搜索商品
				</view>
			</view>
			<view class="list">
				<view class="culture">
					<view @click="toggle_active(item)" :class="(active==item.title)?'active':''" class=".flex_j_a_r" v-for="(item,index) in info" :key="index">
					<view class="dot background1" v-show='(active==item.title)'></view>
					{{item.title}}</view>
				</view>
				<view class="culture_right background">
					<view class="pic">
						<image :src="show_store.main" mode=""></image>
					</view>
					<view class="culture_store flex_c">
						<view class="title">联名文创</view>
						<view class="goods_all">
							<view class="goods" @click="enter(item)" v-for="(item,index) in show_store.store" :key="index">
								<image :src="item.src" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {reactive,ref} from 'vue'
	export default {
		setup() {
			// 
			let info=reactive([
				{
					title:'制作道具',
					main:uni.current_this.baseURL+'/image/antique/culture_big.jpg',
					picture:[{
							name:'团扇制作道具',
							src:uni.current_this.baseURL+'/antique/store_picture/团扇制作道具.jpg'
						},{
							name:'剪纸制作工具',
							src:uni.current_this.baseURL+'/antique/store_picture/剪纸制作工具.jpg'
						},{
							name:'手工绳制作工具',
							src:uni.current_this.baseURL+'/antique/store_picture/手工绳制作工具.jpg'
						}
					]
				},{
				title:'非遗制品',
				main:uni.current_this.baseURL+'/image/antique/culture_big.jpg',
				picture:[{
					name:'团扇',
					src:uni.current_this.baseURL+'/antique/store_picture/fan.jpg'
				},{
					name:'虎头帽',
					src:uni.current_this.baseURL+'/antique/store_picture/虎头帽.jpg'
				},{
					name:'精美贝雕',
					src:uni.current_this.baseURL+'/antique/store_picture/精美贝雕.jpg'
				},{
					name:'漆艺茶杯',
					src:uni.current_this.baseURL+'/antique/store_picture/茶杯.jpg'
				},{
					name:'葫芦烙画',
					src:uni.current_this.baseURL+'/antique/store_picture/葫芦烙画.jpg'
				},{
					name:'古筝',
					src:uni.current_this.baseURL+'/antique/store_picture/古筝.jpg'
				},{
					name:'戏曲服装',
					src:uni.current_this.baseURL+'/antique/store_picture/戏曲服装.jpg'
				},{
					name:'剪纸',
					src:uni.current_this.baseURL+'/antique/store_picture/剪纸.jpg'
				},{
					name:'刺绣',
					src:uni.current_this.baseURL+'/antique/store_picture/刺绣.jpg'
				}]
			},{
				title:'联名文刊',
				main:uni.current_this.baseURL+'/image/antique/culture_big.jpg',
				picture:[]
			},{
				title:'专属定制',
				main:uni.current_this.baseURL+'/image/antique/culture_big.jpg',
				picture:[]
			},{
				title:'联名服装',
				main:uni.current_this.baseURL+'/image/antique/culture_big.jpg',
				picture:[]
			}])
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
			return {enter,show_store,info,active,toggle_active,toggle_page}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
