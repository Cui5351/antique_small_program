<template>
	<back name='返回'></back>
  <view class="containe font_color">
		<view class="search flex_j_a_r">
			<view class="search_btn background">
				<input type="text" placeholder="搜索视频" v-model="text" maxlength="20" confirm-type="search" @confirm="search_result({model:'input',t:text})" />
			</view>
				<!-- <view class="search_txt"> -->
					<!-- <uni-icons color='gray' size='25' type='search'></uni-icons>搜索视频 -->
				<!-- </view> -->
		</view>
		<view class="v_result" v-show="show_state=='label'">
			<!-- <view class="item" v-for="(item,index) in video_label" @click="inter({uuid:item.work_uuid})"> -->
			<view class="item" v-for="(item,index) in video_label" @click="search_result({model:'input',t:item.name})">
				{{item.name}}
			</view>
		</view>
	  <view v-show="show_state=='empty'">
		  <view class="title">历史搜索</view>
		  <view class="history">
			  <view @click="search_result({model:'click',t:item})" v-for="(item,index) in record" :key="index">{{item}}</view>
		  </view>
	  </view>
	  <scroll-view v-show="show_state=='video'" class="video_set" scroll-y @scrolltolower="search_result({model:'input',t:text})">
		  <view class="noContent" v-show="!videos.length">暂无内容</view>
		  <view class="item" v-for="(item,index) in videos" :key="index"  @click="inter({uuid:item.work_uuid})">
			  <view class="mask">
				  <view class="duration">{{item.duration}}</view>
				  <image :src="item.mask" mode="aspectFill"></image>
			  </view>
			  <view class="right_menu">
				  <view class="video_tit">{{item.title.length>=10?(item.title.substring(0,9)+'...'):item.title}}</view>
				  <view>
					<view class="video_tit_small">
						<view :class="word.flag?'high':''" style="display: inline;" v-for="(word,i) in item.arr" :key="index">
							{{word.txt}}
						</view>
					</view>
					<view class="user_name">up:{{item.user_name}}</view>
					<view class="user_name">{{item.date}}</view>
					
				  </view>
			  </view>
		  </view>
	  </scroll-view>
	  <view v-show="show_state=='empty'">
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
				<view v-for="(item,index) in ['手工制作','非遗传承视频','非遗文物制作视频','非遗','文物']" :key="index" @click="fill(item)" >{{item}}</view>
			</view>
	  </view>
  </view>
</template>

<script>
import back from '/components/back.vue'
import {ref,reactive,watch} from 'vue'
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
	let video_label=reactive([])
	let videos=reactive([])
	function input(txt){
		text.value=txt
		search({detail:{value:txt}})
	}
	let timer=''
	let search_state=false
	watch(text,(n)=>{
		if(search_state)
			return
		if(timer){
			clearTimeout(timer)
		}
		timer=setTimeout(()=>{
			search({detail:{value:n}})
		},700)
	})
	function clear_video_label(){
		let n=video_label.length
		for(let i=0;i<n;i++){
			video_label.pop()
		}
	}
	function clear_video(){
		let n=videos.length
		for(let i=0;i<n;i++){
			videos.pop()
		}
	}
	// empty,label,video
	let show_state=ref('empty')
	let skip=ref(0)
	function search_result({model,t}){
		if(model!='input'){
			search_state=true
			text.value=t
		}
		console.log(t,'t');
		uni.request({
			url:uni.current_this.baseURL+':5001/get_video_by_name',
			data:{
				name:t,
				skip:skip.value
			},success(data) {
				if(data.data.data.error){
					return
				}
				if(data.data.data.length <= 0){
					uni.showToast({
						title:'没有更多了'
					})
					return
				}
				skip.value+=data.data.data.length
				show_state.value='video'
				data.data.data.forEach(item => {
					item.date = uni.current_this.dateformat_accuracy(new Date(item.publish_date))
				})
				videos.push(...data.data.data)
				// name分为三个元素【数组】，1为红色标记部分
				videos.forEach(item=>{
					item.arr=[]
					let n=item.name.split('')
					let n2=t.split('')
					// 匹配
					// 先进行单个匹配，
						// 若匹配成功，再查看匹配条件字符串的长度，
							// 再进行下一组匹配
								// 匹配成功
					// 返回添加《继续》
								// 匹配失败，结束
						for(let i=0;i<n.length;i++){
							let flag=true
							let count=i
							if(n[i]==n2[0]){
								let flag2=false
								for(let j=0;j<n2.length;j++){
									if(n[count]!=n2[j])
										flag2=true
									count++
								}
								if(!flag2)
									flag=false
							}
								// 查看匹配长度
								// 查看下一组
							if(flag){
								// 有不一样的,跳过
								item.arr.push({flag:false,txt:n[i]})
							}else{
								// 匹配成功，添加
								item.arr.push({flag:true,txt:n.join('').substring(i,count)})
								// 跳到匹配那里
								i=--count
							}
						}
				})
			},
			complete() {
				search_state=false
			}
		})
	}
	watch(show_state,(n)=>{
		if(n=='empty'){
			skip.value=0
			clear_video()
			clear_video_label()
		}else if(n=='label'){
			clear_video()
			skip.value=0
		}
	})
	function search(e){
		if(e.detail.value.trim().length<=0){
			show_state.value='empty'
			return
		}
		if(record.length>=8)
			record.pop()
		record.unshift(e.detail.value)
		// 发送搜索请求
		uni.request({
			method:"GET",
			url:uni.current_this.baseURL+':5001/get_label_by_name',
			data:{
				name:e.detail.value
			},
			success(e){
				clear_video_label()
				if(e.data.data.length>0){
					video_label.push(...e.data.data)
					show_state.value='label'
				}else{
					show_state.value='empty'
				}
			},fail(e) {
				console.log(e);
			}
		})
		
		uni.setStorage({
			key:'search_history_video',
			data:[...record]
		})
	}
	function fill(item){
		text.value=item
		// search({detail:{
		// 	value:item
		// }})
	}
	let inter=uni.current_this.inter
    return{text,input,search,record,fill,show_state,video_label,inter,search_result,videos}
  }
}
</script>

<style scoped lang='scss'>
	@import "/uni.scss";
	@import "./index.scss";
</style>
