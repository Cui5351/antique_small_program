<template>
  <view class="containerVessel">
    <!-- 门店轮播图 -->
    <swiper class="store-swiper" indicator-dots autoplay circular>
      <swiper-item v-for="(img, index) in store.carousel" :key="index">
        <image :src="img.src" mode="aspectFill" class="swiper-image"></image>
      </swiper-item>
    </swiper>
	<view style="height: 100rpx;line-height: 70rpx;background: white;text-align: center;display: flex;justify-content: space-between;padding: 0 40rpx;">
		<!-- 商品列表 -->
		<view class="flex_j_a_r" style="gap:40rpx">
			<image style="width: 80rpx;height: 80rpx;border-radius: 20rpx;" :src="store.src" mode="aspectFill"></image>
			{{store.name}}
		</view>
		<view style="line-height: 100rpx;color: rgba(0,0,0,.5);">欢迎进店下单</view>
	</view>
    <!-- 服务内容 -->
    <scroll-view class="store" scroll-y @scrolltolower="loadData">
	<view class="service-list" v-if="services.length > 0">
     <view class="service-item" v-for="(item, index) in [...services]" :key="index" @click="enterService(item)">
        <image :src="item.url" mode="aspectFill" class="service-pic"></image>
        <view class="service-info">
          <view class="service-name">{{ item.name }}</view>
          <view class="service-desc">商品描述：{{ item.description.length >= 10 ? (item.description.substring(0,10) + '...') :item.description }}</view>
        </view>
          <view class="service-price">￥{{item.money?.toFixed(2)}}元</view>
		  <view style="display: flex;justify-content: space-between;padding: 0 10rpx;color:rgba(0,0,0,.5);margin: 10rpx 0;">
			  <view>销量：{{item.sale}}</view>
			  <view>库存：{{item.depository}}</view>
		  </view>
      </view>
	  </view>
<!-- 	  <view v-else class="reviews">
	    暂无商品
	  </view> -->
	  <view v-else class="reviews">
	    暂无商品
	  </view>
    </scroll-view>
  </view>
</template>

<script>
import { reactive ,ref} from 'vue';
	import request from "@/request/request.js"
export default {
	onLoad(res) {
		console.log(res,'res');
		this.store_id = res.id
	},
	mounted() {
		this.loadStoreData()
	},
	onShow() {
		this.search.page = 1
		this.services.splice(0,this.services.length)
		this.loadData()
	},
	methods:{
		loadStoreData(){
			let that = this
			request.get("/Store/getStoreById",{
				// page:1,
				// pageSize:1,
				id:this.store_id
			}).then(res => {
				console.log(res,'ress');
				if(res.id == null){
					uni.showToast({
						title:'这个店铺已下架',
						icon:'none'
					})
					return
				}
				that.store.name = res.name
				that.store.description = res.description
				that.store.src = res.src
				that.store.carousel = res.carousel
			}).catch(err => {
				console.log(err,'err');
			}).finally(() =>{uni.hideLoading()})
		},
		loadData(){
			uni.showLoading({
				title:'加载商品中',
				mask:true
			})
			request.get('/StoreItem/UserList',{
				store_id:this.store_id,
				...this.search
			}).then(res => {
				if(res.list.length <= 0){
					uni.showToast({
						title:'已经没有更多了',
						icon:'none'
					})
					return
				}
				this.services.push(...res.list)
				this.search.page = res.pageNum + 1
				console.log(res,'res');
			}).catch(err => {
				console.log(err,'err');
							}).finally(() =>{uni.hideLoading()})
		}
	},
  setup() {
    const currentTab = ref(0)
	const store_id = ref('')
	let store = reactive({
		name:'',
		description:'',
		src:'',
		carousel:[]
	})
    const currentSubTab = ref(0)
	const carousel = reactive([
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel1.png',
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel2.png',
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel3.png'
	])
	const search = reactive({
		page:1,
		pageSize:10,
		sale:1
	})
	const orderType = ref(null)
	const data = reactive({
		avatar:'',
		businessHours:'',
		name:'',
		storeType:'',
		townName:'',
		storeId:'',
		status:1
	})
    const swiperList = reactive([])
    const services = reactive([])
    const switchTab = (index) => {
      currentTab.value = index
    }

    const switchSubTab = (index) => {
      currentSubTab.value = index
    }
	const enterService = (item) => {
		// 根据id获取详情数据
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${item.id}&store_id=${item.store_id}`
			// url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
		})
	}
    return {
		enterService,
	  currentSubTab,
	  switchSubTab,
      currentTab,
	  store,
      swiperList,
	  carousel,
	  store_id,
	  search,
      services,
      switchTab,
	  data,
	  orderType
    }
  }
};
</script>

<style scoped lang="scss">
.containerVessel {
  height: 100vh;
  color: rgb(95,78,86);
  overflow-y: auto;
}
.store{
	height: calc(100vh - 400rpx - 100rpx);
	padding:0 10rpx;
	box-sizing: border-box;
}
.store-swiper {
  height: 400rpx;
  .swiper-image {
    width: 100%;
    height: 100%;
  }
}

.service-tags {
  display: flex;
  overflow-y: auto;
  margin-bottom: 20rpx;
  background-color: white;
  padding: 20rpx;
}
.reviews{
	position: absolute;
	color: rgba(0,0,0,.5);
	left: 50%;
	top:100%;
	transform: translateX(-50%);
}
.tag {
	width: fit-content;
	min-width: fit-content;
	font-weight: bold;
  padding: 10rpx 20rpx;
  margin-right: 10rpx;
  background-color: white;
  border-radius: 5rpx;
  cursor: pointer;
}

.tag.active {
  color: rgb(48,126,255);
}

.service-list {
	padding-bottom: 50rpx;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  min-height: 300rpx;
  justify-content: space-between;
}

.service-item {
  width: 45.5%;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: 10rpx;
  padding:20rpx 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.service-pic {
	width: 100%;
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rpx;
}

.service-info {
  padding: 10rpx;
}

.service-name {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}

.service-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.service-price {
  font-size: 32rpx;
  color: #ff4949;
}
</style>