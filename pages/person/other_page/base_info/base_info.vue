<template>
	<view class="container">
		<!-- <navigation2 title='返回'></navigation2> -->
		<view class="head_two">
			<view @click='back'>
				<uni-icons type="left" size="20"></uni-icons>
				我的
			</view>
		</view>
		<view class="vessel grows">
			<view class="base_info">
			<view class="item avatar flex_j_a_r">
				<view @click="show_corp_fun" :style="{borderRadius:50+'%',overflow:'hidden'}">
					<image :src="userInfo_.avatar" style="width: 100%;height: 100%;overflow: hidden;"></image>
				</view>
			</view>
			<view class="info">
				<view>
					<view class="title">姓名</view>
					<view class="input">
						<input v-model='userInfo_.name' placeholder="name"  maxlength='10' />
					</view>
				</view>
				<view>
					<view class="title">性别</view>
					<view class="input">
							<radio-group @change="radioChange" class="radi">
										<label class="radio">
											<radio value="男" color="#6E79E2" :checked="userInfo.sex=='男'" /><text>男</text>
										</label>
										<label class="radio">
											<radio value="女" color="#6E79E2" :checked="userInfo.sex=='女'" /><text>女</text>
										</label>
							</radio-group>
							<!-- <radio-group>女</radio-group> -->
					</view>
				</view>
				<view>
					<view class="title">自我介绍</view>
					<view class="input">
						<textarea  v-model="userInfo_.introduce" cols="20" rows="5" maxlength="45"></textarea>
					</view>
				</view>
			</view>
		</view>
		<view class="item" style="border: none;justify-content: space-around;">
			<view>
				<view class="btn" @click="reset_data">
					重置
				</view>
			</view>
			<view>
				<view class="btn" @click="submit_data">
					提交
				</view>
			</view>
			<!-- <view>{{userInfo.gender}}</view> -->
		</view>
		</view>
	</view>
</template>

<script>
	import {ref,reactive,computed} from 'vue'
	export default {
		setup() {
			let userInfo=reactive({
				avatar:computed(()=>uni.current_this.store.getters.avatar),
				name:computed(()=>uni.current_this.store.getters.name),
				openid:computed(()=>uni.current_this.store.getters.openid),
				sex:computed(()=>uni.current_this.store.getters.sex),
				introduce:computed(()=>uni.current_this.store.getters.introduce)
			})
			let userInfo_=reactive({
				...userInfo
			})
			userInfo_.avatar=computed(()=>userInfo.avatar)
			
			let info=reactive(uni.getSystemInfoSync())
			// 重置数据
			function reset_data(){
				Object.keys(userInfo).forEach(item=>{
					if(item=='avatar')
						return
					userInfo_[item]=userInfo[item]
				})
			}
			function show_corp_fun(){
				uni.navigateTo({
					url:'/pages/person/other_page/avatar_edit/avatar_edit?url=https://www.mengzhiyuan.email:5001/upload_avatar&height=500&width=500&property=avatar&name=avatar'
				})
			}
			// 提交数据
			function submit_data(){
				// 查看需要修改的地方
				// name,telephone,gender,score
				// 查看要修改的地方
				let atb=['name','sex','introduce']
				atb.forEach(item=>{
					if(userInfo[item]!=userInfo_[item]){
						uni.showLoading({
							title:'修改中',
							mask:true
						})
						uni.request({
							url:'https://www.mengzhiyuan.email:5001/set_user_property',
							method:'POST',
							data:{
								openid:userInfo.openid,
								value:userInfo_[item],
								property:item
							},success(res) {
								if(res.data.state==1){
									uni.current_this.store.state.user_info[item]=userInfo_[item]
									uni.showToast({
										icon:'success',
										title:'修改成功',
										duration:1000
									})
								}else{
									uni.showToast({
										icon:'error',
										title:'修改失败',
										duration:1000
									})
								}
							},fail() {
								uni.showToast({
									icon:'error',
									title:'网络错误'
								})
							}
						})
						}
						// 请求修改
					// userInfo_[item]=userInfo[item]
				})
				// userInfo_
			}
			function radioChange(e){
				userInfo_.sex=e.detail.value
			}
			
			let back=uni.current_this.back
			return {
				back,show_corp_fun,userInfo_,userInfo,info,reset_data,radioChange,submit_data
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '/uni.scss';
@import './index.scss';
@import '/btn.scss';
.user_name{
	outline:none;
	border:none;
	width:80px;
	padding:0 10x;
}
</style>