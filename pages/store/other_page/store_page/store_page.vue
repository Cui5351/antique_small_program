<template>
  <view class="head_two des head_tit" @click="back">
	  <view class="flex_j_a_r">
		<uni-icons type="left" size="25" style='margin-top:2px;'></uni-icons>非遗集市
	  </view>
  </view>
  <view class="container">
	<view class="store_info">
		<view class="picture">
			<swiper class="swi" circular indicator-dots indicator-active-color="white">
				<swiper-item v-for="(item,index) in info.pic" :key="index">
					<view class="pic">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="description flex_j_a_r">
			<view class="des flex_j_a_c">
				<view class="money">￥{{info.money}}</view>
				<view style="margin-top: 5px;">
					{{info.description.length>=20?info.description.substring(0,20)+'...':info.description}}
				</view>
			</view>
			<button open-type="share" plain class="three_size flex_j_a_c share">
			<!-- <view class="three_size flex_j_a_c"> -->
				<uni-icons type="redo" style='height:30px;' size="20"></uni-icons>分享
			<!-- </view> -->
			</button>
		</view>
		<view class="rank flex_j_a_r">
			<view class="tit two_size">排行榜</view>
			<view class="flex_j_a_r three_size">店铺商品热榜第
				<view style="color:#6E79E2">
					3
				</view>
			名</view>
		</view>
		<view class="transport flex_j_a_r three_size">
			<view class="flex_j_a_r" style="color: gray;">运费
			<view class="money" style="color: black;">￥{{info.transport_money}}.00</view>
			</view>
			<view style="color: gray;">已售{{info.sale}} | 剩余{{info.depository}}</view>
		</view>
		<view class="bought_person_count flex_j_a_c">
			<view class="tit">
				<view class="">{{full.bought_log.length}}人已购买</view>
				<view class="small_title" @click="show_all">查看全部
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="all flex_j_a_c three_size">
				<view class="user"  v-for="(item,index) in info.bought_log" :key="index">
					<view class="flex_j_a_r">
						<view class="avatar">
							<image :src="item.user_avatar" mode=""></image>
						</view>
						{{item.user_name}}
					</view>
					<view class="right three_size flex_j_a_r ">
						<view class="txt">{{item.bought_date}}购买{{item.bought_count}}件</view>
						<view class="go_buy" @click="show_all">去下单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bought_person_count2 cc flex_j_a_c">
			<view class="tit">
				<view class="">商品评价({{info.comment.length}})</view>
				<view class="small_title" @click="show_all">好评率：0%
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="all flex_j_a_c comment three_size">
				<view class="flex_j_a_c" v-for="(item,index) in info.comment" :key="index">
					<view class="name flex_j_a_r">
						<view class="flex_j_a_r">
							<view class="pic">
								<image :src="item.avatar" mode=""></image>
							</view>{{item.name}}
						</view>
						<view class="">
							<uni-rate activeColor="#6E79E2" readonly :value="5"/>
						</view>
					</view>
					<view class="content">
						{{item.info}}
					</view>
				</view>
			</view>
		</view>
		<view class="store_other"><!-- store_other --></view>
		
	</view>
  </view>
  <view class="bottom flex_j_a_r">
	  <view class="other flex_j_a_r">
			<view class="flex_j_a_c"  @click="show_all">
				<view class="pic">
					<image src="/static/store_page/info_server.svg"  style="background-color: white;" mode=""></image>
				</view>
					客服
			</view>
			<view class="flex_j_a_c"   @click="show_all">
				<view class="pic">
					<image style="background-color: white;" src="/static/store_page/store.svg" mode=""></image>
				</view>
				店铺</view>
			<view class="flex_j_a_c"  @click="show_all">
				<view class="pic">
					<image style="background-color: white;" src="/static/store_page/shop_car.svg" mode=""></image>
				</view>
				购物车</view>
	  </view>
	  <view class="btn flex_j_a_r three_size">
	  	<view class="flex_j_a_r background1" @click="join_car">加入购物车</view>
	  	<view class="flex_j_a_r" @click="buy">购买</view>
	  </view>
	</view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
	onLoad(res) {
		uni.showLoading({
			title:'商品加载中'
		})
		let that=this
		if(res.state==1){
				if(!uni.current_this.store.getters.login_state){
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});
					uni.switchTab({
						url:'/pages/person/person'
					})
					return
				}
				uni.request({
					url:uni.current_this.baseURL+':5001/getStoreInfo',
					method:'POST',
					data:{
						name:res.name
					},success(res2) {
						if(res2.data.state!=1){
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
						info.pic.push(...res2.data.data.pic.map(item=>item.src))
						Object.keys(info).forEach(item=>{
							if(item=='pic'||item=='bought_log'||item=='comment')
								return
							that.info[item]=res2.data.data.info[item]
						})
						get_count(res.name)
				},complete() {
					uni.hideLoading()
				}
				})
			return
	}
			let data=JSON.parse(res.info)
			Object.keys(this.info).forEach(item=>{
				if(item=='pic'){
					this.info.pic.push(...data.pic)
					return
				}
				if(data[item]==undefined)
					return
				this.info[item]=data[item]
			})
			get_count(data.name)
			uni.hideLoading()
			
		function get_count(name){
			
			// 获取购买商品数
			uni.request({
				url:uni.current_this.baseURL+':5001/get_goods',
				method:"POST",
				data:{
					goods_name:name
				},
				success(res) {
					if(res.data.state!=1){
						return
					}
					function format(date){
						let month=date.getMonth()==12?1:date.getMonth()+1
						let day=date.getDate()
						let now=new Date()
						if(now.getFullYear()==date.getFullYear())
						return `${month<10?'0'+month:month}月${day<10?'0'+day:day}日`
						else
							return `${date.getFullYear()}年${month<10?'0'+month:month}月${day<10?'0'+day:day}日`
					}
					res.data.data.forEach(item=>{
						item.bought_date=format(new Date(item.bought_date))
					})
					// 保存三条
					that.info.bought_log.push(...(res.data.data.reverse().slice(0,3)))
					// 保存全部的交易记录
					that.full.bought_log.push(...res.data.data)
				}
			})
		}
	},
  onShareAppMessage(res) {
      return {
  		imageUrl:this.info.pic[0],
          title: this.info.name, //分享的名称
          path: `/pages/store/other_page/store_page/store_page?name=${info.name}&state=1`,
      }
  },
  //分享到朋友圈
  onShareTimeline() {
      return {
  		imageUrl:this.info.pic[0],
  		title: this.info.name, //分享的名称
          type: 0,
      }
  },
  setup(){
	let info=reactive({
		count:1,
		name:'',
		money:0,
		sale:0,
		depository:0,
		src:'',
		description:'',
		store:'',
		pic:[],
		comment:[],
		bought_log:[],
		transport_money:0
	})
	let full=reactive({
		bought_log:[],
		comment:[]
	})
	let back=uni.current_this.back
	function join_car(){
		uni.showToast({
			title:'暂未开放',
			icon:'none'
		})
	}
	function show_all(){
		uni.showToast({
			title:'暂未开放',
			icon:'none'
		})
	}
	function buy(){
		if(!uni.current_this.store.getters.login_state){
			uni.showToast({
				title: '请先登录',
				icon:'none'
			});
			uni.switchTab({
				url:'/pages/person/person'
			})
			return
		}
		uni.showLoading({
			title:'购买中',
			mask:true
		})
		uni.request({
			url:uni.current_this.baseURL+':5001/buy_goods',
			method:'POST',
			data:{
				openid:uni.current_this.store.getters.openid,
				goods_name:info.name,
				count:1
			},
			success(res) {
				console.log(res,'res');
				if(res.data.state!==1){
					uni.hideLoading()
					uni.showToast({
						title:'购买失败',
						icon:'error'
					})
				}
				// uni.current_this.store.dispatch('buy',JSON.stringify(that.info))
				setTimeout(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'购买成功',
						mask:true
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/person/other_page/bills/bills'
						})
					},500)
				},Math.random()*1000)
				}
		})
		return
	}
    return{back,info,join_car,show_all,buy,full}
  }
}
</script>

<style scoped lang='scss'>
@import '/uni.scss';
@import './index.scss';
</style>
