<template>
	<view class="container">
		<view class="head head_tit" @click="back">
			<uni-icons type="left" size="25" ></uni-icons>联名博物馆
		</view>
		<view class="body flex_c">
			<view class="search flex_j_a_r">
				<view class="search_btn background" @click="toggle_page('搜索')">
					<uni-icons color='gray' size='25' type='search'></uni-icons>搜索博物馆
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
						<image :src="show_store.main" mode="aspectFill"></image>
					</view>
					<view class="culture_store flex_c">
						<view v-for="(item,index) in show_store.store">
							<image class="cimg" :src="item.src" mode="aspectFill"></image>
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
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'天津市',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'上海市',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'重庆市',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'湖北省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				},{
					name:'aaa',
					src:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg'
				}]
			},
			{
				title:'广东省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'海南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'四川省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'贵州省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'云南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'陕西省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'甘肃省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'青海省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'台湾省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'河北省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'山西省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'辽宁省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'吉林省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'黑龙江省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'江苏省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'浙江省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'安徽省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'福建省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'江西省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'山东省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'河南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'湖南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'广东省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'湖南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'海南省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'四川省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'贵州省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'陕西省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'甘肃省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'青海省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'台湾省',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'广西壮族自治区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'内蒙古自治区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'西藏自治区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'宁夏族自治区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'新疆维吾尔自治区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'香港特别行政区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
				picture:[]
			},
			{
				title:'澳门特别行政区',
				main:'https://mengzhiyuan.email/antique/antique_pic/poster.jpeg',
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
