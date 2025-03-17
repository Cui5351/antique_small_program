<template>
  <view class="containerVessel">
    <!-- Carousel -->
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" interval="3000">
      <!-- <swiper-item v-for="(item, index) in swiperList" :key="index"> -->
      <swiper-item v-for="(item, index) in [data.avatar]" :key="index">
        <image :src="item" mode="aspectFill" class="swiper-image"/>
      </swiper-item>
    </swiper>
    
    <!-- Store Info -->
    <view class="store-info">
      <view class="store-name">{{data.name}}</view>
      <!-- <view class="store-meta">
        <text>已服务0次</text>
        <text class="separator">|</text>
        <text>评价率0%</text>
      </view> -->
      
      <!-- Business Hours and Address -->
      <view class="business-info">
        <view class="info-item">
          <!-- <text class="label">服务时间：</text> -->
          <!-- <text>{{data.businessHours}} {{data.status == 0 ? '营业中' : '休息中'}}</text> -->
        </view>
        <view class="info-item">
          <text class="label">服务地址：</text>
          <text>{{data.townName}}</text>
        </view>
      </view>
    </view>

    <!-- Tabs -->
    <view class="tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 0 }"
        @click="switchTab(0)"
      >商家服务</view>
<!--      <view 
        class="tab-item" 
        :class="{ active: currentTab === 1 }"
        @click="switchTab(1)"
      >评论</view> -->
    </view>

    <!-- Tab Content -->
    <view class="tab-content">
      <!-- Services List -->
      <view v-if="currentTab === 0" class="services-list">
		  <view class="service">
			<view class="service-item" v-for="(service, index) in services" :key="index" @click="switchSubTab(index)" :class="index == currentSubTab ? 'active':''">
				{{ service.name }}
			</view>
		  </view>
		  <view class="content">
			  <view class="content-item" v-for="(item,index) in services[currentSubTab].serviceList" @click="enterService(item)" v-if="services[currentSubTab].serviceList.length > 0">
			  <view>
				  <image :src="item.image" mode="aspectFit"></image>
			  </view>
			  <view>
				  <view class="title">{{item.name}}</view>
				  <view class="count">描述：{{item.serviceDetails}}</view>
				  <view class="money">￥{{item.pricePerSquare}}/{{item.unit}}</view>
			  </view>
			  </view>
			  <image class="null" v-else src="/static/空空如也.svg" mode=""></image>
		  </view>
      </view>
      <!-- Reviews -->
      <view v-else class="reviews">
        暂无服务
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'Store',
  onLoad(res) {
	  // 这里根据id来拿数据

	const store = JSON.parse(res.store)
	this.orderType = store.orderType
  	console.log(store,'res store');
	Object.keys(this.data).forEach(item => {
		this.data[item] = store[item]
	})
	console.log(store.services,'services');
	this.services.push(...store.services)
  },
  setup() {
    const currentTab = ref(0)
    const currentSubTab = ref(0)
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
    const swiperList = reactive([
      { url: '/static/js.jpg' },
      { url: '/static/js.jpg' }
    ])
    const services = reactive([])
    const switchTab = (index) => {
      currentTab.value = index
    }

    const switchSubTab = (index) => {
      currentSubTab.value = index
    }
	const enterService = (item) => {
		console.log(item,'item');
		Object.assign(item,{
			storeId:data.storeId
		})
		uni.navigateTo({
			url:'/pages/store/order/order?item='+JSON.stringify({...item,orderType:orderType.value})
		})
	}
    return {
		enterService,
	  currentSubTab,
	  switchSubTab,
      currentTab,
      swiperList,
      services,
      switchTab,
	  data,
	  orderType
    }
  }
}
</script>

<style scoped lang="scss">
.containerVessel {
	height: 100vh;
  background-color: #f5f5f5;
}

.swiper {
  height: 400rpx;
  
  .swiper-image {
    width: 100%;
    height: 100%;
  }
}

.store-info {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .store-name {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  
  .store-meta {
    font-size: 24rpx;
    color: #666;
    
    .separator {
      margin: 0 10rpx;
    }
  }
  
  .business-info {
    margin-top: 20rpx;
    font-size: 26rpx;
    
    .info-item {
      margin-bottom: 10rpx;
      
      .label {
        color: #666;
      }
    }
  }
}

.tabs {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    position: relative;
    
    &.active {
      color: #007AFF;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -20rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: #007AFF;
      }
    }
  }
}

.tab-content {
  background-color: #fff;
  height: calc(100vh - 360rpx);
  
  .services-list {
	  display: flex;
	  height: 100%;
	  .content{
		  position: relative;
		  flex-grow: 1;
		  overflow-y: auto;
		  .null{
			  position: absolute;
			  top:50%;
			  transform: translateY(-70%);
		  }
		  .content-item{
			  padding: 20rpx;
			  display: flex;
			  image{
				  height: 120rpx;
				  width: 120rpx;
				  margin-right: 15rpx;
			  }
			  .money{
				  color: red;
			  }
			  .count{
				  color: rgba(0,0,0,.5);
				  font-size: 25rpx;
				  padding:5rpx 0;
			  }
			  .title{
				  font-weight: bold;
			  }
		  }
	  }
	  .service{
		  min-width: 30%;
		  background-color: rgba(0,0,0,.05);
		  font-size: 28rpx;
		  .active{
			  background: rgba(80,190,255,0.2);
			  overflow-y:hidden;
			  &:before{
				  content: '';
				  height: 100rpx;
				  width: 10rpx;
				  background-color: #007AFF;
				  position: absolute;
				  left: 0;
				  top:0;
			  }
		  }
	  }
    .service-item {
	  position: relative;
      padding: 30rpx 20rpx;
      border-bottom: 1rpx solid #eee;
    }
  }
  
  .reviews {
    padding: 30rpx;
    text-align: center;
    color: #999;
  }
}
</style>