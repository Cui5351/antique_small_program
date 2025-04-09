<template>
	<view class="container font_color">
		<AICover :keytext="data.location + ',' +data.name + '详细介绍'"></AICover>
		<view class="pics head_tit">
			<view class="back" @click="back">
				<uni-icons type="left" style='margin-top:-1px;' size="25" color="white"></uni-icons>
				返回
			</view>
			<swiper class="swiper" autoplay circular>
				<swiper-item v-for="(item,index) in data.max_pic" :key="index">
					<view class="pic" @click="showPic(item)">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="info">
			<view class="description flex_c" style="flex-grow:unset;">
				<view class="title">
					<!-- <uni-icons type="location" size="30" color="rgb(95,78,86)"></uni-icons> -->
					{{data.name}}({{data.location}})
				</view>
				<view class="data" ref="data" style="transition: 1 ease;">
					<!-- <view v-for="(item,index) in data.description" :key="index"> -->
						<!-- &emsp;&emsp;{{item}} -->
					<!-- </view> -->
					{{ data.description2 }}
				</view>
				<view class="flex_j_a_r show_all" @click="show_all">
					{{data_height.state?'隐藏':'展开'}}<uni-icons type="bottom" size="20" color="rgb(95,78,86)"></uni-icons>
				</view>
			</view>
			<view class="suggest flex_c grows">
				<view class="flex_c_b">
					<view class="title_1">展览展品</view>
					<view @click="all_antique">
						全部
						<uni-icons color='rgb(95,78,86)' type="right"></uni-icons>
					</view>
				</view>
				<!--  -->
				<view>
					<view class="museums_one flex_j_a_c" @click="show_antique(item,index)" v-for="(item,index) in data.antique" :key="index">
						<view class="img" style="max-height: 300rpx;">
							<image :src="item.src" mode="aspectFill"></image>
						</view>
						<view class="">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="flex_c_b">
				<view class="title_1">文创产品</view>
				<view @click="gotoStore">
					文创商铺
					<uni-icons color='rgb(95,78,86)' type="right"></uni-icons>
				</view>
			</view>
			<view class="service-list" v-if="services.length > 0" style="padding-bottom: 30rpx;padding-top: 0;">
			 <view class="service-item" v-for="(item, index) in [...services]" :key="index" @click="enterService(item)">
			    <image :src="item.url" mode="aspectFill" class="service-pic"></image>
			    <view class="service-info">
			      <view class="service-name">{{ item.name }}</view>
			      <view class="service-desc">商品描述：{{ item.description.length >= 13 ? (item.description.substring(0,13) + '...') :item.description }}</view>
			    </view>
			      <view class="service-price">￥{{item.money?.toFixed(2)}}元</view>
				  <view style="display: flex;justify-content: space-between;padding: 0 10rpx;color:rgba(0,0,0,.5);margin: 10rpx 0;">
					  <view>销量：{{item.sale}}</view>
					  <view>库存：{{item.depository}}</view>
				  </view>
			  </view>
			  </view>
			  <view class="flex_c_b" style="margin-bottom: 50px;">
			  	<view class="title_1" @click="gotoTel">联系工作人员
					<uni-icons type="phone" size="30" color="rgb(95,78,86)"></uni-icons>
			  	<view @click="gotoTel">
			  	</view>
				</view>
			  </view>
			<!-- 获取店铺 -->
