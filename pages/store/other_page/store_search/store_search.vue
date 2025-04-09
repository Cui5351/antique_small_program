<template>
	<back name='返回'></back>
  <view class="containe font_color">
		<view class="search flex_j_a_r">
			<view class="search_btn background">
				<input type="text" placeholder="搜索商品" v-model="text" maxlength="20" confirm-type="search" @confirm="search_result({model:'input',t:text})" />
			</view>
				<!-- <view class="search_txt"> -->
					<!-- <uni-icons color='gray' size='25' type='search'></uni-icons>搜索视频 -->
				<!-- </view> -->
		</view>
		<view class="v_result" v-show="show_state=='label'">
			<!-- <view class="item" v-for="(item,index) in video_label" @click="inter({uuid:item.work_uuid})"> -->
			<view class="item" v-for="(item,index) in video_label" @click="search_result({model:'click',t:item.name})">
				{{item.name}}
			</view>
		</view>
	  <view v-show="show_state=='empty'">
		  <view class="title">历史搜索</view>
		  <view class="history">
			  <view @click="search_result({model:'click',t:item})" v-for="(item,index) in record" :key="index">{{item}}</view>
		  </view>
	  </view>
		  <view v-if="show_state=='video'" style="width: 100%;display: flex;padding: 20rpx 20rpx;box-sizing: border-box;background-color: white;justify-content: space-around;">
		  	<view @click="toggleSearch('all')" :class="searchType.all ? 'highTxt':''">最新</view>
		  	<view @click="toggleSearch('price')" :class="searchType.price != '' ? 'highTxt':''">
		  		价格
		  		<uni-icons :color="searchType.price == 'asc' ? 'rgb(180,170,156)' :''" v-if="searchType.price == 'asc'" type="top"></uni-icons>
		  		<uni-icons :color="searchType.price == 'desc' ? 'rgb(180,170,156)' :''" v-else type="bottom"></uni-icons>
		  	</view>
		  	<view @click="toggleSearch('sale')" :class="searchType.sale ? 'highTxt':''">销量</view>
		  </view>
	  <scroll-view v-show="show_state=='video'" class="video_set" @scrolltolower="loadData" scroll-y>
		  <view class="noContent" v-show="!services.length">暂无该商品</view>
		  <view class="service-list">
			<view class="service-item" v-for="(item, index) in [...services]" :key="index" @click="enterService(item)">
			   <image :src="item.url" mode="aspectFill" class="service-pic"></image>
			   <view class="service-info">
				 <view class="service-name">{{ item.name }}</view>
				 <view class="service-desc">商品描述：{{ item.description.length >= 10 ? (item.description.substring(0,10) + '...') :item.description }}</view>
			   </view>
				 <view class="service-price">¥{{item.money?.toFixed(2)}}元</view>
					  <view style="display: flex;justify-content: space-between;padding: 0 10rpx;color:rgba(0,0,0,.5);margin: 10rpx 0;">
						  <view>销量：{{item.sale}}</view>
						  <view>库存：{{item.depository}}</view>
					  </view>
			 </view>
		</view>
	  </scroll-view>
<!-- 	  <view v-show="show_state=='empty'">
		<view class="title flush_btn">热门搜索
			<view class="flex_j_a_r">
				<view style="margin-right:5px;">
					<uni-icons type="refreshempty"></uni-icons>
				</view>|
					<view style="margin-left:5px;">
					<uni-icons type="eye"></uni-icons>
				</view>
			</view>
		</view>
			<view class="hot_search">
				<view v-for="(item,index) in ['手工制作','非遗传承视频','非遗文物制作视频','非遗','文物']" :key="index" @click="fill(item)" >{{item}}</view>
			</view>
	  </view> -->
  </view>
</template>

