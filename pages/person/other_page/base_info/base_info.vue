<template>
	<view class="container">
		<!-- <navigation2 title='返回'></navigation2> -->
		<view class="head_two">
			<view @click='back'>
				<uni-icons type="left"></uni-icons>
				返回
			</view>
		</view>
		<view class="vessel grows">
			<view class="base_info">
			<view class="item avatar flex_j_a_r">
				<view @click="show_corp_fun" :style="{borderRadius:50+'%',overflow:'hidden'}">
					<image :src="userInfo_.avatar" style="width: 100%;height: 100%;overflow: hidden;"></image>
				</view>
			</view>
			<view class="item name">
				<view class="title ">姓名</view>
				<view>
					<input type="nickname"  class='user_name' v-model='userInfo_.name' placeholder="name" />
				</view>
			</view>
			<view class="item">
				<view class="title">性别</view>
					<view style="display:flex">
						<radio-group @change="radioChange">
						<label class="radio"><radio color="rgb(79,70,229)" value="男" :checked="userInfo_.sex=='男'" />男</label>&emsp;
						<label class="radio"><radio color="rgb(79,70,229)" value="女" :checked="userInfo_.sex=='女'"/>女</label>
						</radio-group>
					</view>
				<!-- <view>{{userInfo.gender}}</view> -->
			</view>
			<view class="item" style="height:150px;">
				<view class="title">个人简介</view>
				<view style="padding:5px;box-sizing:border-box;width: 60%;height:100%;">
					<textarea placeholder="请输入您的自我简介" v-model="userInfo_.introduce" style="border: 1px solid rgba(0,0,0,.1);width: 100%;height:100%;padding: 5px 5px;box-sizing: border-box;" cols="20" rows="5" maxlength="45"></textarea>
				</view>
			</view>
			</view>
			<view class="butt">
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
					url:'/pages/person/other_page/avatar_edit/avatar_edit'
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
							url:'https://www.mynameisczy.asia:5001/set_user_property',
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
										title:'修改成功'
									})
								}else
									uni.showToast({
										icon:'error',
										title:'修改失败'
									})
							},complete() {
								uni.hideLoading()
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