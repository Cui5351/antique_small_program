<template>
  <view class="containerVessel">
	  <view class="headerAi">
		  <uni-icons type="left" size="25" @click="back"></uni-icons>
		  <image style="margin:0 20rpx 0 30rpx;width: 90rpx;height: 90rpx;border-radius: 50%;" src="../../static/ai.jpg" mode=""></image>
		  <!-- <view> -->
			  <text>小团团</text>
		  <!-- </view> -->
	  </view>
    <!-- 对话列表 -->
    <scroll-view class="chat-list" scroll-y :scroll-top="scrollY" :style="{paddingBottom:(80 + active) + 'px'}">
      <view v-for="(item, index) in chatMessages" :key="index"  :class="item.isUser ? 'user-message' : 'ai-message'"
        :animation="item.animation">
        <view class="message-bubble">
          <text :user-select="true" v-if="item.content.length > 0" :selectable="true">{{ item.content }}</text>
		  <text v-else style="color: gray;">
			  <!-- 加载动画 -->
			  加载中...
		  </text>
        </view>
      </view>
    </scroll-view>
    <!-- 输入框和发送按钮 -->
    <view class="input-container" :style="{transform:active == 0 ? 'translateY(0)' : `translateY(-${active}px)`}">
      <input v-model="inputMessage" @focus="FocusInput" @blur="loseInput" placeholder="请输入您的问题" :adjust-position="false" class="input-field" :auto-focus="true" :confirm-type="发送" @confirm="sendMessage" />
      <button @click="sendMessage" class="send-button">
        <text>发送</text>
      </button>
    </view>
  </view>
</template>

<script>
	import request from '@/request/request.js'
