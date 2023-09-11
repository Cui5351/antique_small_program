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
				  <image @click="see" :src="info.mask" mode="aspectFill"></image>
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
			  <uni-icons type="trash" @click="delete_work" size="25"></uni-icons>
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
						  <view class="se" :style="{height:item.more?'120px':'0px'}">
							  <view>
								  <uni-icons  v-show="item.more" @click="hid_work(item)" :type="item.show_work=='show'?'eye':'eye-slash'" size="25"></uni-icons>
							  </view>
							  <view>
								  <uni-icons  v-show="item.more" @click="trash(item,index)" type="trash" size="25"></uni-icons>
							  </view>
								<view>
									<uni-icons  v-show="item.more" @click="download(item)" type="download" size="25"></uni-icons>
								</view>
						  </view>
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
	  			if(!res.data.data.arr.length){
	  				uni.showToast({
	  					title:'该作品集为空',
	  					icon:'none'
	  				})
	  				return
	  			}
				res.data.data.arr.forEach(item=>{
					item.more=false
				})
				that.info.works.push(...res.data.data.arr)
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
				let {tempFilePath,thumbTempFilePath,duration}=res.tempFiles[0]
				// 计算出分和秒
				if(((duration/60+'').split('.')[0])!=0){
						  // 有分拿分
						  let minute=(duration/60+'').split('.')[0]
						  let second=duration.toFixed()-minute*60
						  duration=(minute<10?`0${minute}:${second<10?`0${second}`:(second)}`:`${minute}:${second<10?`0${second}`:(second)}`)
				}else{
						  // 没分上秒
							duration=duration.toFixed()<10?`00:0${duration.toFixed()}`:`00:${duration.toFixed()}`
				}
				uni.navigateTo({
					url:`/pages/person/other_page/publish_video/publish_video?path=${tempFilePath}&uuid=${info.uuid}&mask=${thumbTempFilePath}&title=${info.title}&duration=${duration}`
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
	function delete_work(){
		uni.showModal({
			title:'是否删除该作品集和全部作品',
			success(res) {
				if(res.cancel)
					return
				uni.request({
					url:uni.current_this.baseURL+':5001/deleted_video_collection',
					method:"POST",
					data:{
						uuid:info.uuid
					},
					success(res) {
						console.log(res);
						if(uni.current_this.check_res_state(res))
							return
						uni.current_this.store.state.user_info.works.forEach((ite,i)=>{
							if(ite.uuid==info.uuid)
								uni.current_this.store.state.user_info.works.splice(i,1)	
						})
						uni.navigateBack()
						uni.showToast({
							title:'删除成功'
						})
					}
				})
			}	
		})
	}
	function trash(item,index){
		uni.showModal({
			title:'是否删除该作品',
			success(res) {
				if(res.cancel)
					return				
					uni.showLoading({
						title:'删除中',
						mask:true
					})
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
	function see(){
		uni.previewImage({
			urls:[info.mask]
		})
	}
	function download(item){
		uni.showModal({
			title:'是否保存该视频',
			success(res) {
				if(res.cancel)
					return
		uni.showLoading({
			title:'下载到本地中'
		})
		uni.downloadFile({
			url:item.src,
			success({tempFilePath}) {
				uni.showLoading({
					title:'保存中'
				})
				uni.saveVideoToPhotosAlbum({
					filePath:tempFilePath,
					success() {
						uni.showToast({
							title:'保存成功'
						})
					},fail(e) {
						uni.showToast({
							title:'保存失败',
							icon:'error'
						})
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			complete() {
				uni.hideLoading()
			}
		})
		}})
	}
    return{info,person,hid_work,download,see,addWork,trash,more_stop,more_click,delete_work}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>