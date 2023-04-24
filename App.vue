<script>
	import {useStore} from 'vuex'
	export default {
		onLaunch: function() {
			uni.current_this=this
			this.baseURL='https://www.mynameisczy.asia'
			this.store=useStore()
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
