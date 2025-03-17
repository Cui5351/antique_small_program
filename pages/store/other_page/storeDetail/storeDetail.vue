<template>
  <view class="containerVessel">
    <!-- 门店轮播图 -->
    <swiper class="store-swiper" indicator-dots autoplay circular>
      <swiper-item v-for="(img, index) in carousel" :key="index">
        <image :src="img" mode="aspectFill" class="swiper-image"></image>
      </swiper-item>
    </swiper>
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
		this.storeName = res.name
		return
		const store = JSON.parse(res.store)
		this.orderType = store.orderType
		console.log(store,'res store');
		Object.keys(this.data).forEach(item => {
			this.data[item] = store[item]
		})
		console.log(store.services,'services');
		this.services.push(...store.services)
	},
	onShow() {
		this.search.page = 1
		this.services.splice(0,this.services.length)
		this.loadData()
	},
	methods:{
		loadData(){
			uni.showLoading({
				title:'加载商品中'
			})
			request.get('/StoreItem/list',{
				store:this.storeName,
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
	const storeName = ref('')
    const currentSubTab = ref(0)
	const carousel = reactive([
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel1.png',
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel2.png',
		'https://www.mengzhiyuan.email/antique/storeCarousel/carousel3.png'
	])
	const search = reactive({
		page:1,
		pageSize:10
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
		console.log(item,'item');
		// if(!uni.current_this.store.getters.login_state){
		// 	uni.showModal({
		// 		title:"系统提示",
		// 		content:"请先登录",
		// 		showCancel:false,
		// 		success() {
		// 			uni.switchTab({
		// 				url:'/pages/person/person'
		// 			})
		// 		}
		// 	})
		// 	return
		// }
		Object.assign(item,{
			storeId:data.storeId
		})
		// 根据id获取详情数据
		uni.navigateTo({
			url:`/pages/store/other_page/store_page/store_page?id=${item.id}&name=${item.name}`
			// url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
		})
	}
    return {
		enterService,
	  currentSubTab,
	  switchSubTab,
      currentTab,
      swiperList,
	  carousel,
	  storeName,
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
  padding: 20rpx;
  height: 100vh;
  overflow-y: auto;
}
.store{
	height: calc(100vh - 350rpx);
}
.store-swiper {
  height: 400rpx;
  margin-bottom: 20rpx;
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
  width: 45%;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: 10rpx;
  padding: 10rpx;
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