<template>
	<back name='作品集管理'></back>
  <view class="containe" @touchstart="more_stop">
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
			  <view style="color: gray;">作品·{{info.works.length}}
			  <uni-icons type="trash" size="25"></uni-icons>
			  </view>
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
					  <view class="c flex_j_a_r more">
						  <uni-icons  @click="more_click(item)" type="more-filled" size="25"></uni-icons>
						  <view class="se" :style="{height:item.more?'90px':'0px'}">
							  <view>
								  <uni-icons @click="hid_work(item)" :type="item.show_work=='show'?'eye':'eye-slash'" size="25"></uni-icons>
							  </view>
							  <view>
								  <uni-icons @click="trash(item,index)" type="trash" size="25"></uni-icons>
							  </view>
						  </view>
					  </view>
				  </view>
			  </view>
		  </view>
		  <view class="bu"></view>
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
				res.data.data.forEach(item=>{
					item.more=false
				})
				that.info.works.push(...res.data.data)
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
		uni.chooseMedia({
			count:1,
			mediaType:['video'],
			// 最长时间为30分钟
			// maxDuration:1800,
			extension:['mp4'],
			success(res) {
				const {tempFilePath,thumbTempFilePath}=res.tempFiles[0]
				uni.navigateTo({
					url:`/pages/person/other_page/publish_video/publish_video?path=${tempFilePath}&uuid=${info.uuid}&mask=${thumbTempFilePath}&title=${info.title}`
				})
			}
		})
	}

	let ite
	function more_click(item){
		item.more=true
		ite=item
	}
	function more_stop(){
		if(ite==undefined)
			return
		ite.more=false
	}
	function trash(item,index){
		uni.showModal({
			title:'是否删除该作品',
			success(res) {
				if(res.cancel)
					return				
				uni.request({
					url:uni.current_this.baseURL+':5001/deleted_video',
					method:"POST",
					data:{
						uuid:item.video_id
					},
					success(res) {
						if(uni.current_this.check_res_state(res))
							return
						info.works.splice(index,1)
						uni.showToast({
							title:'删除成功'
						})
					},
					complete() {
						uni.hideLoading()
					}})
				}
			})
	}
	function hid_work(item){
		uni.showModal({
			title:`是否${item.show_work=='show'?"隐藏":'显示'}该作品`,
			success(res) {
				if(res.cancel)
					return
				uni.showLoading({
					title:`${item.show_work=='show'?"隐藏":'显示'}中`
				})
				uni.request({
					url:uni.current_this.baseURL+':5001/set_video',
					method:"POST",
					data:{
						uuid:item.video_id,
						state:item.show_work=='show'?false:true
					},
					success(res) {
						if(uni.current_this.check_res_state(res))
							return
						uni.showToast({
							title:`${item.show_work=='show'?"隐藏":'显示'}成功`
						})
						item.show_work=res.data.data
					},
					complete() {
						uni.hideLoading()
					}})
				}
			})
	}
    return{info,person,hid_work,addWork,trash,more_stop,more_click}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>