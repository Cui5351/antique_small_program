<template>
	<view class="container flex_c background">
		<view class="head_title flex_j_a_r" :style="{minHeight:top+'px',opacity:opacity?'0%':'100%'}">{{person_info.name}}</view>
		<view class="top_img">
			<image :src="person_info.background"></image>
		</view>
		<view class="info flex_c">
			<view class="top">
				<view class="avatar" @click="login">
					<!-- <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">	 -->
						<image :src="person_info.avatar"></image>
					<!-- </button> -->
				</view>
				<view class="avatar_right">
					<view>
						<view class="count flex_c">
							<view>{{person_info.counts[0]}}</view>
							<view>作品</view>
						</view>
						<view class="count flex_c">
							<view>{{person_info.counts[1]}}</view>
							<view>粉丝</view>
						</view>
						<view class="count flex_c">
							<view>{{person_info.counts[2]}}</view>
							<view>关注</view>
						</view>
					</view>
				</view>
			</view>
			<view class="person_info flex_c">
					<view class="name">名字:{{person_info.name}}</view>
					<view class="id">ID:{{person_info.openid}}</view>
					<view class="introduce">简介:{{person_info.introduce}}</view>
			</view>
			<view class="other">
				<view>
					<view class="store"  @click="toggle_page('bill')">
							<view class="pic">
								<image src="/static/store_page/store2.svg" mode="" style="background-color: white;"></image>
							</view>
						<view class="store_info">
							<view >
								集市
							</view>
							<view class="store_">
								非遗文创触手可得
							</view>
						</view>
					</view>
					<view class="bills" @click="toggle_page('bills')">
						<view class="pic">
							<image src="/static/store_page/bill.svg"  style="background-color: white;" mode=""></image>
						</view>
						<view class="store_info">
							<view>
								订单
							</view>
							<view class="store_">
								查看全部订单
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="works flex_c">
			<view class="title" :style="{top:top+'px'}">
				<view class="t1 background">
					<view @click="toggle(true)" class="ti">作品</view>
					<view @click="toggle(false)" class="ti">收藏</view>
				</view>
				<view class="t2">
					<view class="line background1" :style="{left:person_info.toggle?'0%':'50%'}"></view>
				</view>
			</view>
			<view class="two" v-if="!person_info.toggle" >
				<view>博物馆</view>
				<view>商品</view>
				<view>文物</view>
				<view>工作室</view>
			</view>
			<view class="work" >
				<view v-for="(item,index) in person_info.works" :key="index" v-show="person_info.toggle">
					<image :src="'https://www.mynameisczy.asia/image/antique/'+item+'.jpg'" mode="aspectFill"></image>
				</view>
					<view v-for="(item,index) in person_info.works2" :key="index" v-show="!person_info.toggle">
						<image :src="'https://www.mynameisczy.asia/image/antique/'+item+'.jpg'" mode="aspectFill"></image>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {reactive,ref,computed} from 'vue'
	export default {
		setup() {
			let person_info=reactive({
				name:computed(()=>uni.current_this.store.getters.name),
				openid:computed(()=>uni.current_this.store.getters.openid),
				background:computed(()=>uni.current_this.store.getters.background),
				avatar:computed(()=>uni.current_this.store.getters.avatar),
				introduce:computed(()=>uni.current_this.store.getters.introduce),
				counts:[0,0,0],
				toggle:true,
				works:[],
				works2:[]
				// works:['one','two','three','four','five','six','seven','eight','nine','ten'],
				// works2:['six','seven','eight','nine','ten']
			})
			function toggle(bool){
				person_info.toggle=bool
			}
			let opacity=ref(true)
			let top=ref(uni.getMenuButtonBoundingClientRect().height*2)
			function toggle_page(title){
				if(title=='bills'){
					uni.navigateTo({
						url:'/pages/person/other_page/bills/bills'
					})
					return
				}
				uni.showToast({
					title:title+"暂未开放",
					icon:'none'
				})
			}
			function login(){
				if(uni.current_this.store.getters.login_state){
					// set avatar
					uni.navigateTo({
						url:'/pages/person/other_page/base_info/base_info'
					})
					return
				}
				uni.showLoading({
					title:'登录中'
				})
				uni.login({
					provider:'weixin',
					success({code}) {
						// 获取openid
						uni.request({
							url:uni.current_this.baseURL+':5001/getOpenid',
							method:'POST',
							data:{
								code:code
							},success(res1) {
								if(res1.data.state!=1){
									uni.showToast({
										title:'登录失败',
										icon:'error'
									})
									return
								}
								uni.current_this.store.state.user_info.openid=res1.data.value.openid
								// 登录
								uni.request({
									url:uni.current_this.baseURL+':5001/login_user',
									method:'POST',
									data:{
										openid:res1.data.value.openid
									},success(res) {
										console.log(res.data);
										if(res.data.state){
											uni.current_this.store.state.user_info.openid=res1.data.value.openid
											Object.keys(res.data.value).forEach(item=>{
												uni.current_this.store.state.user_info[item]=res.data.value[item]
											})
											uni.showToast({
												title:'登录成功',
											})
											uni.current_this.store.dispatch('set_login',1)
										}else{
											uni.showToast({
												title:'登录失败',
											})
										}
									},
									complete() {
										uni.hideLoading()
									}
								})
							}
						})
					}
				})
			}
			return {login,opacity,person_info,toggle,top,toggle_page}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
