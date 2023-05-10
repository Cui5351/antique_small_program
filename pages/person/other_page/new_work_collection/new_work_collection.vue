<template>
	<back name='新建作品集'></back>
  <view class="containe">
      <view class="title">
      	<input v-model="info.title" type="text" maxlength="15" placeholder="新建作品集">
      </view>
	  <view class="description">
	  	<textarea v-model="info.description" name="" id="" cols="30" placeholder="作品集简介......" rows="7" maxlength="50"></textarea>
	  </view>
	  <view class="change">
		  <view class="flex_j_a_r" @click="set_mask">更换封面</view>
		  <view class="flex_j_a_r">
			  <image :src="info.mask" mode=""></image>
		  </view>
	  </view>
	  <view class="change">
	  		  <view class="flex_j_a_r">作品集置顶</view>
	  		  <view class="flex_j_a_r">
				  <switch :checked="info.top" color="rgb(110,121,226)"></switch>
	  		  </view>
	  </view>
	  <view class="range">
		  <view class="tit">选择分享范围</view>
		  <view class="chang" style="padding-left:10px;">
		  		  <view class="flex_j_a_r">公开</view>
		  		  <view class="flex_j_a_r">
		  				  <switch :checked="info.show_work=='show'" color="rgb(110,121,226)"></switch>
		  		  </view>
		  </view>
		  <view class="add">
			  <uni-icons type="plusempty" color="rgb(110,121,226)"></uni-icons>
			  选择好友</view>
	  </view>
	  <view class="btn2" @click="publish">发布</view>
  </view>
</template>

<script>
import back from '/components/back.vue'
import {ref,reactive} from 'vue'
export default{
  name:'',
  components:{
  	  back
  },
  setup(){
	let info=reactive({
		title:'',
		description:'',
		mask:'../../../../static/add.svg',
		show_work:'show',
		top:false
	})    
	function publish(){
		uni.current_this.no_develop('发布作品集')
	}
	function set_mask(){
		uni.current_this.no_develop('选择照片')
	}
	return{info,publish,set_mask}
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
@import '@/uni.scss';
</style>
