<template>
  <view class="container">
	<image class="background_antique" src="/static/show_antique_background.svg" mode=""></image>
	<view class="head_two" style="background-color: rgba(0,0,0,0);">
		<uni-icons type="left" size="25" color="rgb(200,200,186)" @click="back"></uni-icons>
	</view>
	<swiper vertical="true" class="swiper" circular>
		<swiper-item v-for="(item,index) in static_data" :key="index">
			<view class="antique flex_j_a_c grows">
				<view class="born flex_j_a_c grows">
					<view class="bor">{{item.date}}</view>
					<view class="tip flex_j_a_c">
						<view class="arrow">
							<uni-icons type="top" color="rgb(200,200,186)"></uni-icons>
						</view>
						<view style="font-size:15px;">
							上下滑动查看更多文物
						</view>
					</view>
				</view>
				<view class="pic .flex_j_a_c">
					<view class="anti">
						<image style="background-color: rgba(0,0,0,0)" :src="item.src" mode=""></image>
						<view class="btn flex_j_a_r" @click="tip('3D')">
							3D<uni-icons type="right"></uni-icons>
						</view>
					</view>
				</view>
				<view class="name">
					<view class="flex_j_a_c">
						<view class="audio"  @click="tip('语音讲解')">
							语音讲解
						</view>
						<view class="name flex_j_a_r" @click="detail_info(item)">
							{{item.name}}<view class="right ">
								<uni-icons type="right"></uni-icons>
							</view>
						</view>
						<view class="museum">
							<uni-icons color="background-color: rgba(0,0,0,0)" type="location"></uni-icons>
							荆州博物馆</view>
					</view>
				</view>
			</view>
		</swiper-item>
	</swiper>
  </view>
</template>