<!-- 			<view class="full flex_c grows">
				<view class="title_1">展览全景</view>
				<view class="full_ flex_j_a_r">
					<view class="cont"  @click="full_screen">
						<view class="full_btn">
							点击观看全景
						</view>
						<image class="max_image" :src="data.full_src" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="share grows">
			<view class="flex_j_a_c">
				<!-- <view>1</view> -->
				<button class="bt flex_j_a_r" plain @click="subscribe">
					<!-- <uni-icons color='rgb(77,92,136)' :type="state.subscribe?'star-filled':'star'" size='35'></uni-icons> -->
					<image style="width: 50rpx;height: 50rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Pentagram.svg" mode=""></image>
					预约门票
				</button>
			</view>
			<view class="flex_j_a_c">
				<!-- <view>1</view> -->
				<button open-type="share" class="bt flex_j_a_r" plain>
					<uni-icons color='rgb(95,78,86)' :type="state.share?'redo-filled':'redo'" size='35'></uni-icons>
					分享
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/request/request.js'
	import {reactive,ref} from 'vue'
	export default {
		mounted() {
			let query=uni.createSelectorQuery();
			let doms=query.select('.data')
			uni.current_this1=this
			doms.boundingClientRect(function(res){
				// uni.current_this1.data_height.height=res.height+100+'px'
				uni.current_this1.data_height.height=150+'px'
				uni.current_this1.data_height.min=150+'px'
				uni.current_this1.data_height.max=(res.height+100)+'px'
			}).exec(function(){
				//上述布局位置信息获取成功后执行的回调函数
			})
			this.loadStore()
		},
		onLoad(args) {
			// 拿数据
			this.id = args.id
			let that = this
					  uni.showLoading({
					  	title:'加载中'
					  })
			request.get("/Antique/GetAntiqueById",{
				id:this.id
			}).then(res => {
				that.data.name = res.name
				that.data.book_url = res.book_url
				that.data.tel = res.tel
				that.data.description = res.description
				that.data.description2 = res.description.substring(0,100) + '...'
				that.data.max_pic.push(res.avatar)
				that.data.location = res.location	
			}).catch(err => {
				console.log(err,'err');
			}).finally(() => {
			  uni.hideLoading()
		  })
			request.get("/Antique/GetAntiqueCollect",{
				antique_id:this.id,
				page:1,
				pageSize:6
			}).then(res => {
				that.data.antique.push(...res.list)
				console.log(res,'res');
			})
		},
				onShareAppMessage(res) {
					this.state.share=true
				    return {
						imageUrl:this.data.max_pic[0],
				        title: this.data.name, //分享的名称
				        path: `/pages/home/other_page/museum/museum?id=${this.id}`,
						desc:this.data.description.substring(0,30)+'...'
				        // mpId:'' //此处配置微信小程序的AppId
				    }
				},
				//分享到朋友圈
				onShareTimeline() {
				    return {
						imageUrl:this.data.max_pic[0],
						title: this.data.name, //分享的名称
				        type: 0,
				    }
				},
		setup() {
			let data=reactive({
				name:'',
				location:'',
				max_pic:[],
				description:'',
				description2:'',
				tel:'',
				antique:[],
				book_url:null,
				full_src:''
			})
			const id = ref(null)
			let state=reactive({
				subscribe:false,
				share:false,
			})
			function back(){
				uni.current_this.back()
			}
			function full_screen(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
				})
			}
			function all_antique(){
						// 现代风1
						// if(data.name=='长江艺术工程职业学院非遗传承院')
							// return
						uni.navigateTo({
							url:`/pages/home/other_page/show_antique3d/show_antique3d?id=${id.value}&location=${data.name}`,
						})
						// 古典风格2
						// uni.navigateTo({
							// url:'/pages/home/other_page/all_anitique/all_anitique'
						// })
						
			// 1
					// },
					// complete() {
					// 	uni.hideLoading()
					// }
				// })
			}
			function show_all(){
				data_height.state=!data_height.state
				// 40+
				if(data_height.state){
					// data_height.height=data_height.max
					data.description2 = data.description
				}else{
					data.description2 = data.description.substring(0,100) + '...'
				}
					// data_height.height=data_height.min
			}
			let data_height=reactive({
				height:'50%',
				min:'50%',
				max:'50%',
				state:false
			})
			function subscribe(){
				if(data.book_url == null || data.book_url == ''){
					uni.showModal({
						title:'系统提示',
						content:'该博物馆尚未填写预约网址,请联系联系工作人员进行预约',
						showCancel:false
					})
					return
				}
				// 跳转网页
				uni.navigateTo({
					url:"/pages/home/other_page/museum/book_url/book_url?src=" + data.book_url
				})
				
				// uni.showToast({
				// 	icon:'none',
				// 	title:'暂未开放'
				// })
			}
			function show_antique(item,index){
				// subscribe()
				uni.previewImage({
					urls:[...data.antique.map(item =>item.src)],
					current:index
				})
				// uni.navigateTo({
					// url:`/pages/home/other_page/show_antique3d/show_antique3d?${JSON.stringify(item)}`,
				// })
			}
			const services = reactive([])
			const loadStore = () => {
				request.get("/Antique/GetAntiqueStoreGoods",{
					id:Number(id.value)
				}).then(res => {
					services.push(...res.map(item =>({...item,store:[]})))
					console.log(res,'ress');
				}).catch(err => {
					console.log(err,'err');
				})
			}
			
			const enterService = (item) => {
				// 根据id获取详情数据
				uni.navigateTo({
					url:`/pages/store/other_page/store_page/store_page?id=${item.id}&store_id=${item.store_id}`
					// url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
				})
			}
			
			const showPic = (item) => {
				uni.previewImage({
					urls:[item]
				})
			}
			const  gotoStore = () => {
				uni.navigateTo({
					url:`/pages/store/other_page/store_list/store_list?museumId=${id.value}`
				})
			}
			const gotoTel = () => {
				if(data.tel == null|| data.tel.length <= 0){
					uni.showToast({
						icon:'none',
						title:'该博物馆未填写联系电话'
					})
					return
				}
				uni.makePhoneCall({
					phoneNumber:data.tel
				})
			}
			return {
				show_antique,subscribe,data_height,data,back,full_screen,all_antique,show_all,state,id,
				loadStore,
				services,
				gotoTel,
				enterService,
				showPic,
				gotoStore
			}
		}
	}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
