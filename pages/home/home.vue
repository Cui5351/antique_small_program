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
			<view class="funs">
				<view class=".flex_j_a_c" @click="toggle_other(item)" v-for="(item,inex) in other" :key="index">
					<view class="icon">
						<image :src="item.pic" style="background-color: white;" mode=""></image>
					</view>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view>
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
			<view class="storys flex_c">
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
			</view>
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
		mounted() {
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
				}
				// switch(item.name){
					// case '焦点新闻':{
						// uni.navigateTo({
							// url:'/pages/home/other_page/news/news'
						// })
					// };
				// }
				return
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
				// 查看资源是否存在
				if(name!='荆州博物馆'){
					uni.showToast({
						title:name+'暂未开放',
						icon:'none'
					})
					return
				}
				// 实现预加载
				let result={
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
						antique:[{name:'黑秞执壶',src:'https://www.mynameisczy.asia/image/antique/粉彩缠枝花卉碗.jpg'},
						{name:'黑秞执壶',src:'https://www.mynameisczy.asia/image/antique/青瓷狗.jpg'},
						{name:'黑秞执壶',src:'https://www.mynameisczy.asia/image/antique/黄地粉彩龙纹杯.jpg'}],
						max_pic:['https://www.mynameisczy.asia/image/antique/inter_top/荆州博物馆1.jpg','https://www.mynameisczy.asia/image/antique/inter_top/荆州博物馆2.jpg','https://www.mynameisczy.asia/image/antique/inter_top/荆州博物馆3.jpg'],
						full_src:'https://www.mynameisczy.asia/image/antique/荆州博物馆全景图.jpg'
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
									if(!res.data.data.length){
										uni.showToast({
											title:'该作品集为空',
											icon:'none'
										})
										return
									}
									uni.navigateTo({
										url:`/pages/workroom/other_page/play_video/play_video?video=${JSON.stringify(res.data.data)}&title=${item.title}&avatar=${item.avatar}&name=${item.name}`
									})
								}
							})
						}
			let video=reactive([])
			let head_img=reactive(['https://www.mynameisczy.asia/image/antique/home_top/title1.jpg',
			'https://www.mynameisczy.asia/image/antique/home_top/title2.jpg',
			'https://www.mynameisczy.asia/image/antique/home_top/title3.jpg'])
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
