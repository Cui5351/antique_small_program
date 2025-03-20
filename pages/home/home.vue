<template>
		<loading :show_loading="show_loading"></loading>
	<view class="container font_color">
		<swiper class="swiper" indicator-color='gray' indicator-active-color='#ffffff' circular autoplay interval='2500' :indicator-dots="true">
			<swiper-item v-for="(item,index) in head_img" :key="index">
				<view class="swiper_item">
					<image :src="item"></image>
				</view>
			</swiper-item>
		</swiper>
		<scroll-view class="other background" scroll-y="true" scroll-with-animation="true" @scrolltolower="lower">
			<view class="box">			
	<!-- 		<view class="funs">
				<view class=".flex_j_a_c" @click="toggle_other(item)" v-for="(item,inex) in other" :key="index">
					<view class="icon">
						<image :src="item.pic" style="background-color: white;" mode=""></image>
					</view>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view> -->
			<view class="museums flex_c">
				<view class="museum_title">
					<view>博物馆展览</view>
					<view @click="more('all')">全部<uni-icons color="rgb(59,92,130)" type="right"></uni-icons>
					</view>
				</view>
				<view class="museums_">
					<view @click="museum(item)" class="museums_one flex_j_a_c" v-for="(item,index) in ['长江艺术工程职业学院非遗传承院','荆州博物馆']" :key="index">
						<view class="img">
							<image :src="base_url+'/image/antique/museum'+(index+1)+'.jpg'" mode=""></image>
						</view>
						<view class="">
							{{item}}
						</view>
					</view>
				</view>
			</view>
<!-- 			<view class="storys flex_c">
				<view class="story_title">
					<view>非遗故事</view>
					<view @click="more('more_category')">更多分类<uni-icons color="rgb(59,92,130)" type="right"></uni-icons>
					</view>
				</view>
				<view class="story_books">
					<view class="story_book" @click="story(item)" v-for="(item,index) in [1,2,3]" :key="index">
						<image :src="base_url+'/image/antique/story'+item+'.jpg'" mode=""></image>
					</view>
				</view>
			</view> -->
			<view class="works">
				<view class="story_title">
					<view>推荐视频</view>
					<view @click="search_page">更多视频<uni-icons color="rgb(59,92,130)" type="right"></uni-icons>
					</view>
				</view>
				<view class="work">
					<!-- <view class="w" v-for="(item,index) in video" @click="inter(item)">	
						<view class="mask">
							<image :src="item.mask" mode="aspectFill"></image>
						</view>
						<view class="tit">
							<view class="avatar">
								<image :src="item.avatar"></image>
							</view>
							<view>
								{{item.name}}
							</view>
						</view>
					</view> -->
					<view class="w" v-for="(item,index) in video" @click="inter(item)">
						<view class="mask">
							<image :src="item.mask" mode="widthFix"></image>
						</view>
						<view class="tit">
							<view class="avatar">
								<image :src="item.avatar"></image>
							</view>
							<view>
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		<view class="bottom">已经滑到底了</view>
		</view>
		</scroll-view>
		<!-- <button @click="loading" type="primary">加载动画</button> -->
	</view>
</template>

