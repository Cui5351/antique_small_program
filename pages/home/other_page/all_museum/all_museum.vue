<template>
	<view class="container">
		<view class="head" @click="back">
			<uni-icons type="left"></uni-icons>联名博物馆
		</view>
		<view class="body flex_c">
			<view class="search flex_j_a_r">
				<view class="search_btn" @click="toggle_page('搜索')">
					<uni-icons color='gray' size='25' type='search'></uni-icons>搜索博物馆
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
			let info=reactive([
			{
				title:'北京市',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'天津市',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'上海市',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'重庆市',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'湖北省',
				main:'/static/background.jpg',
				picture:[{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				},{
					name:'aaa',
					src:'/static/background.jpg'
				}]
			},
			{
				title:'广东省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'海南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'四川省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'贵州省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'云南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'陕西省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'甘肃省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'青海省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'台湾省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'河北省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'山西省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'辽宁省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'吉林省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'黑龙江省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'江苏省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'浙江省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'安徽省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'福建省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'江西省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'山东省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'河南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'湖南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'广东省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'湖南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'海南省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'四川省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'贵州省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'陕西省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'甘肃省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'青海省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'台湾省',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'广西壮族自治区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'内蒙古自治区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'西藏自治区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'宁夏族自治区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'新疆维吾尔自治区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'香港特别行政区',
				main:'/static/background.jpg',
				picture:[]
			},
			{
				title:'澳门特别行政区',
				main:'/static/background.jpg',
				picture:[]
			}])
			let show_store=reactive({
				main:'1',
				store:[]
			})
			let active=ref('湖北省');
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
			let back=uni.current_this.back
			return {back,enter,show_store,info,active,toggle_active,toggle_page}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
