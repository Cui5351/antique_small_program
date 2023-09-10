<script>
	import {useStore} from 'vuex'
	export default {
		onLaunch: function() {
			uni.current_this=this
			// this.baseURL='https://www.mynameisczy.asia'
			this.baseURL='https://www.mynameisczy.cn'
			this.store=useStore()
			this.no_develop=function(name){
				uni.showToast({
					icon:'none',
					title:name+'暂未开放'
				})
			}
			// 格式化日期
			this.dateformat=function(date){
				let month=date.getMonth()==12?1:date.getMonth()+1
				let day=date.getDate()
				let now=new Date()
				if(now.getFullYear()==date.getFullYear())
				return `${month<10?'0'+month:month}月${day<10?'0'+day:day}日`
				else
					return `${date.getFullYear()}年${month<10?'0'+month:month}月${day<10?'0'+day:day}日`
			}
			this.dateformat2=function(date){
				let month=date.getMonth()==12?1:date.getMonth()+1
				let day=date.getDate()
				let now=new Date()
				return {year:date.getFullYear(),month:`${month<10?'0'+month:month}月${day<10?'0'+day:day}日`}
			}
			this.dateformat_accuracy=function(date){
				let month=date.getMonth()==12?1:date.getMonth()+1
				let day=date.getDate()
				let now=new Date()
				let hour=date.getHours()
				let minute=date.getMinutes()
				if(now.getFullYear()==date.getFullYear())
				return `${month<10?'0'+month:month}月${day<10?'0'+day:day}日${hour<10?'0'+hour:hour}:${minute<10?'0'+minute:minute}`
				else
					return `${date.getFullYear()}年${month<10?'0'+month:month}月${day<10?'0'+day:day}日${hour<10?'0'+hour:hour}:${minute<10?'0'+minute:minute}`
			}
			// 返回上一级页面
			this.back=function(){
				if(getCurrentPages().length>1)
					uni.navigateBack();
				else
					uni.switchTab({
						url:'/pages/home/home'
					})
			}
			console.log('App Launch')
			this.check_res_state=function(res){
				if(!res.data.state){
					uni.showToast({
						title:'发生错误'
					})
					return 1
				}
				return 0
			}
			// 检查是否登录
			this.check_login_state=function(){
				if(!uni.current_this.store.getters.login_state){
					uni.showToast({
						title:'清先登录',
						icon:'none'
					})
					return 1
				}
				return 0
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	// 设置整个项目的背景色
	page {
		font-family: '楷体';
		background-color: #f5f5f5;
		height:100%;
		width:100%;
		overflow: hidden;
		// overflow-x: hidden;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
	}
</style>
