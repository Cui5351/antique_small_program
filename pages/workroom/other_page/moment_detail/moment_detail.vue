<template>
	<back name="返回"></back>
  <view class="containe font_color" @touchstart="more_stop">
      <view class="person">
		  <view class="hd">
			  <view class="avatar" @click="author_info">
				  <image :src="info.avatar" mode=""></image>
			  </view>
			  <view>
				  <view class="name">{{info.name}}</view>
				  <view class="date">{{info.send_date}}</view>
				  <view class="place">发布于:{{info.place}}</view>
			  </view>
		  </view>
		  <view class="flex_j_a_r more" v-if="info.state">
			  <uni-icons type="more-filled" @click="more_click" size="25"></uni-icons>
			  <view class="se" :style="{height:more?'90px':'0px'}">
				  <view>
					  <!-- <image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../../../static/Pentagram.svg" mode=""></image> -->
					  <uni-icons v-show="more"  :type="info.show?'eye':'eye-slash'" @click="hidW" size="25"></uni-icons>
				  </view>
				  <view>
					  <uni-icons v-show="more"  type="trash" @click="delW" size="25"></uni-icons>
				  </view>
			  </view>
		  </view>
		  <view class="flex_j_a_c" v-else>
			  <image style="width: 40rpx;height: 40rpx;background: rgba(0,0,0,0);" src="../../../../static/Pentagram.svg" mode=""></image>
			  <!-- <uni-icons type="star" size="25"></uni-icons> -->
		  </view>
	  </view>
	  <view class="pic" v-if="info.src[0]!=null&&info.type=='p'">
	  	<!-- <image :src="item2" @click="check_pict(index)" v-for="(item2,index) in info.src" :key="index" mode="aspectFill"></image> -->
		<swiper style="width: 100%;height: 800rpx;background-color: gray;" :indicator-dots="info.src.length > 1">
			<swiper-item @click="check_pict(index)" v-for="(item2,index) in info.src" :key="index" class="flex_j_a_r">
				<image style="width: 100%;height: 800rpx;" :src="item2" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	  </view>
	  <view class="pic" v-if="info.type=='v'">
		  <video style="height: 650rpx;" enable-progress-gesture :src="info.src" :poster="info.mask" autoplay="true"></video>
	  </view>
	  
	<!--  <view class="other">
		  <button open-type="share" plain >
			<uni-icons type="redo" @click="send_friend" size="25"></uni-icons>
		  </button>
	  </view> -->
	  <view class="content">
	  		  <text selectable="true" space="nbsp">
	  		  {{info.content}}
	  		  </text>
	  </view>
	  <view class="moment">
		  <view class="c">评论列表</view>
		  <view>
			  <view class="m" v-for="(item,index) in moments" :key="index" @longpress="delComment(item)">
				  <view class="avatar">
					  <image :src="item.avatar" mode="aspectFill"></image>
				  </view>
				  <view class="txt">
					  <view class="n">{{item.name}}
					  <view style="font-size:13px;color: gray;">{{item.date}}</view>
					  </view>
					  <view class="t">{{item.content}}</view>
				  </view>
			  </view>
		  </view>
	  </view>
  </view>
  <view class="moment_btn">
	  <!-- <view class="flex_j_a_r" style="width:15%;"> -->
		  <!-- <uni-icons type="star" size='25'></uni-icons> -->
		  <!-- <image style="width: 50rpx;height: 50rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Message2.svg" mode=""></image> -->
	  <!-- </view> -->
	  <view class="flex_j_a_c input">
			<input type="text" @confirm="send_mes" confirm-type="send" v-model="text" placeholder="请您友好交流~">
	  </view>
	  <view class="flex_j_a_c" style="width:15%;" @click="send_mes">
		  <!-- <uni-icons size="25" type="paperplane"></uni-icons> -->
		  <!-- 发送 -->
		  <image style="width: 50rpx;height: 50rpx;background-color: rgba(0,0,0,0);" src="../../../../static/Message2.svg" mode=""></image>
	  </view>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