<script>
	import {ref,reactive} from 'vue'
	import loading from '@/pages/loading/loading.vue'
	export default {
				onShareAppMessage() {
				    return {
				        title: '博学苑', //分享的名称
				        path: '/pages/home/home',
				        // mpId:'' //此处配置微信小程序的AppId
				    }
				},
				//分享到朋友圈
				onShareTimeline() {
				    return {
				        title: '博学苑',
				        type: 0,
				    }
				},
		components:{
			loading
		},
		onTabItemTap() {
			// 重置
			this.reqs.skip = 0
			this.video.splice(0,this.video.length)
			this.lower()
		},
		mounted() {
			uni.current_this.inter=this.inter;
			this.lower()
		},
		setup(){
			let other=reactive([{
				name:"地图导览",
				pic:'/static/map.svg'
			},{
				name:"文物库",
				pic:'/static/storehouse.svg'
			},{
				name:"焦点新闻",
				pic:'/static/news.svg'
			},{
				name:"线下体验馆",
				pic:'/static/feelhouse.svg'
			}])
			let show_loading=ref(false)
			let reqs=reactive({state:false,skip:0})
			let base_url=ref(uni.current_this.baseURL)
			function loading(){
				show_loading.value=true
				setTimeout(()=>{
					show_loading.value=false
					uni.showToast({
						icon:'none',
						title:'该博物馆尚未开放'
					})
				},1000*Math.random()*10)
			}
			function toggle_other(item){
				if(item.name=='文物库'){
					uni.navigateTo({
						url:'/pages/home/other_page/antique_repository/antique_repository'
					})
				return
				}
				uni.showToast({
					icon:'none',
					title:item.name+'暂未开放'
				})
			}
			function more(name){
				if(name=='all'){
					uni.navigateTo({
						url:'/pages/home/other_page/all_museum/all_museum'
					})
					return
				}
			}
			function museum(name){
				let result;
				// 查看资源是否存在
				if(name=='荆州博物馆'){
				// 实现预加载
					result={
						name:'荆州博物馆',
						description:[`  荆州博物馆位于湖北省荆州市荆 路166号，是一座地方综
	合性博物馆，为国家AAAA级旅游景区，占地4.8万平方米。始
	建于1958年，馆舍占地面积5万余平方米，建筑面积达2.3万平
	方米，绿化面积11000多平方米。`,`荆州博物馆有馆藏文物13万余件，其中国家一级文物492件
	套。荆州博物馆配合各项工程建设，发掘出土珍贵文物12万余
	件。其中，有战国丝绸；吴王夫差矛；有战国秦汉漆器；有中
	国也是世界上最早的数学专著《算数书》和萧和“二年造律”
	的《二年律令》等汉初简牍；有西汉男尸。该馆配合各种基本
	建设，先后发掘了7000多座古墓葬和近20万平方米的古文化遗
	址。`,`1994年经国家文物局专家评选，该馆荣获中国地市级“十
	佳博物馆之首”的称号。2008年 物馆被列入国家一级博物馆
	名单。`],
							antique:[{name:'黑秞执壶',src:'https://www.mengzhiyuan.email/image/antique/粉彩缠枝花卉碗.jpg'},
							{name:'黑秞执壶',src:'https://www.mengzhiyuan.email/image/antique/青瓷狗.jpg'},
							{name:'黑秞执壶',src:'https://www.mengzhiyuan.email/image/antique/黄地粉彩龙纹杯.jpg'}],
							max_pic:['https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆1.jpg','https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆2.jpg','https://www.mengzhiyuan.email/image/antique/inter_top/荆州博物馆3.jpg'],
							full_src:'https://www.mengzhiyuan.email/image/antique/荆州博物馆全景图.jpg'
					}
				}else if(name=="长江艺术工程职业学院非遗传承院"){
					result={
										name:'长江艺术工程职业学院非遗传承院',
										description:[`荆州市荆楚非物质文化遗产技能传承院(简称传承院) ，是经荆州市文化和旅游局、荆州
										市非遗保护中心批准，依托长江艺术工程职业学院设立的非遗传习保护基地。
										`,`2015年被授予国家3A级旅游景区。`,`2017年10月，文化和旅游部在荆楚非遗传承院设立国家传统工艺(荆州)工作站，由清华大学美术学院为驻站单位，
										 以“见人、见物、见生活"为理念，为新时代振兴传统工艺提供示范，让传统工艺在当代生活得到新的广泛应用。`],
											antique:[{name:'淡水贝雕',src:'https://www.mengzhiyuan.email/image/antique/changyi/淡水贝雕.jpeg'},
											{name:'葫芦烙画',src:'https://www.mengzhiyuan.email/image/antique/changyi/葫芦.jpeg'},
											{name:'古筝',src:'https://www.mengzhiyuan.email/image/antique/changyi/古筝.jpeg'},
											{name:'漆艺',src:'https://www.mengzhiyuan.email/image/antique/changyi/漆艺.jpeg'}],
											max_pic:['https://www.mengzhiyuan.email/image/antique/changyi/传承院.jpg',
											'https://www.mengzhiyuan.email/image/antique/changyi/传承院2.jpg',
												'https://www.mengzhiyuan.email/image/antique/museum1.jpg'
												],
											full_src:'https://www.mengzhiyuan.email/image/antique/changyi/full.jpg'
									}
				}
				uni.navigateTo({
					url:`./other_page/museum/museum?data=${JSON.stringify(result)}`
				})
				
			}
			function story(name){
				uni.showToast({
					icon:'none',
					title:'非遗故事'+name+'暂时未开放'
				})
			}
						function inter(item){
							uni.request({
								url:uni.current_this.baseURL+':5001/get_video',
								method:"POST",
								data:{
									uuid:item.uuid
								},
								success(res) {
									if(uni.current_this.check_res_state(res)){
										return
									}
									console.log(res,'inter');
									if(!res.data.data.arr.length){
										uni.showToast({
											title:'该作品集为空',
											icon:'none'
										})
										return
									}
									uni.navigateTo({
										url:`/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data.arr)}&title=${res.data.data.arr[0].title}&avatar=${res.data.data.avatar}&name=${res.data.data.name}&openid=${res.data.data.openid}`
									})
								}
							})
						}
			let video=reactive([])
			let head_img=reactive(['https://www.mengzhiyuan.email/image/antique/home_top/title1.jpg',
			'https://www.mengzhiyuan.email/image/antique/home_top/title2.jpg',
			'https://www.mengzhiyuan.email/image/antique/home_top/title3.jpg'])
			function lower(e){
				if(reqs.state)
					return
				reqs.state=true
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				uni.request({
					url:uni.current_this.baseURL+':5001/get_hottest_video',
					method:"GET",
					data:{
						skip:reqs.skip
					},
					success(res) {
						if(uni.current_this.check_res_state(res)){
							return
						}
						if(res.data.data.length<=0){
							uni.showToast({
								title:'已经滑到底了'
							})
							return
						}
						video.push(...res.data.data) 
						reqs.skip+=res.data.data.length
					},complete() {
						setTimeout(()=>{
							// 首页视频最多20
							if(video.push.length>=20)
								return
							reqs.state=false
						},1000)
						uni.hideLoading()
					}
				})
			}
			function search_page(){
				uni.navigateTo({
					url:'/pages/workroom/other_page/search_video/search_video'
				})
			}
			return{head_img,search_page,reqs,loading,inter,video,story,more,museum,show_loading,base_url,other,toggle_other,lower}
		}
	}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '/uni.scss';
</style>
