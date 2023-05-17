<template>
	<back name='作品集管理'></back>
  <view class="containe">
      <view class="tit">
		  <view class="titl">
			  <view class="t">
				<view class="ti">{{info.title}}</view>
				<view class="d">&emsp;{{info.description}}</view>
				</view>
			  <view class="mask">
				  <image :src="info.mask" mode="aspectFill"></image>
			  </view>
		  </view>
		  <view class="other">
			  <view class="person">
				  <view class="flex_j_a_r">
					<image :src="person.avatar" mode="aspectFill"></image>
					{{person.name}}
				  </view>
			  </view>
			  <view style="color: gray;">作品·{{info.works.length}}</view>
		  </view>
	  </view>
	  <view class="works">
		  <view class="add flex_j_a_c" @click="addWork">
			  <image src="../../../../static/add.svg" mode=""></image>
		  </view>
		  <view v-for="(item,index) in info.works" :key="index" class="item flex_j_a_c">
			  <view class="mask">
				<image :src="item.mask" mode="aspectFill"></image>
			  </view>
			  <view class="t">
				  <view class="n">{{item.name}}</view>
				  <view class="p">
					  <view class="a">
						  <image :src="person.avatar" mode="aspectFill"></image>
							<view class="text">
								{{person.name}}
							</view>
					  </view>
					  <view class="c flex_j_a_r">
						  <uni-icons type="heart"></uni-icons>
						  <view style="margin-left: 5px;overflow: hidden;">0</view>
					  </view>
				  </view>
			  </view>
		  </view>
	  </view>
  </view>
</template>

<script>
import back from '/components/back.vue'
import {ref,reactive,computed} from 'vue'
export default{
  name:'',
  components:{
  	  back
  },
  onLoad({work}) {
	  uni.showLoading({
	  	title:'加载中'
	  })
	  let that=this
	  uni.manage_work_this=this
	  work=JSON.parse(work)
	  	uni.request({
	  		url:uni.current_this.baseURL+':5001/get_video',
	  		method:"POST",
	  		data:{
	  			uuid:work.uuid
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
				that.info.works.push(...res.data.data)
				console.log(res,'res');
	  		},
			complete() {
				uni.hideLoading()
			}
	  	})
	  Object.keys(this.info).forEach(item=>{
		  if(item=='works')
			return
		this.info[item]=work[item]
	  })
	console.log(this.info,'info');
  },
  setup(){
	let info=reactive({
		works:[],
		title:'',
		mask:'',
		score:0,
		show_work:'show',
		description:'',
		uuid:''
	})
	let person=reactive({
		avatar:computed(()=>uni.current_this.store.getters.avatar),
		name:computed(()=>uni.current_this.store.getters.name)
	})
	
	function addWork(){
		console.log('add');
		uni.chooseVideo({
			// 最长时间为30分钟
			// maxDuration:1800,
			extension:['mp4'],
			success(res) {
				const {tempFilePath,thumbTempFilePath}=res
				console.log(res,'res');
				uni.navigateTo({
					url:`/pages/person/other_page/publish_video/publish_video?path=${tempFilePath}&uuid=${info.uuid}&mask=${thumbTempFilePath}&title=${info.title}`
				})
			},
			fail(err) {
				console.log(err);
			}
		})
	}
    return{info,person,addWork}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>