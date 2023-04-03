<template>
	<view class="container">
		<view class="head flex_j_a_c">
			非遗集市
		</view>
		<view class="body flex_c">
			<view class="search flex_j_a_r">
				<view class="search_btn" @click="toggle_page('搜索')">
					<uni-icons color='gray' size='25' type='search'></uni-icons>搜索商品
				</view>
			</view>
			<view class="list">
				<view class="culture">
					<view @click="toggle_active(item)" :class="(active==item.title)?'active':''" class=".flex_j_a_r" v-for="(item,index) in info" :key="index">
					<view class="dot" v-show='(active==item.title)'></view>
					{{item.title}}</view>
				</view>
				<view class="culture_right">
					<view class="pic">
						<image :src="show_store.main" mode=""></image>
					</view>
					<view class="culture_store flex_c">
						<view class="title">联名文创</view>
						<view class="goods_all">
							<view class="goods" @click="enter(item)" v-for="(item,index) in show_store.store" :key="index">
								<image :src="item.src"></image>
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
			let info=reactive([{
				title:'文刊',
				main:'../../static/background.jpg',
				picture:[{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				}]
			},{
				title:'联名文刊',
				main:'',
				picture:[{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				}]
			},{
				title:'非遗制品',
				main:'',
				picture:[{
					name:'aaa',
					src:'../../static/background.jpg'
				}]
			},{
				title:'专属定制',
				main:'',
				picture:[{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				}]
			},{
				title:'联名服装',
				main:'',
				picture:[{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				},{
					name:'aaa',
					src:'../../static/background.jpg'
				}]
			}])
			let show_store=reactive({
				main:'',
				store:[]
			})
			let active=ref('文刊');
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