<script>
import back from '/components/back.vue'
import request from '@/request/request.js'
import {ref,reactive,watch} from 'vue'
export default{
  name:'',
  mounted() {
	let that=this
	uni.getStorage({
		key:'search__store',
		success(res) {
			that.record.push(...res.data)
		}
	})
  },
  components:{
	  back
  },
  methods:{
  	loadData(){
  		uni.showLoading({
  			title:'加载商品中',
  			mask:true
  		})
		if(this.text.trim().length <= 0){
			return
		}
  		// GetGoodsBySale
  		request.get("/StoreItem/GetGoodsBySale",{
  			...this.searchOption,
  			...this.searchType,
			name:this.text
  		}).then(res => {
			this.show_state = 'video'
  			if(res.list.length <= 0){
  				uni.showToast({
  					title:'已经没有更多了',
  					icon:'none'
  				})
  				return
  			}
  			this.services.push(...res.list)
  			this.searchOption.page = res.pageNum + 1
  			return
  		}).catch(err => {
  			console.log(err,'err');
  		}).finally(() =>{
			this.search_state=false
			uni.hideLoading()})
  	}
  },
  setup(){
	let text=ref('')
	const services = reactive([])
	let record=reactive([])
	let video_label=reactive([])
	let videos=reactive([])
	function input(txt){
		text.value=txt
		search({detail:{value:txt}})
	}
	let timer=''
	let search_state=ref(false)
	watch(text,(n)=>{
		if(search_state.value)
			return
		if(timer){
			clearTimeout(timer)
		}
		timer=setTimeout(()=>{
			search({detail:{value:n}})
		},700)
	})
	function clear_video_label(){
		let n=video_label.length
		for(let i=0;i<n;i++){
			video_label.pop()
		}
	}
	function clear_video(){
		let n=videos.length
		for(let i=0;i<n;i++){
			videos.pop()
		}
	}
	let searchOption = reactive({
		page:1,
		pageSize:10
	})
	// empty,label,video
	let show_state=ref('empty')
	let skip=ref(0)
	function search_result({model,t}){
		if(model!='input'){
			search_state.value=true
			text.value=t
		}
		searchOption.page = 1
		searchOption.pageSize = 10
		toggleSearch('all')
	}
	watch(show_state,(n)=>{
		if(n=='empty'){
			skip.value=0
			clear_video()
			clear_video_label()
		}else if(n=='label'){
			clear_video()
			skip.value=0
		}
	})
	function search(e){
		if(e.detail.value.trim().length<=0){
			show_state.value='empty'
			return
		}
		if(record.length>=8)
			record.pop()
		record.unshift(e.detail.value)
		if(e.detail.value.trim().length <= 0){
			return
		}
		// 发送搜索请求
		// GetGoodsLabelByName
		uni.showLoading({
			title:'加载商品中',
			mask:true
		})
		request.get("/StoreItem/GetGoodsLabelByName",{
			name:e.detail.value
		}).then(res => {
			clear_video_label()
					if(res.length>0){
						video_label.push(...res.map(item=>({name:item})))
						show_state.value='label'
					}else{
						show_state.value='empty'
					}
		}).finally(() =>{
			search_state.value=false
			uni.hideLoading()})
		uni.setStorage({
			key:'search__store',
			data:[...record]
		})
	}
	function fill(item){
		text.value=item
	}		
		
		const searchType = reactive({
			sale:0,
			all:1,
			price:''
		})
		
		const toggleSearch = (type) => {
				if(type == 'all'){
					searchType.all = 1
					// 清除所有
					searchType.sale = 0
					searchType.price = ''
				}else if(type == 'price'){
					// 判断是否存在，如果存在即切换type
					searchType.all = 0
					searchType.sale = 0
					if(searchType.price == 'asc' || searchType.price == 'desc'){
						searchType.price = searchType.price == 'asc' ? 'desc' : 'asc'
					}else{
						searchType.price = 'asc'
					}
				}else if(type == 'sale'){
					searchType.all = 0
					searchType.price = ''
					searchType.sale = searchType.sale == 0 ? 1:0
				}
				searchOption.page = 1
				if(text.value.trim().length <= 0){
					return
				}
				uni.showLoading({
					title:'加载商品中',
					mask:true
				})
				request.get("/StoreItem/GetGoodsBySale",{
					name:text.value,
					...searchType,
					...searchOption
				}).then(res => {
					show_state.value = 'video'
					services.splice(0,services.length)
					if(res.list.length <= 0){
						uni.showToast({
							title:'已经没有更多了',
							icon:'none'
						})
						return
					}
					services.push(...res.list)
					searchOption.page = res.pageNum + 1
				}).catch(err => {
					console.log(err,'err');
				}).finally(() =>{
					search_state.value=false
					uni.hideLoading()})
			}
	const enterService = (item) => {
		// 根据id获取详情数据
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${item.id}&store_id=${item.store_id}`
			// url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
		})
	}
    return{text,enterService,input,search,record,search_state,fill,show_state,video_label,search_result,videos,services,toggleSearch,searchType,searchOption}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
