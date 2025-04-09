<template>
	<view class="container">
		<view class="head head_tit" @click="back">
			<uni-icons type="left" size="25" ></uni-icons>联名博物馆
		</view>
		<view class="body flex_c">
			<view class="search flex_j_a_r">
				<view class="search_btn background">
					<AICover :keytext="active + '所有的博物馆推荐'"></AICover>
				<input style="border: none;outline: none;width: 100%;height: 100%;" placeholder="请输入博物馆名称搜索" maxlength="30" @confirm="SearchAntique2" confirm-type="search" />
				<!-- 字节控制代码 -->
				<!-- <input style="border: none;outline: none;width: 100%;height: 100%;" placeholder="请输入博物馆名称搜索" maxlength="30" @input="SearchAntique" /> -->
				<!-- <uni-icons color='gray' size='25' type='search' @click="SearchAntique2"></uni-icons> -->
				<image style="width: 45rpx;height: 45rpx;background-color: rgba(0,0,0,0);" src="../../static/search.svg" mode=""></image>
				</view>
			</view>
			<view class="list">
				<view class="culture">
					<view @click="toggle_active(item)" :class="(active==item)?'active':''" class=".flex_j_a_r" v-for="(item,index) in info" :key="index">
					<view class="dot background1" v-show='(active==item)'></view>
					{{item}}</view>
				</view>
				<view class="culture_right background">
					<view class="pic">
						<image src="https://www.mengzhiyuan.email/image/antique/home_top/title3.jpg" mode="aspectFill"></image>
					</view>
					<view class="culture_store flex_c">
						<view v-for="(item,index) in show_store.store" style="position: relative;" @click="enter(item)">
							<image class="cimg" :src="item.avatar" mode="aspectFill"></image>
							<view class="antique_name">
							{{ item.name.length >= 10 ? item.name.substring(0,9) + '...' :item.name }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "@/request/request.js"
	import {reactive,ref} from 'vue'
	export default {
		setup() {
			// let info=reactive(['北京市', '天津市', '上海市', '重庆市', '湖北省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '陕西省', '甘肃省', '青海省', '台湾省', '广西壮族自治区', '内蒙古自治区', '西藏自治区', '宁夏族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'])
			let info = reactive([
			  '北京市', '天津市', '上海市', '重庆市',
			  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省',
			  '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省',
			  '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省',
			  '云南省', '陕西省', '甘肃省', '青海省', '台湾省',
			  '广西壮族自治区', '内蒙古自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区',
			  '香港特别行政区', '澳门特别行政区'
			])
			let show_store=reactive({
				main:'1',
				store:[]
			})
			let active=ref('');
			function toggle_active(item){
				if(active.value == item){
					return
				}
				active.value = item
				show_store.store.splice(0,show_store.store.length)
				uni.showLoading({
					title:'加载博物馆中'
				})
				request.get("/Antique/GetAntiqueByProvince",{
					province:item
				}).then(res => {
					console.log(res,'res');
					show_store.store.push(...res)
				}).catch((err)=> {
					console.log(err);
				}).finally(() => {
					uni.hideLoading()
				})
				// 发送请求
				
			}
			// 后期制定，默认当前省份(使用高德地图的逆解码)
			toggle_active('湖北省')
			
			function toggle_page(name){
				uni.showToast({
					icon:'none',
					title:name+'功能暂时未开放'
				})
			}
			function enter(item){
				uni.navigateTo({
					url:`/pages/home/other_page/museum/museum?id=${item.id}`
				})
			}
			let timer = ''
			let back=uni.current_this.back
			const SearchAntique2 =  (event) => {
				if(event == null){
					return
				}
				const data = event.detail.value
				// 字节流控制
					// 根据名称进行模糊查询
					uni.showLoading({
						title:'加载博物馆中'
					})
					request.get("/Antique/GetAntiqueByName",{
						name:data
					}).then(res => {
						uni.hideLoading()
						if(res == null){
							uni.showToast({
								title:'没有找到该博物馆',
								icon:'none'
							})
							return
						}
						show_store.store.splice(0,show_store.store.length)
						active.value = res.location
						show_store.store.push(res)
					}).catch(err =>{
						uni.hideLoading()
						console.log(err,'err');
					}).finally(() => {
				})
			}
			const SearchAntique = (event) => {
				const data = event.detail.value
				// 字节流控制
				if(timer != ''){
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					// 根据名称进行模糊查询
					console.log(data,'event');
					uni.showLoading({
						title:'加载博物馆中'
					})
					request.get("/Antique/GetAntiqueByName",{
						name:data
					}).then(res => {
						uni.hideLoading()
						if(res == null){
							uni.showToast({
								title:'没有找到该博物馆',
								icon:'none'
							})
							return
						}
						show_store.store.splice(0,show_store.store.length)
						active.value = res.location
						show_store.store.push(res)
					}).catch(err =>{
						uni.hideLoading()
						console.log(err,'err');
					}).finally(() => {
				})
				},1000)
			}
			return {back,enter,show_store,info,active,toggle_active,toggle_page,SearchAntique,SearchAntique2}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