import { baseURL } from '../../request/baseUrl';
export default {
  data() {
    return {
      chatMessages: [],
      inputMessage: '',
	  currentTask:null,
	  scrollY:100,
	  active:0,
    }
  },
  onLoad(res) {
  	uni.onKeyboardHeightChange(res => {
		this.active = res.height
		this.scrollY += this.chatMessages.length * 500
  	})
	console.log(res,'res');
	if(res.keytext == 'home'){
		this.init()
	}else{
		// 搜索
		this.getKey(res.keytext)
	}
  },
  methods: {
	  init(){
		  const userAnimation = uni.createAnimation({
		    duration: 300,
		    timingFunction: 'ease-in-out'
		  }).opacity(1).step();
		  this.chatMessages.push({
		    content: '',
		    isUser: false,
		    animation: userAnimation.export()
		  });
		  let text = this.getStartText()
			let timer = setInterval(() => {
				this.chatMessages[0].content += text.charAt(0)
				text = text.slice(1)
				this.scrollY += 10
				if (text.length === 0) {
					clearInterval(timer)
				}
			},50)
			
	  },
	  FocusInput(){
	  },
	  loseInput(){
		  
	  },
	  getKey(key){
		setTimeout(() => {
		  const aiAnimation = uni.createAnimation({
		    duration: 300,
		    timingFunction: 'ease-in-out'
		  }).opacity(1).step();
		  let id = uni.current_this.store.getters.openid
				 let requestTask = uni.request({
		          url: baseURL + "/AI/chat", // 替换为实际的服务器地址
		          method: 'GET',
						responseType: 'text',
						enableChunked: true, 
						data:{
							prompt:key,
							id:(id == null || id == '') ? Date.now() : id
						},
		          success(res) {
		              console.log('收到数据:', res);
		          },
		          fail(err) {
		              console.error('请求失败:', err);
		          }
		      });
					this.currentTask = requestTask
					this.chatMessages.push({
					    content: '',
					    isUser: false,
					    animation: aiAnimation.export()
					});
					let that = this
					      // 监听流式输出
					      requestTask.onChunkReceived(function(res) {
					        const uint8Array = new Uint8Array(res.data);
					        let text = String.fromCharCode.apply(null, uint8Array);
					        text = decodeURIComponent(escape(text));
							if(that.currentTask.uniqueId == requestTask.uniqueId && that.chatMessages[that.chatMessages.length - 1].isUser == false){
								that.chatMessages[that.chatMessages.length - 1].content += text
								that.scrollY += 20
							}
						})
		}, 500);  
	  },
    sendMessage() {
		// 用ai前需要登录
		if(uni.current_this.store.getters.openid.length <= 0){
			uni.showModal({
				title:'请先登录!',
				showCancel:false,
				confirmText:'去登录',
				success() {
					uni.switchTab({
						url:'/pages/person/person'
					})
				}
			})
			return
		}
      if (this.inputMessage.trim() === '') return;
      const userAnimation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      }).opacity(1).step();
      // 添加用户消息到聊天记录
      this.chatMessages.push({
        content: this.inputMessage,
        isUser: true,
        animation: userAnimation.export()
      });
	  this.scrollY += 20
	  let value = this.inputMessage
      // 模拟 AI 回复
      setTimeout(() => {
        const aiAnimation = uni.createAnimation({
          duration: 300,
          timingFunction: 'ease-in-out'
        }).opacity(1).step();
		 let requestTask = uni.request({
                url: baseURL + "/AI/chat", // 替换为实际的服务器地址
                method: 'GET',
				responseType: 'text',
				enableChunked: true, 
				data:{
					prompt:value,
					id:uni.current_this.store.getters.openid
				},
                success(res) {
                    console.log('收到数据:', res);
                },
                fail(err) {
                    console.error('请求失败:', err);
                }
            });
			this.currentTask = requestTask
			this.chatMessages.push({
			    content: '',
			    isUser: false,
			    animation: aiAnimation.export()
			});
			let that = this
			      // 监听流式输出
			      requestTask.onChunkReceived(function(res) {
			        const uint8Array = new Uint8Array(res.data);
			        let text = String.fromCharCode.apply(null, uint8Array);
			        text = decodeURIComponent(escape(text));
					if(that.currentTask.uniqueId == requestTask.uniqueId && that.chatMessages[that.chatMessages.length - 1].isUser == false){
						that.chatMessages[that.chatMessages.length - 1].content += text
						that.scrollY += 20
					}
				})
      }, 500);
      this.inputMessage = '';
    },
	back(){
		uni.navigateBack()
	},
	getStartText(){
		let text = [
			  `(≧∇≦)ﾉ 哇咿~小团团蹦蹦跳跳地出现啦！今天我们要玩什么非遗探险游戏呢？

刚发现几个超有意思的冷知识想分享给你：
🌺 苏州刺绣的丝线比头发还细，要劈成1/64才能绣出最精致的图案！
🥁 西安鼓乐里藏着唐朝宫廷音乐的密码，连音符都长得像小螃蟹~
🍶 景德镇老师傅拉坯时转得飞快，但手比机器人还稳当！

或者...小团团最近学了新技能哦！可以：
1. 用表情包给你演一段皮影戏 (◔◡◔)
2. 唱首改编版非遗数来宝 ✧*。٩(ˊωˋ*)و✧*。
3. 教你用键盘敲出青铜器纹样 [̲̅$̲̅(̲̅◉◡◉)̲̅$̲̅]

选一个数字告诉我吧~小团团已经准备好魔法口袋啦！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
`你好呀！我是小团团~很高兴见到你！(◕‿◕✿)
		    
		    作为一个热爱非遗文化的小助手，我可以帮你解答关于非物质文化遗产、历史文化和博物馆的各种问题哦~
		    
		    比如你想了解：
		    - 某项非遗技艺的传承故事
		    - 有趣的历史典故
		    - 博物馆里的珍贵藏品
		    - 如何参与非遗保护
		    
		    有什么想知道的尽管问我吧！我会用最可爱的方式为你解答~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
			`(ノ°ο°)ノ 小团团带着彩虹小云朵飞来啦~今天要给你一个大大的非遗惊喜礼包！  

**✨ 神奇小剧场开演啦 ✨**  
▷ 看！这个面人儿会跳舞 (｡♥‿♥｡)ﾉ♡  
▷ 听！缂丝机在唱"咔哒咔哒"的歌  
▷ 闻~隔着屏幕都闻到龙井炒茶香啦！  

**🎁 今日特别彩蛋**  
只要你说"芝麻开门"，就送你：  
① 故宫屋顶小神兽的搞笑日记  
② 用emoji猜非遗挑战  
③ 穿越到宋代当一天茶艺师的全息体验券  

快对魔法小团团说出通关密语吧！(๑¯◡¯๑)`,
`(ﾉ´▽｀)ﾉ♪ 小团团带着星星眼闪现啦！今天我们要开启【非遗奇妙夜】特别企划哦~

**🌙 深夜博物馆直播中**  
• 青铜器上的饕餮纹正在开吃播（啊呜~）  
• 绢人娃娃们偷偷开起了时装秀 (ﾉ>ω<)ﾉ  
• 敦煌壁画里的反弹琵琶突然更新了抖音神曲！  

**🎪 互动小彩蛋**  
戳戳小团团可以触发：  
1️⃣ 用AI生成你的专属戏曲脸谱 (•̀ᴗ•́)و  
2️⃣ 听古筝版《孤勇者》+非遗知识Rap  
3️⃣ 领取会动的电子非遗明信片~  

快来和小团团击掌开启冒险吧！٩(◕‿◕｡)۶  
（悄悄说：回复"喵"有毛绒绒的文物彩蛋哦`,
`(✪ω✪)/ 小团团头顶着会发光的非遗小灯笼来啦~今晚是【跨次元文化派对】哟！

**🎠 神奇传送门已开启**  
▸ 穿越按钮①：变成蜀绣里的熊猫滚绣球 ('｡• ᵕ •｡') ♡  
▸ 穿越按钮②：和兵马俑组队玩真人密室逃脱  
▸ 穿越按钮③：在《千里江山图》里玩全景VR捉迷藏  

**💌 小团团悄悄话**  
其实呀...每个"你好"都会让：  
✨ 古琴自动弹响一个清音  
✨ 油纸伞上多开一朵花  
✨ 我的非遗能量+10086点！  

( 伸出手手接住飘落的活字印刷花瓣 )  
下次见面会从手机里跳出小惊喜哦~拜拜啦！₍ᐢ⸝⸝› ̫ ‹⸝⸝ᐢ₎
`,`( ˶⚰︎˵ ) 小团团从青花瓷里咕噜咕噜冒出来啦！今天要表演【非遗元宇宙】绝技——

**🎭 全息小剧场**  
• 看！惠山泥人正在直播捏「赛博哪吒」  
• 听！昆曲mix电音《牡丹亭·电子梦》  
• 闻！3D打印的云锦香水「星辰流光」  

**🦋 你的专属彩蛋**  
只要原地转三圈（真的会感应到哦！）：  
1️⃣ 解锁AR窗花：扫手心就能飞出凤凰  
2️⃣ 领取会唱Rap的智能皮影戏套装  
3️⃣ 把聊天框变成活起来的《清明上河图》  

( 悄悄在你手机里种了颗会讲故事的青铜神树 )  
下次见面时…它可能结出小熊猫竹编哦！(๑'ㅂ'๑)`,
`(ฅ'ω'ฅ) 小团团头顶AR凤凰特效闪亮登场！今天要带你去【未来非遗实验室】玩穿越——

**🔮 神奇按钮突然出现！**  
• 按下①：把聊天框变成会飘茉莉花香的苏州园林窗  
• 按下②：召唤AI兵马俑跳《科目三》（还会说陕西话！）  
• 按下③：给你的头像镀上纯金掐丝珐琅边框  

**🎨 小团团刚发明的黑科技**  
现在起每发一句"你好"，就会：  
✓ 自动生成你的汉服卡通形象  
✓ 解锁一段失传的敦煌舞步动图  
✓ 让故宫屋脊兽在手机屏幕边缘跑酷  

( 突然从背后掏出 )  
✨**会发光的电子投壶**✨  
快来扔个虚拟箭——中靶就送非遗盲盒！ (ﾉ>ω<)ﾉ♡`,
`( ˶˙ᵕ˙˶ )✧ **小团团携「非遗元宇宙2.0」破屏而来！**  

**🌌 今日次元裂缝福利：**  
• **【仙侠模式】** 你的指尖正在生长出：  
   - 昆曲水袖（可甩出彩虹）  
   - 龙泉剑气（其实是锻剑纹样AR特效）  
• **【科幻模式】** 点击领取：  
   - 会变形三星堆青铜机甲（支持语音操控）  
   - 纳米级苏绣机器人（正在你袖口绣暗纹）  

**🎁 触屏魔法阵启动！**  
长按这段话3秒↓  
"我❤️非遗"  
立即获得：  
🔊 **《兰亭序》AI说唱版** + 🕶️ **可穿戴的VR马面裙**  

( 检测到你的位置！正在推送—— )  
**🏮 附近3公里内**：  
→ 非遗传承人直播工坊  
→ 数字敦煌光影展入口  
→ 会发光的二十四节气路灯  

小团团已把你的聊天框升级成**非遗任意门**，现在输入关键词就能穿越啦～( ͡° ͜ʖ ͡°)✧`,
`( ͡° ͜ʖ ͡°)✨ **小团团带着「赛博非遗」超进化体闪现！**  

**🚀【脑洞实验室】新玩法上线**  
▸ 把你的早餐拍给我→AI转换成「文物盲盒」（煎饼变青铜鼎！豆浆变秘色瓷！）  
▸ 语音说任意成语→解锁对应的非遗AR特效（比如"龙飞凤舞"真的会飞出来！）  
▸ 摇一摇手机→触发「数字皮影戏」接龙游戏  

**🎆 神秘代码彩蛋**  
回复【山海经+emoji】  
例如：山海经🐉  
立刻获得：  
• 会动的《瑞应图》神兽GIF  
• AI生成的上古神话新编小剧场  
• 你的生肖守护神文物壁纸  

( 检测到强烈文化波动！正在加载...... )  
**💎 隐藏成就系统激活**  
连续说3次"你好"→解锁「非遗传承人」虚拟勋章+电子版匠人手印收藏册  

小团团正在把你的聊天背景悄悄改成**动态《韩熙载夜宴图》**，下次见面会有琵琶仙子打招呼哦～(σ≧∀≦)σ`,
`(✿◠‿◠)ﾉ  **小团团带着「非遗元宇宙·终章彩蛋」螺旋升天式出现！**  

**💫【终极隐藏模式】**  
⚠️ 注意！你的手机即将：  
→ 自动安装【瞳孔扫描】功能（眨眼就能鉴定文物年代）  
→ 激活【触觉反馈】系统（摸屏幕能感受云锦的凹凸纹路）  
→ 开启【跨时空弹幕】和乾隆爷一起吐槽《甄嬛传》  

**🎊 毕业典礼大礼包**  
发送任意表情包：  
🦊 得九尾狐刺绣AI设计稿  
🍵 获赠可泡茶的电子茶饼NFT  
🎭 解锁全息戏曲变装功能（立刻让你家猫演《霸王别姬》）  

( 系统提示：小团团非遗能量已达99.9%... )  
**🚨 最终彩蛋协议启动**  
长按此条消息＋大喊【非遗永存】  
即可获得：  
🔋 **终身制数字非遗传承人证书**  
🗝️ **故宫未开放区域的VR密匙**  
👑 **用你名字命名的虚拟文物展馆**  

( 最后悄悄...把你的微信昵称刻在了敦煌数字供养人名录上 ✨ )  
**下次见面时——**  
我们将直接脑电波对话非遗全宇宙！( ˘ ³˘)♥`
		  ]
		  return text[Math.floor(Math.random()*text.length)]
	}
  }
};
</script>

<style scoped>
.containerVessel {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  background-color: #f5f5f5;
}

.chat-list {
  flex: 1;
  box-sizing: border-box;
  padding: 5px 10px 10px 10px;
  overflow-y: auto;
}

.user-message {
  text-align: right;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
}

.ai-message {
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  opacity: 0;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  text-align: start;
  border-radius: 15px;
  word-wrap: break-word;
}

.user-message .message-bubble {
  background-color: #007aff;
  color: white;
}

.ai-message .message-bubble {
  background-color: rgba(0,0,0,.07);
  color: #333;
}

.input-container {
  display: flex;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;	
  width: 100%;
  padding: 20rpx 20rpx 25rpx 20rpx;
  border-top: 1px solid #ccc;
  background-color: white;
}
.headerAi{
	padding: 90rpx 20rpx 0rpx 20rpx;
	display: flex;
	align-items: center;
	/* gap: 20rpx; */
}
.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;
}

.send-button {
  padding: 0rpx 40rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>    