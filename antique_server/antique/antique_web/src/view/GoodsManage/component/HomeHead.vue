<template>
  <div class="page-container" style="overflow-y: auto;">
    <!-- 页面原有的内容结构保持不变 -->
     <div class="container">
    <div class="title">
      <div>
        <span style="font-weight: bold;margin-right: 10px;font-size: 20px;">今日数据-出货</span>
        <!-- <span>{{ date }}</span> -->
        <el-date-picker
          v-model="date"
          align="right"
          type="date"
          placeholder="选择日期"
          :disabled-date="disabledDate"
          @change="changeDate"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="detail" @click="getDetailInfo(date,'/Delivery')">
        详细数据
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="content">
      <div>
        <div class="c_title">实收营业额</div>
        <div class="c_content">￥{{ model.sum }}</div>
      </div>
      
      <div>
        <div class="c_title">黑油</div>
        <div class="c_content">￥{{ model.blackOilMoney }}/{{ model.blackOilAmount }}(L)</div>
      </div>
      
      <div>
        <div class="c_title">植物油</div>
        <div class="c_content">￥{{ model.vegetableOilMoney }}/{{ model.vegetableOilAmount }}(L)</div>
      </div>
      
      <div>
        <div class="c_title">酒精</div>
        <div class="c_content">￥{{ model.alcoholOilMoney }}/{{ model.alcoholOilAmount}}(箱)</div>
      </div>
      
      <div>
        <div class="c_title">煤</div>
        <div class="c_content">￥{{ model.coalOilMoney }}/{{ model.coalOilAmount }}(吨)</div>
      </div>
      
      <div>
        <div class="c_title">货车/面包车</div>
        <div class="c_content">{{ model.van }} / {{ model.goodsCar }}</div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="title">
      <div>
        <span style="font-weight: bold;margin-right: 10px;font-size: 20px;">今月数据-进货</span>
        <!-- <span>{{ dateOilIn }}</span> -->
        
          <el-date-picker
            v-model="dateOilIn"
            type="month"
            clearable="false"
            :disabled-date="disabledDate"
            @change="changeMonth"
            placeholder="选择月">
          </el-date-picker>
        
      </div>
      <div class="detail" @click="getDetailInfo(dateOilIn,'/Purchase')">
        详细数据
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="content">
      <div>
        <div class="c_title">实付支出额</div>
        <div class="c_content">￥{{ modelOilIn.sum }}</div>
      </div>
      
      <div>
        <div class="c_title">黑油</div>
        <div class="c_content">￥{{ modelOilIn.blackOilMoney }}/{{ modelOilIn.blackOilAmount }}(L)</div>
      </div>
      
      <div>
        <div class="c_title">植物油</div>  
        <div class="c_content">￥{{ modelOilIn.vegetableOilMoney }}/{{ modelOilIn.vegetableOilAmount }}(L)</div>
      </div>
      
      <div>
        <div class="c_title">酒精</div>
        <div class="c_content">￥{{ modelOilIn.alcoholOilMoney }}/{{ modelOilIn.alcoholOilAmount }}(箱)</div>
      </div>
      
      <div>
        <div class="c_title">煤</div>
        <div class="c_content">￥{{ modelOilIn.coalOilMoney }}/{{ modelOilIn.coalOilAmount }}(吨)</div>
      </div>
    
    </div>
  </div>
  </div>
  
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import request from "../../../request/request"
import { defineProps, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const props = defineProps(["title", 'Data'])

const model = reactive({
  sum: "",
  van: "",
  goodsCar: "",
  blackOilAmount: "",
  blackOilMoney: "",
  alcoholOilAmount: "",
  alcoholOilMoney: "",
  vegetableOilAmount: "",
  vegetableOilMoney: "",
  coalOilAmount: "",
  coalOilMoney: "",
})

const modelOilIn = reactive({
  sum: "",
  blackOilAmount: "",
  blackOilMoney: "",
  alcoholOilAmount: "",
  alcoholOilMoney: "",
  vegetableOilAmount: "",
  vegetableOilMoney: "",
  coalOilAmount: "",
  coalOilMoney: "",
})
const router = reactive(useRouter())
const getDetailInfo = (date,page) => {
  console.log(date);
  router.push({
    path:page,
    query:{
      date:date
    }
  })
}

const disabledDate = (time) => {
  return time.getTime() > Date.now()
} 
const changeDate = (time) => {
  date.value = dateFormat(time)
  getDayData()
}
const changeMonth = (time) => {
  dateOilIn.value = dateFormatOilIn(time)
  getDayDataOilIn({year:dateOilIn.value.split('-')[0],month:dateOilIn.value.split('-')[1]})
}

const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const date = ref(dateFormat(new Date()))

const dateFormatOilIn = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

const dateOilIn = ref(dateFormatOilIn(new Date()))

const getDayData = () => {
  request.get(`/admin/oilOff/getTodayData?startDate=${date.value}&endDate=${date.value}`).then(e => {
    const { data } = e
    // 将从接口获取的数据完整赋值给model对象
    Object.assign(model, data);
    console.log(e);
  }).catch(e => {
    console.log(e, 'err');
  })
}
getDayData()

const getDayDataOilIn = ({year,month}) => {
  request.get("/admin/oilIn/getPageMonthData",{params:{year,month}}).then(e => {
    const { data } = e
    // 将从接口获取的数据完整赋值给model对象
    Object.assign(modelOilIn, data);
    console.log(e);
  }).catch(e => {
    console.log(e, 'err');
  })
}
let d = new Date()
getDayDataOilIn({year:d.getFullYear(),month:String(d.getMonth() + 1).padStart(2, '0')})

</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  background: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 15px;
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
 .detail {
      cursor: pointer;
      color: rgba(0, 0, 0,.5);
    }
  }
.content {
    display: flex;
    justify-content: space-between;
    &>div {
      margin-top: 30px;
      cursor: pointer;
      height: 150px;
      border: 1px solid rgba(0, 0, 0,.1);
      border-radius: 6px;
      text-align: start;
      padding: 20px;
      box-sizing: border-box;
      flex: 1;
      min-width: 0;
      word-break: break-word;
      margin-right: 7px;
      background: (#c3c1e8);
    .c_title {
        font-size: 16px;
      }
    .c_content {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }
}
</style>