<script>
import {ref,reactive} from 'vue'
export default{
  name:'',
  setup(){
	let static_data=[{
   src:'https://www.mynameisczy.asia/image/antique/antiques/青瓷双系耳壶.jpg',
   born:'荆州区王氏堰出土',
   date:'西汉时期',
   name:'青瓷双系耳壶',
   description:'该器物通高42厘米，口径17.5厘米，底径16.5厘米。敞口，喇叭状，高颈斜肩，鼓腹，卧圈足。肩附扁形竖系，颈下及沿下饰水波纹，肩部饰三组弦纹，系上饰叶脉纹，下有一环，腹下磨光，口内及肩部施青黄釉不均匀。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/白釉孩童枕.jpg',
   born:'荆州城出土',
   date:'北宋时期',
   name:'白釉孩童枕',
   description:'瓷枕是我国古代的夏令寝具,始创于隋代，流行于唐、宋、元间，“孩儿枕”是瓷枕的一种样式，以定窑、景德镇窑烧制的最为精美。定窑是宋代北方著名瓷窑。窑址在今天的河北省曲阳县,以白瓷为主，也烧制其他的品种,它的胎色白色微黄，较坚致。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/粉彩缠枝花卉碗.jpg',
   born:'荆州城出土',
   date:'清朝时期',
   name:'粉彩缠枝花卉碗',
   description:`粉彩瓷又叫“软彩瓷”，是康熙晚期受珐琅彩瓷影响和启发而出现的釉上彩瓷新品种，素有“始于康熙，精于雍正，盛于乾隆”之说，迄今已有300多年历史。粉彩瓷之所以为藏家青睐，主要凭借其独有的“玻璃白”。所谓“玻璃白”是指不透明的白色乳浊剂，其制作工艺是在烧成的白瓷上勾勒出纹饰图案的轮廓，在轮廓内先用含有氧化硅、氧化砷和氧化铅的“玻璃白”打底，然后按所需颜色在上面绘画渲染，再次入窑烘烧而成。利用其乳浊作用，可以让所绘人物、花鸟、山水等画面粉润柔和、生动逼真、带有立体感较强的国画风格。据行家介绍，乾隆粉彩的造型极为丰富，一改康熙时期古拙厚重的风格。大型器规整不变形，小型器各部位处理严谨得当，反映当时制作技巧的高超。其青花款识六字二行者为专人书写，字体工整有力，青花色调纯正。六字三行者书写草率，而青花花押款、斋堂款则比较稀少`
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/黑釉执壶.jpg',
   born:'沙市区城隍庙出土',
   date:'北宋时期',
   name:'黑釉执壶',
   description:'杯口尖唇，长颈，广肩，圆腹上鼓，圈足微外斜。在壶肩的一侧置有下宽上窄弯曲形的长流，对应的另一侧有双条并列相连而成的单柄把手。通体饰黑釉，釉层较厚呈失透状，在黑釉的釉面上有大片的雾状斑饰，器腹下釉色微褐。底足露胎，胎灰色，质较细。耀州窑发展到宋代以烧青瓷为主流，亦兼烧黑釉、酱釉、结晶釉瓷，此壶是宋代该窑所烧的少量黑釉执壶的一件代表。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/红陶盉.jpg',
   born:'天门肖家屋脊出土',
   date:'新石器时代后石家河文化时期',
   name:'红陶盉',
   description:'高15cm，口径9cm，底径5.7cm。盉（hé 音禾），阔颈，溜肩，鼓腹，腹以下内收，平底。一侧置短流，另一侧置宽柄。泥质红陶。器表打磨光滑。'
  },
  {
   src:'https://www.mynameisczy.asia/image/antique/antiques/虎座鸟架鼓.jpg',
   born:'湖北省荆州市',
   date:'战国时期',
   name:'虎座鸟架鼓',
   description:'两只昂首卷尾、四肢屈伏、背向而踞的卧虎为底座，虎背上各立一只长腿昂首引吭高歌的鸣凤，背向而立的鸣凤中间，一面大鼓用红绳带悬于凤冠之上。通体髹黑漆为地，以红、黄、金、蓝等色绘出虎斑纹和凤的羽毛。全器造型逼真，彩绘绚丽辉煌，既是鼓乐，也是艺术佳作。值得指出的是，在这一凤与虎的组合形象中，凤高大轩昂，傲视苍穹，虎却矮小瑟缩趴伏于地，反映了楚人崇鸣凤、向往安详的意识和征服猛兽、不畏强暴的精神。现收藏于湖北省荆州市博物馆 。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/黄地粉彩龙纹杯.jpg',
   born:'荆州城出土',
   date:'清朝时期',
   name:'黄地粉彩龙纹杯',
   description:'尺寸:口径6cm,高4.3cm。黄釉地，绘绿彩海水龙纹，线条流畅，工艺精湛，满细小开片，落款“大清同治年制”，典型传统官窑制式。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/青瓷龙柄盘口壶.jpg',
   born:'荆州区江陵砖瓦厂出土',
   date:'隋朝时期',
   name:'青瓷龙柄盘口壶',
   description:' 浅盘口，圆唇，丰肩，细长颈，鼓腹，下腹内收，颈部饰竹节纹，肩部安两系呈对称分布，肩另一侧置一双龙头柄，器型规则、少见'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/青瓷瓿.jpg',
   born:'荆州区王氏堰出土',
   date:'西汉时期',
   name:'青瓷瓿',
   description:'此物高23、口径10厘米。瓿方唇敛口，弧肩，扁球腹，微显折腰，平底内凹。肩部置对称方耳。耳面模印兽面纹，两耳之间对称贴饰模印的兽面衔环。肩划3组弦纹间两道水波纹。灰褐色胎，施半截青绿色釉。该瓿的铺首衔环贴于两耳之间，有别于一般的汉代陶瓿贴饰于双耳之下，较为少见。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/石牙璋.jpg',
   born:'沙市汪家屋场出土',
   date:'新石器时代后石家河文化时期',
   name:'石牙璋',
   description:'牙璋是一种有刃的礼器，器身上端有刃，下端呈长方形，底部两侧有突出的鉏牙。考古研究表明，它可能起源于黄河中下游一带。在沂南县博物馆就收藏着三件造型比较规整、钻孔、制作精良的新石器时代牙璋。这三件牙璋器体均经磨制，刃部经过精磨，通体磨光。'
  }
,{
   src:'https://www.mynameisczy.asia/image/antique/antiques/玉覆面.jpg',
   born:'荆州秦家山二号墓出土',
   date:'战国时期',
   name:'玉覆面',
   description:'长25厘米，宽28厘米。玉覆面，玉质青白，有沁色，共由十四块玉饰组合而成，其中额顶尖角和唇舌由碎玉废料改制。眼、颊由龙形玉片组成，雕刻工艺精细，局部有朱砂残留。其他玉饰片上有微孔，应是位穿缀所留。'
  }
 ]
 function detail_info(item){
	 uni.navigateTo({
	 	url:`/pages/home/other_page/show_antique3d/antique/antique?data=${JSON.stringify(item)}`
	 })
 }
 let back=uni.current_this.back
 function tip(title){
	 uni.showToast({
	 	title:title+'功能暂未开放',
		icon:'none'
	 })
 }
    return{static_data,detail_info,back,tip}
  }
}
</script>

<style scoped lang='scss'>
@import './index.scss';
@import '/uni.scss';
.container{
	color: rgb(200,200,186);
	position: absolute;
	z-index:99;
	&>view{
		position: relative;
		z-index:200;
	}
}
</style>
