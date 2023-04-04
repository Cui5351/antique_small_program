<script>
	export default {
		onLaunch: function() {
			uni.current_this=this
			this.baseURL='https://www.mynameisczy.asia'
			this.back=function(){
				if(getCurrentPages().length>1)
					uni.navigateBack();
				else
					uni.switchTab({
						url:'/pages/home/home'
					})
			}
			console.log('App Launch')
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
		background-color: #f5f5f5;
		height:100%;
		width:100%;
		overflow: hidden;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
	}
</style>
