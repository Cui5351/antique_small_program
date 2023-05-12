<template>
	<back name="返回"></back>
  <view class="containe">
      <view class="person">
		  <view class="hd">
			  <view class="avatar">
				  <image :src="info.avatar" mode=""></image>
			  </view>
			  <view>
				  <view class="name">{{info.name}}</view>
				  <view class="date">{{info.send_date}}</view>
				  <view class="place">{{info.place}}</view>
			  </view>
		  </view>
		  <view class="flex_j_a_c">
			  <uni-icons type="star" size="20"></uni-icons>
		  </view>
	  </view>
	  <view class="content">{{info.content}}</view>
	  <view class="pic" v-if="info.src[0]!=null">
	  	<image :src="item2" @click="check_pict(index)" v-for="(item2,index) in info.src" :key="index" mode="widthFix"></image>
	  </view>
	  <view class="moment">
		  评论列表
	  </view>
  </view>
  <view class="moment_btn">
	  <view class="flex_j_a_r" style="width:15%;">
		  <uni-icons type="star" size='25'></uni-icons>
	  </view>
	  <view class="flex_j_a_c input">
			<input type="text" placeholder="请您友好交流~">
	  </view>
	  <view class="flex_j_a_c" style="width:15%;" @click="send_mes">
		  <uni-icons size="25" type="paperplane"></uni-icons>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import back from '/components/back.vue'
export default{
  name:'',
  onLoad({info}) {
	let tmp=JSON.parse(info)
	Object.keys(this.info).forEach(item=>{
		if(item=='src'){
			this.info[item].push(...tmp[item])
			return
		}
		this.info[item]=tmp[item]
	})
  },
  components:{
	  back
  },
  setup(){
	let info=reactive({avatar:'',
					name:'',
					send_date:'',
					place:'',
					content:'',
					src:[]})
	function send_mes(){
		uni.showToast({
			title:'暂未开启',
			icon:'none'
		})
	}
	function check_pict(index){
		uni.previewImage({
			urls:info.src,
			current:index,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
    return{info,send_mes,check_pict}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