import back from '/components/back.vue'
export default{
  name:'',
  onShareAppMessage() {
  	return {
  	    title: (this.info.content.length>=7?this.info.content.substring(0,7):this.info.content)+'...', //分享的名称
  		imageUrl:this.info.src[0],
		url:`/pages/workroom/other_page/moment_detail/moment_detail?info=${JSON.stringify(this.info)}`
  	    // mpId:'' //此处配置微信小程序的AppId
  	}
  },
  onLoad({info}) {
	  uni.showLoading({
	  	mask:true,
		title:'加载中'
	  })
	this.channel = this.getOpenerEventChannel()
	let tmp=JSON.parse(info)
	console.log('info',info);
	let that=this
	Object.keys(this.info).forEach(item=>{
		if(tmp[item] instanceof Array){
			this.info[item].push(...tmp[item])
		}
		if(item=='state'){
			if(tmp.openid==uni.current_this.store.state.user_info.openid)
				this.info.state=true
			return
		}
		if(item=='show'){
			if(tmp.show==undefined){
				this.info.show=true
				return
			}
			this.info.show=false
		}
		this.info[item]=tmp[item]
	})
	console.log(this.info);
	this.getComment()
  },
  onUnload() {
  	this.flag = false
  },
  onBackPress() {
  	this.flag = false
  },
  components:{
	  back
  },
  methods:{
	  delComment(comment){
		if(comment.openid != uni.current_this.store.getters.openid)
			return
			let that = this
		uni.showModal({
			title:'是否删除该评论',
			success(confirm) {
				if(!confirm.confirm)
					return
				uni.request({
					url:uni.current_this.baseURL+':5001/del_community_comment',
					method:'GET',
					data:{
						uuid:comment.uuid,
						openid:uni.current_this.store.getters.openid
					},
					success(res) {
						if(uni.current_this.check_res_state(res)){
							return
						}
					that.getComment();
					}
				})
			}
	    })
	  },
	  getComment(){
		  let that = this
		  uni.request({
		  	url:uni.current_this.baseURL+':5001/get_community_comment',
		  	method:'GET',
		  	data:{
		  		uuid:this.info.uuid,
		  		openid:uni.current_this.store.state.user_info.openid
		  	},
		  	success(res) {
		  		if(uni.current_this.check_res_state(res)){
		  			return
		  		}
		  		if(res.data.state==2){
		  			if(res.data.mes=='该作品被隐藏'&&that.info.openid==uni.current_this.store.state.user_info.openid){
		  				res.data.data.forEach(item=>{
		  					item.date=uni.current_this.dateformat_accuracy(new Date(item.date))
		  				})
		  				that.moments.push(...res.data.data)
		  				that.info.show=false
					this.channel.emit('loadData')
		  			uni.navigateBack()
		  			return
		  			}
		  			if(that.info.openid==uni.current_this.store.state.user_info.openid){
		  				// 删除作品
		  				uni.current_this.store.state.user_info.moments.forEach((item,index)=>{
		  					if(item.uuid==that.info.uuid)
		  						uni.current_this.store.state.user_info.moments.splice(index,1)
		  				})
		  			}
		  			uni.current_this.store.state.moments.forEach((item,index)=>{
		  				if(item.uuid==that.info.uuid)
		  					uni.current_this.store.state.moments.splice(index,1)
		  			})
		  			uni.showToast({
		  				title:res.data.mes,
		  				icon:'none',
		  				duration:3000
		  			})
		  			return
		  		}
		  		res.data.data.forEach(item=>{
		  			item.date=uni.current_this.dateformat_accuracy(new Date(item.date))
		  		})
				that.moments.splice(0,that.moments.length)
		  		that.moments.push(...res.data.data)
				if(that.flag){
					console.log(that.flag,'flag');
					setTimeout(() => {
						that.getComment()
					},5000)
				}
		  	},
		  	complete() {
		  		uni.hideLoading()
		  	}
		  })
	  }
  },
  setup(){
	  let flag = ref(true)
	let info=reactive({avatar:'',
					name:'',
					send_date:'',
					place:'',
					content:'',
					src:[],
					uuid:'',
					state:false,
					openid:'',
					type:'',
					mask:[],
					show:true})
	let moments=reactive([])
		  let channel = ref(null)
	let text=ref('')
	function send_mes(){
		if(!uni.current_this.store.getters.login_state){
			uni.showToast({
				title: '请先登录',
				icon:'none'
			});
			return
		}
		if(text.value.length<=0){
			uni.showToast({
				title: '输入内容不能为空',
				icon:'none'
			});
			return
		}
		uni.request({
			url:uni.current_this.baseURL+':5001/send_community_comment',
			method:'POST',
			data:{
				openid:uni.current_this.store.state.user_info.openid,
				uuid:info.uuid,
				content:text.value
			},
			success(res) {
				if(uni.current_this.check_res_state(res)){
					return
				}
				moments.unshift({
					avatar:uni.current_this.store.state.user_info.avatar,
					name:uni.current_this.store.state.user_info.name,
					content:text.value,
					date:uni.current_this.dateformat_accuracy(new Date())})
				text.value=''
			}
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
	function delW(){
		uni.showModal({
			confirmText:'删除',
			title:'是否删除该作品',
			success(e) {
				if(e.cancel)
					return
			// 发送删除的请求
			// deleted
			uni.request({
				url:uni.current_this.baseURL+':5001/delete_works',
				method:'POST',
				data:{
					openid:uni.current_this.store.state.user_info.openid,
					uuid:info.uuid
				},
				success(res) {
					console.log(res);
					if(uni.current_this.check_res_state(res)){
						return
					}
					// uni.current_this.store.state.moments.forEach((item,index)=>{
					// 	if(item.uuid==info.uuid)
					// 		uni.current_this.store.state.moments.splice(index,1)
					// })
					// if(info.openid==uni.current_this.store.state.user_info.openid){
					// 	// 删除作品
					// 	uni.current_this.store.state.user_info.moments.forEach((item,index)=>{
					// 		if(item.uuid==info.uuid)
					// 			uni.current_this.store.state.user_info.moments.splice(index,1)
					// 	})
					// }
					uni.showToast({
						title:`删除作品成功`
					})
					channel.value.emit('loadData')
					uni.navigateBack()
				}})
			}
		})
	}
	function hidW(){
		uni.showModal({
			confirmText:`${info.show?'隐藏':'显示'}`,
			title:`是否${info.show?'隐藏':'显示'}该作品`,
			success(e) {
				if(e.cancel)
					return
			// 发送删除的请求
			// deleted
			uni.request({
				url:uni.current_this.baseURL+':5001/show_hid_works',
				method:'POST',
				data:{
					openid:uni.current_this.store.state.user_info.openid,
					uuid:info.uuid,
					state:info.show?'hid':'show'
				},
				success(res) {
					if(uni.current_this.check_res_state(res)){
						return
					}
					info.show=!info.show
					uni.showToast({
						title:`${info.show?'显示':'隐藏'}作品成功`
					})
				channel.value.emit('loadData')
				}})
			}
		})
	}
	let more=ref(false)
	function more_click(){
		more.value=true
	}
	function more_stop(){
		more.value=false
	}
	function author_info(){
		uni.navigateTo({
			url:`/pages/person/other_page/author_info/author_info?info=${JSON.stringify({
				avatar:info.avatar,
				name:info.name,
				openid:info.openid
			})}`})
	}
    return{info,more_stop,author_info,more_click,more,send_mes,check_pict,text,moments,delW,hidW,channel,flag}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
