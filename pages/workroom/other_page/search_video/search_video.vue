<template>
	<back name='返回'></back>
  <view class="containe font_color">
		<view class="search flex_j_a_r">
			<view class="search_btn background">
				<input type="text" placeholder="搜索视频" v-model="text" maxlength="20" @confirm='search'>
			</view>
				<!-- <view class="search_txt"> -->
					<!-- <uni-icons color='gray' size='25' type='search'></uni-icons>搜索视频 -->
				<!-- </view> -->
		</view>
	  <view>
		  <view class="title">历史搜索</view>
		  <view class="history">
			  <view @click="input(item)" v-for="(item,index) in record" :key="index">{{item}}</view>
		  </view>
	  </view>
	  <view>
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
				<view>手工制作</view>
				<view>非遗传承视频</view>
				<view>非遗文物制作视频</view>
				<view>非遗</view>
				<view>文物</view>
			</view>
	  </view>
  </view>
</template>

<script>
import back from '/components/back.vue'
import {ref,reactive} from 'vue'
export default{
  name:'',
  mounted() {
	let that=this
	uni.getStorage({
		key:'search_history_video',
		success(res) {
			that.record.push(...res.data)
		}
	})
  },
  components:{
	  back
  },
  setup(){
	let text=ref('')
	let record=reactive([])
	function input(txt){
		text.value=txt
		search({detail:{value:txt}})
	}
	function search(e){
		if(record.length>=8)
			record.pop()
		record.unshift(e.detail.value)
		uni.setStorage({
			key:'search_history_video',
			data:[...record]
		})
	}
    return{text,input,search,record}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
