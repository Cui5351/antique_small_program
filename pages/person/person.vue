<template>
	<scroll-view class="container flex_c background" scroll-y="true" @scrolltolower="lower">
		<view class="head_title flex_j_a_r" :style="{minHeight:top+'px',opacity:opacity?'0%':'100%'}">{{person_info.name}}</view>
		<view class="top_img" @click="change_background">
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
					<view  v-if='!login_state' style="align-items: center;justify-content: flex-end;">
						<view class="btn2" @click="login">登录/注册</view>
					</view>
					<view v-if='login_state'>
						<view class="count flex_c">
							<view>{{person_info.works.length}}</view>
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
				<template v-if='login_state'>
					<view class="name">{{person_info.name}}</view>
					<view class="id">ID:{{person_info.openid}}</view>
					<view class="introduce">简介:{{person_info.introduce}}</view>
				</template>
				<template v-if='!login_state'>
					<view></view>
					<view>HELLO!</view>
					<view class="id">登录后享受更多服务</view>
				</template>
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
					<view @click="toggle(false)" class="ti">动态</view>
				</view>
				<view class="t2">
					<view class="line background1" :style="{left:person_info.toggle?'0%':'50%'}"></view>
				</view>
			</view>
			<view class="two" v-if="!person_info.toggle" >
				<!-- <view>博物馆</view> -->
				<!-- <view>商品</view> -->
				<!-- <view>文物</view> -->
				<!-- <view>工作室</view> -->
			</view>
			<view v-if="!person_info.toggle" >
				<view class="moment" @click="detail(item)" v-for="(item,index) in person_info.works2" :key="index" >
					<view class="date">
						<view class="d">{{item.send_date}}</view>
						<view class="place">{{item.place}}</view>
					</view>
					<view class="mpic" v-if="item.src.length&&item.type=='p'">
						<image :src="item.src[0]" mode="aspectFill"></image>
					</view>
					<view class="mpic" v-if="item.type=='v'">
						<image :src="item.mask[0]" mode="aspectFill"></image>
					</view>
					<view class="mtxt">
						<view class="mtx">
							{{item.content.length>=20?item.content.substring(0,20)+'...':item.content}}
						</view>
						<view class="item" v-if="item.type=='p'">({{item.src.length}}张)</view>
						<view class="item" v-if="item.type=='v'">(视频)</view>
						</view>
				</view>
			<view class="line2 flex_j_a_r">
				<view class="lin"></view>
				<view class="dot"></view>
				<view class="lin"></view>
			</view>
			</view>
			<view class="work"  v-if="person_info.toggle" :class="(person_info.works.length<=0&&person_info.toggle)?'start_btn_cen':''" >
				<view @click="start_" class="start_btn" v-if="person_info.works.length<=0&&person_info.toggle">
					开启你的非遗之旅
				</view>
				<view @click="start_" class="add_btn" v-if="person_info.works.length>0&&person_info.toggle">
					<image src="../../static/add.svg" mode="widthFix"></image>
				</view>
				<view v-for="(item,index) in person_info.works" :key="index" v-show="person_info.toggle" @click="works(item)">
					<image :src="item.mask" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</scroll-view>
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
				toggle:false,
				works:computed(()=>uni.current_this.store.getters.works),
				works2:computed(()=>uni.current_this.store.getters.my_moments)
			})
			function toggle(bool){
				person_info.toggle=bool
			}
			const reqs=reactive({
				state:false,
				skip:0
			})
			let login_state=computed(()=>uni.current_this.store.getters.login_state)
			let opacity=ref(true)
			let top=ref(uni.getMenuButtonBoundingClientRect().height*2)
			function toggle_page(title){
				if(uni.current_this.check_login_state()){
					return
				}
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
										if(res.data.state){
											uni.current_this.store.state.user_info.openid=res1.data.value.openid
											Object.keys(res.data.value).forEach(item=>{
												uni.current_this.store.state.user_info[item]=res.data.value[item]
											})
											uni.showToast({
												title:'登录成功',
											})
											uni.request({
												url:uni.current_this.baseURL+':5001/get_workAll',
												method:"POST",
												data:{
													openid:uni.current_this.store.state.user_info.openid
												},
												success(res) {
													if(uni.current_this.check_res_state(res)){
														return
													}
													uni.current_this.store.state.user_info.works.push(...res.data.data)
												}
											})
											uni.current_this.store.dispatch('set_login',1)
											reqmoment()
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
			function change_background(){
				if(!uni.current_this.store.getters.login_state){
					return
				}
				uni.navigateTo({
					url:'/pages/person/other_page/avatar_edit/avatar_edit?url=https://www.mynameisczy.cn:5001/upload_background&height=500&width=700&property=background&name=avatar'
				})
				
				return
				uni.chooseImage({
					count:1,
					crop:{
						width:200,
						height:300
					},success(e) {
						let image_path=e.tempFilePath
					}
				})
				function choosePortrait(e){
					uni.showLoading({
						title:'修改中'
					})
					let image_path=e.tempFilePath
					uni.uploadFile({
						url:url,
						filePath:image_path,
						name:'avatar',
						formData:{
							openid:uni.current_this.store.state.user_info.openid
						},
					})
				}
			}
			function start_(){
				if(uni.current_this.check_login_state())
					return
				uni.navigateTo({
					url:`/pages/person/other_page/new_work_collection/new_work_collection`
				})
			}
			function works(item){
				uni.navigateTo({
					url:`/pages/person/other_page/manage_work/manage_work?work=${JSON.stringify(item)}`
				})
			}
			function lower(){
				if(person_info.toggle)
					return
				reqmoment()
			}
			function reqmoment(){
				if(reqs.state||!login_state)
					return
				reqs.state=true
				uni.request({
					url:uni.current_this.baseURL+':5001/get_person_community_moments',
					method:"POST",
					data:{
						openid:person_info.openid,
						skip:reqs.skip
					},success(res) {
						let w=res.data.data
						console.log(res);
						w.forEach(item=>{
							if(item.hasOwnProperty("src")){
								if(item.src[0]){
									if(item.src[0].substring(item.src[0].length-3)=='mp4')
										item.type='v'
									else
										item.type='p'
								}
							}
							else
								item.src=[]
							item.send_date=uni.current_this.dateformat(new Date(item.send_date))
						})
						reqs.skip+=w.length
						if(!w.length)
							return
						uni.current_this.store.state.user_info.moments.push(...w)
					},
					complete() {
						setTimeout(()=>{
							reqs.state=false
						},1000)
					}
				})
			}
			function detail(item){
				uni.navigateTo({
					url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(item)}`
				})
			}
			return {reqs,detail,lower,reqmoment,works,start_,change_background,login_state,login,opacity,person_info,toggle,top,toggle_page}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
